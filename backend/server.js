import Fastify from "fastify";
import dotenv from "dotenv";
import routes from "./routes/firstRoute.js";
import dbConnector from "./plugins/mongodb.js";
import secureSession from "./plugins/session.js";
import passPort from "./plugins/passport.js";
import cors from "./plugins/cors.js";
import redis from "./plugins/redis.js";

dotenv.config();

const createApp = () => {
  const fastify = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
      },
    },
  });
  // avoid cross site origin error 
  fastify.register(cors);
  fastify.register(redis);
  // register all the routes pluggins that you have created here
  fastify.register(dbConnector);
  fastify.addHook(
    "preHandler",
    async (request, _) => {
      request.db = fastify.mongo.db;
    })
  fastify.addHook(
    "preHandler",
    async (req, _) => {
      req.redis = fastify.redis;
    }
  )
  fastify.register(secureSession);
  fastify.register(passPort);
  fastify.register(routes);

  fastify.listen({ port: process.env.PORT }, ((err) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  }));
}

createApp();

