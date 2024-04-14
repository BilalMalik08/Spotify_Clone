import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  likedSongs: {
    type: Array,
    default: "",
  },
  likedPlaylists: {
    type: Array,
    default: "",
  },
  subscribedArtists: {
    type: Array,
    default: "",
  },
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
