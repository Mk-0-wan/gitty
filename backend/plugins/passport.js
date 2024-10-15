import dotenv from "dotenv";
import fastifyPassport from "@fastify/passport";
import { Strategy as GitHubStratergy } from "passport-github2";
import fastifyPlugin from "fastify-plugin";
import { findUser, postNewUser } from "../utils/models/getUserCollection.js";
import { ObjectId } from "@fastify/mongodb";

dotenv.config();
const gitoptions = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:8000/auth/github/callback",
  scope: ["public_repo", "user"],
};

async function passPort(fastify, options) {
  options = gitoptions;
  fastify.register(fastifyPassport.initialize());
  fastify.register(fastifyPassport.secureSession());
  fastifyPassport.use('github', new GitHubStratergy(options, async function(accessToken, refreshToken, profile, done) {
    let foundUser;
    try {
      const userData = {
        email: profile.emails[0].value,
        avatar: profile._json.avatar_url,
        username: profile._json.login,
        bio: profile._json.bio,
      }
      foundUser = await postNewUser(userData, fastify.mongo.db, 'users');
    } catch(err) {
      console.error(err);
      done(err, null)
    }
    done(undefined, foundUser.insertedId);
  }));

  fastifyPassport.registerUserSerializer(async (user_id, request) => request.session.id = user_id);
  fastifyPassport.registerUserDeserializer(async (id, _) => {
    return await findUser({ _id: ObjectId.createFromHexString(id)}, fastify.mongo.db, 'users');
  });
}

export default fastifyPlugin(passPort);
