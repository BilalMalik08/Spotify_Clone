import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { getToken } from "../utils/helper.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password, firstName, lastName, username } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }
    if (!firstName) {
      return res.status(400).json({ error: "First name is required" });
    }
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const userByEmail = await User.findOne({ email });
    if (userByEmail) {
      return res
        .status(403)
        .json({ error: "A user with this email already exists" });
    }

    const userByUsername = await User.findOne({ username });
    if (userByUsername) {
      return res.status(403).json({ error: "Username not available" });
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

    const user = await User.findOne({ $or: [{ email }, { username: email }] });

    if (!user) {
      return res.status(403).json({ error: "Invalid Credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
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
