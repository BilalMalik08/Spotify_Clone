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
      const errors = [];

      if (!name && !thumbnail && !track) {
        errors.push("All fields are required");
      } else {
        if (!name) {
          errors.push("Name is required");
        }
        if (!thumbnail) {
          errors.push("Thumbnail is required");
        }
        if (!track) {
          errors.push("Track is required");
        }
      }

      if (errors.length > 0) {
        return res.status(400).json({ error: errors.join(", ") });
      }

      const artist = req.user._id;

      const songDetails = { name, thumbnail, track, artist };

      const createdSong = await Song.create(songDetails);

      return res.status(200).json(createdSong);
    } catch (error) {
      console.error("Error creating song:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get(
  "/get/mysongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const songs = await Song.find({ artist: req.user._id }).populate(
        "artist"
      );
      return res.status(200).json({ Data: songs });
    } catch (error) {
      console.error("Error fetching songs:", error);
      return res
        .status(500)
        .json({ error: error.message || "Internal server error" });
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
      let { songName } = req.params;

      // Modify songName to perform case-insensitive and partial word matching
      songName = new RegExp(songName, "i");

      const songs = await Song.find({ name: { $regex: songName } }).populate(
        "artist"
      );

      return res.status(200).json({ Data: songs });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
