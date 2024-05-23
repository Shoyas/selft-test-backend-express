import express from "express";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

//! User Registration API
router.post("/register", async (req, res) => {
  try {
    //! if user is already exist
    const isUserExist = await User.findOne({ email: req.body.email });
    if (isUserExist) {
      return res.status(200).send({
        message: "User already exists",
        success: false,
      });
    }
    //! Hash password
    const saltRound = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(req.body.password, saltRound);
    req.body.password = hashPassword;

    //! create new user
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

//! User Login API
router.post("/login", async (req, res) => {
  try {
    //! Check the user is exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }

    //! check password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(200).send({
        message: "Invalid password",
        success: false,
      });
    }
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "365d" }
    );
    res.send({
      message: "User logged in successfully",
      success: true,
      data: token,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
      data: error,
    });
  }
});

export default router;
