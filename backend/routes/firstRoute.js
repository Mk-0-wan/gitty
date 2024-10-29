import axios from "axios";
import UserController from "../controllers/UserController.js";
import fastifyPassport from "@fastify/passport";
import jwt from "jsonwebtoken";
import ensureAuthenticated from "../middleware/auth.js";
import cacheData from "../middleware/cacheMiddleware.js";
import { findOneUser } from "../utils/models/getUserCollection.js";
import { ObjectId } from "@fastify/mongodb";
import { reposHandler } from "../controllers/GitUserController.js";

/*
 * Holds all the routes that the app is going to use
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */

const userSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: { type: 'string', format: 'email' },
    passoward: { type: 'string' },
  },
};

const paramSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
  },
  required: ['id'],
}

const redisSchema = {
  type: 'object',
  properties: {
    basis: { type: 'string' },
  },
  required: ['basis'],
}

async function routes(fastify) {
  const postSchema = {
    schema: {
      body: userSchema,
    }
  }
  const putSchema = {
    schema: {
      body: userSchema,
      params: paramSchema,
    }
  }
  const getDelSchema = {
    schema: {
      params: paramSchema,
    }
  }

  const redisSchemaCh = {
    schema: {
      params: redisSchema,
    }
  }

  fastify.get("/",
    async (_, reply) => {
      reply.send("Hurray!! you logged in successfuly, But in a very risky page")
    });

  fastify.get('/login', { preValidation: fastifyPassport.authenticate("github") },
    async (_, reply) => {
      console.log('You are currently loggin in...');
      reply.send({ message: 'Logged in successfully!' });
    });

  fastify.get('/auth/github/callback', { preValidation: fastifyPassport.authenticate("github") },
    async (req, reply) => {

      try {
        await req.login(req.user);
        //await req.session.save;

        const token = jwt.sign(
          { id: req.user },
          'my_jwt_secure_key',
          { expiresIn: '1h' },
        )
        //reply.setCookie('token', token).redirect('http://localhost:5173/dashboard/');
        reply.redirect(`http://localhost:5173/auth-redirect?token=${token}`);
      } catch (err) {
        console.error('Error during GitHub callback:', err);
        reply.code(500).send({ error: 'Failed to log in user' });
      }
    }
  );

  /* Instead pass a token to the frontend and ensure that all the data is retrived well */
  fastify.get('/me',
    { preValidation: ensureAuthenticated },
    async (req, reply) => {
      try {
        const decoded = jwt.verify(req.token, 'my_jwt_secure_key');
        const user = await findOneUser({ _id: ObjectId.createFromHexString(decoded.id) }, fastify.mongo.db, 'users');
        req.userDetail = user;
        reply.send({ user });
      } catch (err) {
        console.error('Error verifying token:', err);
        reply.code(401).send({ message: 'Unauthorized' });
      }
    });

  fastify.get('/repo', { preValidation: ensureAuthenticated }, reposHandler);

  // this is not a protected route we will be using it for testing out 
  // getting all the trendy repos by either weekly or monthly baisis
  fastify.get("/hotrepo/:basis", { preHandler: cacheData }, async (request, reply) => {
    const { basis } = request.params;
    let result;
    try {
      result = await axios.get(`https://trend.doforce.us.kg/repo?since=${basis}`);
      if (result.data.length === 0) {
        reply.code(404).send({ message: "Appears we have an empty dataset, you should probably check with the url endpoint" });
      } else {
        // cache the result for the first cache miss
        const key = request.url.split("/")[1] + basis;
        await request.redis.set(key, JSON.stringify(result.data), 'EX', process.env.EXP);
        reply.send(result.data);
      }
    } catch (err) {
      reply.code(500).send(err);
    }
  })

  // getting all the trendy users by either weekly or monthly baisis
  fastify.get("/hotuser/:basis", { preHandler: cacheData }, async (request, reply) => {
    const { basis } = request.params;
    let result;
    try {
      result = await axios.get(`https://trend.doforce.us.kg/user?since=${basis}`);
      if (result.data.length === 0) {
        reply.code(404).send({ message: "Appears we have an empty dataset, you should probably check with the url endpoint" });
      } else {
        // cache the result for the first cache miss
        const key = request.url.split("/")[1] + basis;
        await request.redis.set(key, JSON.stringify(result.data), 'EX', process.env.EXP);
        reply.send(result.data);
      }
    } catch (err) {
      reply.code(500).send(err);
    }
  })
  // getting all the trendy languages by either weekly or monthly baisis
  fastify.get("/hotlang/:basis", { preHandler: cacheData }, async (request, reply) => {
    const { basis } = request.params;
    let result;
    try {
      result = await axios.get(`https://trend.doforce.us.kg/lang?since=${basis}`);
      if (result.data.length === 0) {
        reply.code(404).send({ message: "Appears we have an empty dataset, you should probably check with the url endpoint" });
      } else {
        // cache the result for the first cache miss
        const key = request.url.split("/")[1] + basis;
        await request.redis.set(key, JSON.stringify(result.data), 'EX', process.env.EXP);
        reply.send(result.data);
      }
    } catch (err) {
      reply.code(500).send(err);
    }
  })


  fastify.get('/users', UserController.getAllUsers);
  fastify.get('/files', UserController.getAllFiles);
  fastify.post('/users', postSchema, UserController.postUser);
  fastify.get('/users/:id', getDelSchema, UserController.getUser);
  fastify.put('/users/:id', putSchema, UserController.updateUsers)
  fastify.delete('/users/:id', getDelSchema, UserController.delUser);

}

export default routes;
