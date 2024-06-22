import mongoose from "mongoose";
// import { v4 } from "uuid";

const residencySchema = new mongoose.Schema(
  {
    // id: { type: String, default: v4(), required: true },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    image: {
      type: String,
    },
    facilities: {
      type: Object,
    },
    userEmail: {
      type: String,
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Residency = mongoose.model("Residency", residencySchema);

export default Residency;
