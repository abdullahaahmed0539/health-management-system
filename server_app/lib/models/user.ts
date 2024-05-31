import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: [true, "First name is required."],
    trim: true,
  },
  lastName: {
    type: String,
    require: [true, "last name is required."],
    trim: true,
  },
  email: {
    type: String,
    require: [true, "Email is required."],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    require: [true, "Password is required."],
    trim: true,
  },
  hashedPassword: {
    type: String,
    require: [true, "Hashed Password is required."],
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
});

const User = mongoose.model("users", userSchema);

export default User;
