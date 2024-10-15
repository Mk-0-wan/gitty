// Handling all the sessions

import fastifyPlugin from "fastify-plugin";
import fastifySecureSession from "@fastify/secure-session";
import path from "node:path";
import { readFile } from "node:fs/promises";

async function secureSession(fastify, options) {
  const key = await readFile(path.join(process.env.PWD, "secret_key"));
  fastify.register(fastifySecureSession, {
    key,
    saveUninitialized: false,
    resave: false,
    expiry: 60 * 60,
    cookie: {
      path: "/"
    }
  })
}

export default fastifyPlugin(secureSession);

