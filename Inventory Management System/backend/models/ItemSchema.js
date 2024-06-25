import mongoose from "mongoose";
// const { ObjectId } = mongoose.Schema;

const itemSchema = mongoose.Schema(
  {
    itemId: {
      type: String,
      required: true,
      unique: true,
    },
    handlingMethos: {
      type: String,
    },
    description: {
      type: String,
    },

    photo: {
      data: Buffer,
      contentType: String,
    },
    availability: {
      type: Boolean,
    },
    borrowedBy: {
      type: String,
    },
    manualUrl: {
      type: String,
    },
    categoryTest: {
      type: mongoose.Schema.Types.ObjectId,
      // type: mongoose.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
