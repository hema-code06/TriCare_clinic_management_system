import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
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
  phone: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  age: {
    type: Number,
    min: 0,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other", "Prefer not to say"],
  },
  bloodType: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Other"],
  },
  location: {
    city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
  },
  occupation: {
    type: String,
    default: "",
  },
  generalDoctorName: {
    type: String,
    default: "",
  },
  doctorSpeciality: {
    type: String,
    default: "",
  },
  insuranceInformation: {
    provider: {
      type: String,
      default: "",
    },
    policyNumber: {
      type: String,
      default: "",
    },
  },
});

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
