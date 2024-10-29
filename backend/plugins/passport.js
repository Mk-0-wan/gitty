import dotenv from "dotenv";
import fastifyPassport from "@fastify/passport";
import { Strategy as GitHubStratergy } from "passport-github2";
import fastifyPlugin from "fastify-plugin";
import { findOneUser, postNewUser } from "../utils/models/getUserCollection.js";
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
    try {
      let foundUser = await findOneUser({ email: profile.emails[0].value }, fastify.mongo.db, 'users');

      if (process.env.NODE_ENV) console.log('OAuth callback - found user:', foundUser);

      if (!foundUser || foundUser.length === 0) {
        const userData = {
          email: profile.emails[0].value,
          avatar: profile._json.avatar_url,
          username: profile._json.login,
          bio: profile._json.bio,
        }
        const forReq = { ...profile, accessToken };
        await postNewUser(forReq, fastify.mongo.db, 'profile');
        const newUser = await postNewUser(userData, fastify.mongo.db, 'users');
        return done(null, newUser.insertedId);
      }
      if (process.env.NODE_ENV) console.log('Using existing user:', foundUser._id);
      return done(null, foundUser._id);
    } catch (err) {
      console.error('GitHub auth error:', err);
      return done(err, null);
    }
  }));

  fastifyPassport.registerUserSerializer(async (user_id, request) => {
    if (process.env.NODE_ENV) console.log("We are inside the selializer");
    if (process.env.NODE_ENV) console.log(request.session);
    return user_id.toString();
  });

  fastifyPassport.registerUserDeserializer(async (id, request) => {
    try {
      const newId = ObjectId.createFromHexString(id);
      const user = await findOneUser({ _id: newId }, fastify.mongo.db, 'users');

      if (!user || user.length === 0) {
        console.log('No user found for ID:', newId);
        return null;
      }
      return user;
    } catch (err) {
      console.error('Deserialize error:', err);
      return null;
    }
  });
}

export default fastifyPlugin(passPort);
