import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const getToken = async (email, user) => {
  const token = jwt.sign({ identifier: user._id }, process.env.SECRET_KEY);
  return token;
};

export { getToken };
