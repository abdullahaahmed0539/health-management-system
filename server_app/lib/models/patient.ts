import mongoose from "mongoose";
import Treatment from "./treatment";
import GuardianContact from "./guardian-contact";

const patientSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: [true, "User Id is required."],
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
