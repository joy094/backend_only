import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requred: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      requred: true,
    },

    phone: { type: String, required: true },
    address: {
      type: String,
      required: true,
    },

    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
const DB_model = mongoose.model("USER_LIST", UserSchema);
export default DB_model;
