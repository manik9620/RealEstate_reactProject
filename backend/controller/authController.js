import { comparePassword, hashPassword } from "./../helper/authHelper.js";
import User from "../models/User.js";
import multer from "multer";
import jwt from "jsonwebtoken";

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

export const registerController = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    /* The uploaded file is available as req.file */
    const profileImage = req.file;

    if (!profileImage) {
      return res.status(400).send("No file uploaded");
    }

    /* path to the uploaded profile photo */
    const profileImagePath = profileImage.path;

    /* Check if user exists */
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }
    const hashedPassword = await hashPassword(password);
    /* Create a new User */
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImagePath,
    });

    /* Save the new User */
    await newUser.save();

    /* Send a successful message */
    res
      .status(200)
      .json({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Registration failed!", error: err.message });
  }
};

export const loginController = async (req, res) => {
  try {
    /* Take the infomation from the form */
    const { email, password } = req.body;

    /* Check if user exists */
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(409)
        .json({ sucsess: false, message: "User doesn't exist!" });
    }

    /* Compare the password with the hashed password */
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({sucsess:false, message: "Invalid Credentials!" });
    }

    /* Generate JWT token */
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    res.status(200).json({ token, user,success:true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
