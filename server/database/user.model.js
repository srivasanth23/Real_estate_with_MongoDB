import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: { type: String, required: true, unique: true },
  image: {
    type: String,
  },
  bookedVisits: [{ id: String, date: Date }],
  favResidenciesId: [String],
  ownedResidencies: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Residency" },
  ],
});

//   const residencySchema = new mongoose.Schema({
//     id: String, // Unique identifier (can use a library like `uuid`)
//     title: String,
//     description: String,
//     price: Number,
//     address: String,
//     city: String,
//     country: String,
//     image: String,
//     facilities: Object,
//     userEmail: String,
//     owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     createdAt: Date,
//     updatedAt: Date
//   });

// Create models with unique indexes for email and address + userEmail

const User = mongoose.model("User", userSchema);

export default User;
