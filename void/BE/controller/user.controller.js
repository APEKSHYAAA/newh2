import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

const registerNewUser = async (req, res) => {
  try {
    console.log("Registration data:", req.body);

    const { fullName, email, password, userType } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(403).json({
        msg: "User already exists"
      });
    } else {
      const hashPassword = await bcrypt.hash(password, saltRounds);

      await User.create({
        fullName,
        email,
        password: hashPassword,
        userType
      });

      res.status(201).json({
        msg: "Registered successfully"
      });
    }
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({
      msg: "Error registering user. Please try again."
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const userDetails = await User.findOne({ email: req.body.email });

    if (userDetails) {
      const matched = await bcrypt.compare(req.body.password, userDetails.password);

      if (matched) {
        // Make sure SECRET_KEY exists in environment variables
        const secretKey = process.env.SECRET_KEY;
        if (!secretKey) {
          return res.status(500).json({ msg: "Server error: Secret key not found" });
        }

        const token = jwt.sign(
          { email: userDetails.email },
          secretKey,
          { expiresIn: '1h' } // Add expiration for added security
        );

        return res.status(200).json({ msg: "Login Successful", token, userDetails });
      } else {
        return res.status(403).json({ msg: "Password didn't match" });
      }
    } else {
      return res.status(401).json({ msg: "Email not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: "Login failed" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = 5;
    const skipCount = (page - 1) * limit;

    const count = await User.countDocuments();
    const userList = await User.find().limit(limit).skip(skipCount).select('fullName email');

    return res.status(200).json({ userList, count });
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: "Failed to fetch users" });
  }
};

const getUserDetailsById = async (req, res) => {
  try {
    const userDetails = await User.findById(req.params.id);
    if (userDetails) {
      res.status(200).json({ userDetails });
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to fetch user details" });
  }
};

export { registerNewUser, loginUser, getAllUsers, getUserDetailsById };