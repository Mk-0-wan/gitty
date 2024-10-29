// setting up cors for allowing you to interact with known origins
import fastifyCors from "@fastify/cors";
import fastifyPlugin from "fastify-plugin";

async function cors(fastify) {
  fastify.register(fastifyCors, {
    origin: ['http://localhost:5173'], // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow the necessary methods
    credentials: true, // This allows cookies to be sent along with requests
    allowedHeaders: ['Content-Type', 'Authorization'], // Important for JWT and other headers
  });
}
export default fastifyPlugin(cors);
