import express from "express";
import passport from "passport";
import Playlist from "../models/playlistModel.js";
import User from "../models/userModel.js";
import Song from "../models/songModel.js";

const router = express.Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const currentUser = req.user;
      const { name, thumbnail, songs } = req.body;

      if (!name || !thumbnail || !songs || !Array.isArray(songs)) {
        return res
          .status(400)
          .json({ error: "Invalid request body for creating a playlist" });
      }

      const playlistData = {
        name,
        thumbnail,
        songs,
        owner: currentUser._id,
        collaborators: [],
      };

      const playlist = await Playlist.create(playlistData);

      return res.status(200).json(playlist);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get(
  "/get/playlist/:playlistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const playlistId = req.params.playlistId;

      const playlist = await Playlist.findOne({ _id: playlistId });

      if (!playlist) {
        return res.status(301).json({ error: "Invalid ID" });
      }

      return res.status(200).json(playlist);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get(
  "/get/me",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const artistId = req.user._id;

      const artist = await User.findOne({ _id: artistId });

      if (!artist) {
        return res.status(301).json({ error: "Invalid artist ID" });
      }

      const playlists = await Playlist.find({ owner: artistId });

      return res.status(200).json({ Data: playlists });
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
      const artistId = req.params.artistId;

      const artist = await User.findOne({ _id: artistId });

      if (!artist) {
        return res.status(301).json({ error: "Invalid artist ID" });
      }

      const playlists = await Playlist.find({ owner: artistId });

      return res.status(200).json({ Data: playlists });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.post(
  "/add/song",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const currentUser = req.user;
      const { playlistId, songId } = req.body;

      const playlist = await Playlist.findOne({ _id: playlistId });

      if (!playlist) {
        return res.status(301).json({ error: "Playlist does not exist" });
      }

      if (
        !playlist.owner.equals(currentUser._id) &&
        !playlist.collaborators.includes(currentUser._id)
      ) {
        return res.status(400).json({ error: "Not allowed" });
      }

      const song = await Song.findOne({ _id: songId });

      if (!song) {
        return res.status(304).json({ error: "Song does not exist" });
      }

      playlist.songs.push(songId);

      await playlist.save();

      return res.status(200).json(playlist);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
