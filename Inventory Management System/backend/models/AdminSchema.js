import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  phone: { type: String },
  photo: { type: String },
  role: {
    type: String,
  },
});

//const collection = new mongoose.model("admin", AdminSchema);

export default mongoose.model("Admin", AdminSchema);
