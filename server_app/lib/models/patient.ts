import mongoose, { Schema } from "mongoose";

const patientSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: [true, "User Id is required."],
    trim: true,
  },
  treatmentHistory: {
    type: [Schema.Types.Mixed],
    trim: true,
  },
  guardianInfo: {
    type: [Schema.Types.Mixed],
    trim: true,
  },
});

const Patient = mongoose.model("patients", patientSchema);

export default Patient;
