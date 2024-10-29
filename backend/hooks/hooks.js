import axios from 'axios';
import getCollection from '../utils/helpers.js';

export const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: "application/vnd.github+json",
  },
});

export default function registerHooks(fastify) {
  // Hook to handle Fastify MongoDB connection
  fastify.addHook("preHandler", async (request, _) => {
    request.db = fastify.mongo.db;
  });

  // Hook to handle Redis connection
  fastify.addHook("preHandler", async (request, _) => {
    request.redis = fastify.redis;
  });

  // Hook to handle axios and githubApi Global config
  fastify.addHook("preHandler", async (request, reply) => {
    const collection = process.env.GH_COLLECTION;
    const profile = await getCollection(request.db, collection).findOne();

    if (!profile || !profile.accessToken) {
      return reply.code(401).send({ message: 'Access token not found' });
    }
    githubApi.defaults.headers.common['Authorization'] = `Bearer ${profile.accessToken}`;
  })
}

