import Fastify from "fastify"
import dotenv from  "dotenv";
import routes from "./routes/firstRoute.js";
import dbConnector from "./plugins/mongodb.js"

dotenv.config();

const createApp = () => {
  const fastify = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
      },
    },
  });
  // register all the routes
  fastify.register(dbConnector)
  fastify.addHook(
    "preHandler",
    async (request, _) => {
    request.db = fastify.mongo.db;
  })
  fastify.register(routes)

  fastify.listen({ port: process.env.PORT }, ((err) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  }));
}

createApp();
