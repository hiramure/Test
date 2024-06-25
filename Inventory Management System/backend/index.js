import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js";
import adminRoute from "./Routes/admin.js";
import techOfficerRoute from "./Routes/techOfficer.js";
import labInstructorRoute from "./Routes/labIns.js";
import categoryRoute from "./Routes/category.js";
import loaningRoute from "./Routes/loaning.js";
import itemRoute from "./Routes/item.js";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
};

app.get("/", (req, res) => {
  res.send("Api is working");
});

// Database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB database is connected");
  } catch (err) {
    console.log("MongoDB database connection failed");
  }
};

// Middleware

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/techOfficer", techOfficerRoute);
app.use("/api/v1/labInstructor", labInstructorRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/item", itemRoute);
app.use("/api/v1/request", loaningRoute);

app.listen(port, () => {
  connectDB();
  console.log("Server is running on port " + port);
});
