import UserController from "../controllers/UserController.js";
import fastifyPassport from "@fastify/passport";
import ensureAuthenticated from "../middleware/auth.js";

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

async function routes(fastify, options) {
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

  fastify.get("/",
    { preValidation: ensureAuthenticated },
    async (_, reply) => {
      reply.send("Hurray!! you logged in successfuly")
    });
  fastify.get('/login', { preValidation: fastifyPassport.authenticate("github") },
    async (_, reply) => {
      console.log('You are currently loggin in...');
      reply.send({ message: 'Logged in successfully!' });
    });
  fastify.get('/auth/github/callback', { preValidation: fastifyPassport.authenticate("github") },
    async (request, reply) => {
      console.log(request);
      console.log('You have reached me...');
      reply.redirect("/");
    });
  fastify.get('/logout', async (request, reply) => {
    request.logout();
    reply.redirect("/users");
  });
  fastify.get('/users', UserController.getAllUsers);
  fastify.get('/files', UserController.getAllFiles);
  fastify.post('/users', postSchema, UserController.postUser);
  fastify.get('/users/:id', getDelSchema, UserController.getUser);
  fastify.put('/users/:id', putSchema, UserController.updateUsers)
  fastify.delete('/users/:id', getDelSchema, UserController.delUser);
}

export default routes;
