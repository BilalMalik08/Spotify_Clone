import mongoose from "mongoose";

const PlaylistSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  songs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "song",
    },
  ],
  collaborators: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  ],
});

const PlaylistModel = mongoose.model("Playlist", PlaylistSchema);

export default PlaylistModel;
