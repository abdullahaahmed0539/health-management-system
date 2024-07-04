import mongoose from "mongoose";

const treatmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Treatment name is required."],
      trim: true,
    },
    diseaseName: {
      type: String,
      require: [true, "Disease name is required."],
      trim: true,
    },
    doctorId: {
      type: String,
      require: [true, "Doctor Id is required."],
      trim: true,
    },
    doctorName: {
      type: String,
      require: [true, "Doctor name is required."],
      trim: true,
    },
    treatmentDate: {
      type: Date,
      require: [true, "Treatment date is required."],
      trim: true,
    },
  },
  { autoCreate: false }
);

const Treatment = mongoose.model("treatments", treatmentSchema);

export default Treatment;
