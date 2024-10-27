import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    image: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    seller: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const User = mongoose.models.users || mongoose.model('users', userSchema);
