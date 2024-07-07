import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const getToken = async (email, user) => {
  const token = jwt.sign(
    { identifier: user._id },
    "secretKeyDevBilalSpotifyCloneWebSecretKey"
  );
  return token;
};

export { getToken };
