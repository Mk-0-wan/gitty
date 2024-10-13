import { createHash } from "crypto";
import { ObjectId } from "@fastify/mongodb";
import { deleteUser, findUser, getCollection, postNewUser, updateUser } from "../utils/models/getUserCollection.js";
import dotenv from "dotenv";

dotenv.config();
const collection = process.env.DATA_COLLECTION;
async function getAllFiles(request, reply) {
  const users = await getCollection(request.db, 'files').find().toArray();
  return reply.send(users);
}

async function getAllUsers(request, reply) {
  const users = await getCollection(request.db, collection).find().toArray();
  return reply.send(users);
}

async function postUser(request, reply) {
  const { email, password } = request.body;

  const user = await getCollection(request.db, collection).findOne({ email });
  if (user) return { error: "Already exists" };

  const hashpass = createHash('sha1').update(password).digest("hex");
  const newuser = await postNewUser({ email, password: hashpass }, request.db, collection);
  return reply.code(201).send(newuser);
}

async function getUser(request, reply) {
  const { id } = request.params;
  const result = await findUser(ObjectId.createFromHexString(id), request.db, collection);
  reply.send(result);
}

async function updateUsers(request, reply) {
  const { id } = request.params;
  const { email, password } = request.body;

  const result = await updateUser({ _id: ObjectId.createFromHexString(id) }, { email, password }, request.db, collection);
  reply.send(result);
}

async function delUser(request, reply) {
  const { id } = request.params;
  const result = await deleteUser({ _id: ObjectId.createFromHexString(id) }, request.db, collection);
  if (result) reply.code(204);
}
export default { getAllUsers, getAllFiles, postUser, getUser, updateUsers, delUser };
