import jwt from "jsonwebtoken";
import Admin from "../models/AdminSchema.js";
import LabIns from "../models/LabInstructSchema.js";
import TechOfficer from "../models/TOSchema.js";
import Student from "../models/StudentSchema.js";

export const authenticate = async (req, res, next) => {
  // get token from headers
  const authToken = req.headers.authorization;

  // check if the token exists and starts with "Bearer "
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "No token, authorization denied" });
  }
  try {
    //console.log(authToken);
    const token = authToken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userID = decoded.id;
    req.role = decoded.role;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token is expired" });
    }

    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

export const restrict = (roles) => async (req, res, next) => {
  const userID = req.userID;

  let user;

  const admin = await Admin.findById(userID);
  const techOfficer = await TechOfficer.findById(userID);
  const labInstructor = await LabIns.findById(userID);
  const student = await Student.findById(userID);

  if (admin) {
    user = admin;
  }
  if (techOfficer) {
    user = techOfficer;
  }
  if (labInstructor) {
    user = labInstructor;
  }
  if (student) {
    user = student;
  }

  if (!roles.includes(user.role)) {
    return res
      .status(401)
      .json({ success: false, message: "You are not authorized" });
  }
  next();
};
