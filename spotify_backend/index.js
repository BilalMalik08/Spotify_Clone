import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "./models/userModel.js";
import authRoutes from "./routes/authRoute.js";
import songRoutes from "./routes/songRoute.js";
import playlistRoutes from "./routes/playlistRoute.js";

dotenv.config();

// Express.js configuration
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

// MongoDB connection setup
const url =
  "mongodb+srv://spotify-clone:" +
  process.env.MONGO_PASSWORD +
  "@cluster0.yeflsll.mongodb.net/SpotifyDB?retryWrites=true&w=majority&appName=Cluster0";

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
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findOne({ id: jwt_payload.sub });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("Hello Bilal");
});

// Authentication routes
app.use("/auth", authRoutes);
app.use("/login", authRoutes);

// Song routes
app.use("/song", songRoutes);

// Playlist routes
app.use("/playlist", playlistRoutes);

// Server setup
app.listen(port, () => {
  console.log("App is running on port: " + port);
});
