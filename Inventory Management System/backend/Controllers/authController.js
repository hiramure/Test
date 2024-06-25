import LabIns from "../models/LabInstructSchema.js";
import TechOfficer from "../models/TOSchema.js";
import Admin from "../models/AdminSchema.js";
import Student from "../models/StudentSchema.js";
//import User from "../models/UserShema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "15d",
    }
  );
};

export const register = async (req, res) => {
  const {
    email,
    password,
    username,
    role,
    phone,
    photo,
    firstName,
    lastName,
    regNo,
    batch,
    lab,
  } = req.body;
  try {
    let user = null;

    if (role === "labInstructor") {
      user = await LabIns.findOne({ email });
    } else if (role === "techOfficer") {
      user = await TechOfficer.findOne({ email });
    } else if (role === "admin") {
      user = await Admin.findOne({ email });
    } else if (role === "student") {
      user = await Student.findOne({ email });
    }

    //check if user exist
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (role === "admin") {
      user = new Admin({
        firstName,
        lastName,
        username,
        email,
        password: hashPassword,
        photo,
        phone,
        role,
      });
    }
    if (role === "techOfficer") {
      user = new TechOfficer({
        firstName,
        lastName,
        username,
        email,
        password: hashPassword,
        photo,
        phone,
        role,
        lab,
      });
    }
    if (role === "labInstructor") {
      user = new LabIns({
        firstName,
        lastName,
        username,
        email,
        password: hashPassword,
        photo,
        phone,
        role,
      });
    }
    if (role === "student") {
      user = new Student({
        firstName,
        lastName,
        username,
        email,
        password: hashPassword,
        photo,
        role,
        regNo,
        batch,
      });
    }

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "User Successfully created" });
  } catch (err) {
    //console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error, Try again",
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  const { email } = req.body;
  try {
    let user = null;

    const labInstructor = await LabIns.findOne({ email });
    const techOfficer = await TechOfficer.findOne({ email });
    const admin = await Admin.findOne({ email });
    const student = await Student.findOne({ email });
    if (labInstructor) {
      user = labInstructor;
    }
    if (techOfficer) {
      user = techOfficer;
    }
    if (admin) {
      user = admin;
    }
    if (student) {
      user = student;
    }

    //check if user exists or not
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //compare password
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });
    }

    //get token
    const token = generateToken(user);
    const { password, role, username, ...rest } = user._doc;

    res.status(200).json({
      status: true,
      message: "Successfully login",
      token,
      data: { ...rest },
      role,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: "Failed to login" });
  }
};
