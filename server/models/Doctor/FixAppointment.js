import mongoose from "mongoose";

const FixAppointmentSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: { type: String, required: true },
  gender: { type: String, required: true },
  contactNumber: { type: String, required: true },
  appointmentType: { type: String, required: true },
  consultationMode: { type: String, required: true },
  preferredDoctor: { type: String },
  urgencyLevel: { type: String, required: true },
  preferredDate: { type: String, required: true },
  preferredTimeSlot: { type: String, required: true },
  reasonForAppointment: { type: String, required: true },
  symptoms: { type: String },
  department: { type: String, required: true },
  preferredCommunicationMethod: { type: String, required: true },
  status: { type: String, default: "Pending" },
});

const FixAppointment = mongoose.model("FixAppointment", FixAppointmentSchema);
export default FixAppointment;
