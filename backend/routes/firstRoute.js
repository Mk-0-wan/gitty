import UserController from "../controllers/UserController.js";

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
  fastify.get("/", async (_, reply) => {
    reply.send({ message: "Welcome to fastify routing" });
  })


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

  fastify.get('/users', UserController.getAllUsers);
  fastify.get('/files', UserController.getAllFiles);
  fastify.post('/users', postSchema, UserController.postUser);
  fastify.get('/users/:id', getDelSchema, UserController.getUser);
  fastify.put('/users/:id', putSchema, UserController.updateUsers)
  fastify.delete('/users/:id', getDelSchema, UserController.delUser);
}

export default routes;
