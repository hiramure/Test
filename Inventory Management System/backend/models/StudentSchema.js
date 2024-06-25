import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  regNo: { type: String, unique: true },
  batch: { type: Number },
  photo: { type: String },
  role: {
    type: String,
  },
});

export default mongoose.model("Student", StudentSchema);
