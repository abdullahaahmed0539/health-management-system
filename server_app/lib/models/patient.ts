import mongoose from "mongoose";
import Treatment from "./treatment";
import GuardianContact from "./guardian-contact";

const patientSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: [true, "User Id is required."],
    trim: true,
  },
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
  addresses: {
    type: [String],
    trim: true,
    require: [true, "Address is required."],
  },
  dateOfBirth: {
    type: Date,
    trim: true,
    require: [true, "Date of birth is required."],
  },
  phoneNumbers: {
    type: [String],
    require: [true, "Phone number is required."],
    trim: true,
  },
  gender: {
    type: String,
    require: [true, "Gender is required."],
    trim: true,
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
  // treatmentHistory: {
  //   type: [Treatment],
  //   trim: true,
  // },
  // guardianInfo: {
  //   type: [GuardianContact],
  //   trim: true,
  // },
});

const Patient = mongoose.model("patients", patientSchema);

export default Patient;
