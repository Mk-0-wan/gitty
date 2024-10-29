// register redis server with the app

import { fastifyRedis } from "@fastify/redis"
import fastifyPlugin from "fastify-plugin";

const redisOpts = {
  host: '127.0.0.1',
  port: '6379',
  family: 4,
}

async function redis(fastify, options = redisOpts) {
  fastify.register(fastifyRedis, options);
  fastify.ready((err) => {
    if (err) fastify.log.error(err);
    fastify.log.info(`Redis connection status is ${fastify.redis.status}`)
  })
}

export default fastifyPlugin(redis);
