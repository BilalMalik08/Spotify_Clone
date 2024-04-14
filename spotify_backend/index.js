// Import required modules
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "./models/userModel.js";

dotenv.config();

// Express.js configuration
const app = express();
const port = process.env.PORT || 4000;

// MongoDB connection setup
const url =
  "mongodb+srv://spotify-clone:" +
  process.env.MONGO_PASSWORD +
  "@cluster0.yeflsll.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(() => console.log("Not Connected to MongoDB"));

// Passport-jwt setup
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);

app.get("/", (req, res) => {
  res.send("Hello Bilal");
});

// Server setup
app.listen(port, () => {
  console.log("App is running on port: " + port);
});
