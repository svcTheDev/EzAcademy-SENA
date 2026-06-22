import mongoose from "mongoose";
import { normalizeToJSON } from "../helpers/transformSchema.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["student", "instructor", "admin"],
      default: "student",
    },
  },
  {
    timestamps: true,
  },
);

userSchema.method("toJSON", normalizeToJSON("uid"));

const user = mongoose.model("user", userSchema);

export default user;
