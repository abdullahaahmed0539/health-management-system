
import mongoose from "mongoose";

const guardianSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Treatment name is required."],
    trim: true,
  },
  email: {
    type: String,
    require: [true, "Disease name is required."],
    trim: true,
  },
  phone: {
    type: String,
    require: [true, "Doctor Id is required."],
    trim: true,
  },
  relation: {
    type: String,
    require: [true, "Doctor name is required."],
    trim: true,
  },
});

const Guardian = mongoose.model("guardians", guardianSchema);

export default Guardian;
