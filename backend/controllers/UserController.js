import { createHash } from "crypto";
import { ObjectId } from "fastify-mongodb";
import { findUser, getCollection, postNewUser } from "../utils/models/getUserCollection.js";
import { ObjectId } from "fastify-mongodb";

async function getAllFiles(request, reply) {
  const users = await getCollection(request.db, 'files').find().toArray();
  return reply.send(users);
}

async function getAllUsers(request, reply) {
  const users = await getCollection(request.db, 'users').find().toArray();
  return reply.send(users);
}

async function postUser(request, reply) {
  const { email, password } = request.body;

  const user = await getCollection(request.db, 'users').findOne({ email });
  if (user) return { error: "Already exists" };

  const hashpass = createHash('sha1').update(password).digest("hex");
  const newuser = await postNewUser({ email, password: hashpass }, request.db, 'users');
  console.log(newuser);
  return reply.send(newuser);
}

async function getUser(request, reply) {
  const { id } = request.params;

  console.log(id);
  console.log(ObjectId(id));
  const result = await findUser(ObjectId(id), request.db, 'users');
  console.log(result);
  reply.send(result);
}

export default { getAllUsers, getAllFiles, postUser, getUser };
