import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { getToken } from "../utils/helper.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password, firstName, lastName, username } = req.body;

    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(403)
        .json({ error: "A user with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserData = {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      username,
    };

    const newUser = await User.create(newUserData);

    const token = await getToken(email, newUser);

    const userToReturn = { ...newUser.toJSON(), token };

    delete userToReturn.password;

    return res.status(200).json(userToReturn);
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    console.log("User:", user);

    if (!user) {
      return res.status(403).json({ error: "Invalid Credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log("Is password valid:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(403).json({ error: "Invalid Credentials" });
    }

    const token = await getToken(user.email, user);

    const userToReturn = { ...user.toJSON(), token };

    delete userToReturn.password;

    return res.status(200).json(userToReturn);
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
