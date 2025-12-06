import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  profilePicture: { type: String, required: true },
  doctorId: { type: String, unique: true },
  fullName: String,
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  contactNumber: String,
  department: {
    type: String,
    enum: [
      "Cardiology",
      "Neurology",
      "Orthopedics",
      "Pediatrics",
      "General Medicine",
      "Dermatology",
      "Oncology",
      "Gynecology",
      "Psychiatry",
      "Endocrinology",
      "ENT",
      "Urology",
      "Rheumatology",
      "Plastic Surgery",
      "Gastroenterology",
      "Pulmonology",
    ],
  },
  specialization: {
    type: String,
    enum: [
      "Surgery",
      "General Practice",
      "Dermatology",
      "Dentistry",
      "Psychiatry",
      "Cardiac Surgery",
      "Orthopedic Surgery",
      "Neuro Surgery",
      "Pediatric Surgery",
      "Plastic Surgery",
      "Internal Medicine",
      "Radiology",
      "Pathology",
      "Anesthesiology",
      "Ophthalmology",
      "ENT Surgery",
      "Obstetrics & Gynecology",
      "Gastroenterology",
      "Pulmonology",
      "General Surgery",
      "Oncological Surgery",
    ],
  },
  qualification: String,
  yearsOfExperience: Number,
  email: { type: String, unique: true },
  availability: {
    type: String,
    enum: ["Full-time", "Part-time", "On-call"],
  },
  consultationMethod: {
    type: String,
    enum: ["In-person", "Online", "Both"],
  },
  doctorsFee: Number,
});

const Doctor = mongoose.model("Doctor", DoctorSchema);
export default Doctor;
