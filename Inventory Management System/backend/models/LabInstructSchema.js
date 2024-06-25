import mongoose from "mongoose";

const LabInstructSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  phone: { type: Number },
  photo: { type: String },
  role: {
    type: String,
  },
  lab: {
    type: String,
  },
});

export default mongoose.model("LabIns", LabInstructSchema);
