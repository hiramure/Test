import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    requestFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LabIns",
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
    burrowDate: {
      type: Date,
    },
    requestStatus: {
      type: String,
      default: "Pending",
    },
    returnDate: {
      type: Date,
    },
    purpose: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: "120d", // TTL index: document will expire 120 days (4 months) after creation
    },
  },
  {
    timestamps: true, // Enable timestamps
  }
);

export default mongoose.model("Loan", loanSchema);
