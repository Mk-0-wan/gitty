import fastifyMongodb from "@fastify/mongodb";
import fastifyPlugin from "fastify-plugin";


async function dbConnector(fastify, options) {
  fastify.register(fastifyMongodb, {
    url: process.env.DB_URL,
    useUnifiedTopology: true
  });
  fastify.after((err) => {
    if (err) fastify.log.error('Cannot connect to the database check the ip configuration');
    else fastify.log.info('Connection to the database succesful');
  });
}
export default fastifyPlugin(dbConnector);
