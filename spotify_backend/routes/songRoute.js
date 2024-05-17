import express from "express";
import passport from "passport";
import Song from "../models/songModel.js";
import User from "../models/userModel.js";

const router = express.Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { name, thumbnail, track } = req.body;

      if (!name || !thumbnail || !track) {
        return res
          .status(301)
          .json({ error: "Insufficient details to create a song" });
      }

      const artist = req.user._id;

      const songDetails = { name, thumbnail, track, artist };

      const createdSong = await Song.create(songDetails);

      return res.status(200).json(createdSong);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get(
  "/get/mysongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const songs = await Song.find({ artist: req.user._id });

      return res.status(200).json({ Data: songs });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get(
  "/get/artist/:artistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { artistId } = req.params;

      const artist = await User.findById(artistId);

      if (!artist) {
        return res.status(404).json({ error: "Artist does not exist" });
      }

      const songs = await Song.find({ artist: artistId });

      return res.status(200).json({ Data: songs });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get(
  "/get/songname/:songName",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { songName } = req.params;

      const songs = await Song.find({ name: songName });

      return res.status(200).json({ Data: songs });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
