// setting up cors for allowing you to interact with known origins
import fastifyCors from "@fastify/cors";
import fastifyPlugin from "fastify-plugin";

async function cors(fastify) {
  fastify.register(fastifyCors, {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['set-cookie'],
  });
}

export default fastifyPlugin(cors);
