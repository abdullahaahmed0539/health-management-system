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
  addresses: {
    type: [String],
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    trim: true,
  },
  designation: {
    type: [String],
    trim: true,
  },
  phoneNumbers: {
    type: [String],
    trim: true,
  },
  role: {
    type: String,
    trim: true,
    require: [true, "Role is required."],
  },
  city: {
    type: String,
    require: [true, "City is required."],
    trim: true,
  },
  country: {
    type: String,
    require: [true, "Country is required."],
    trim: true,
  },
  gender: {
    type: String,
    require: [true, "Gender is required."],
    trim: true,
  },
});

const User = mongoose.model("users", userSchema);

export default User;
