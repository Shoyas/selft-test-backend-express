import express from "express";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";

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
    // Hash password
    const saltRound = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(req.body.password, saltRound);
    req.body.password = hashPassword;

    // create new user
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

export default router;
