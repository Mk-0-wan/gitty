import fastifyPlugin from "fastify-plugin";
import fastifySecureSession from "@fastify/secure-session";
import { fastifyCookie } from "@fastify/cookie";
import path from "node:path";
import { readFile } from "node:fs/promises";

async function secureSession(fastify) {
  fastify.register(fastifyCookie, { secret: 'fuzz that took some time to figure out', parseOptions: {} })
  const key = await readFile(path.join(process.env.PWD, "secret_key"));
  fastify.register(fastifySecureSession, {
    key,
    saveUninitialized: false,
    resave: true,
    coookieName: "test",
    cookie: {
      secure: false, // Set to true in production
      httpOnly: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      domain: 'localhost',
      path: '/'
    },
  });
}

export default fastifyPlugin(secureSession);
