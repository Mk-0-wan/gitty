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
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
        required: ['id'],
      }
    }
  }
  fastify.get('/users', UserController.getAllUsers);
  fastify.get('/files', UserController.getAllFiles);
  fastify.post('/users', postSchema, UserController.postUser);
  fastify.get('/users/:id', putSchema, UserController.getUser);
  //fastify.put('/users/:id', UserController.updateUser)
  //fastify.delete('/users', UserController.deleteUser);
}


export default routes;
