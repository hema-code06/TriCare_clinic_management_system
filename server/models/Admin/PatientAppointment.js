import mongoose from "mongoose";

const PatientAppointmentSchema = new mongoose.Schema({
  patientID: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  appointmentType: { type: String, required: true },
  preferredDoctor: { type: String },
  preferredDate: { type: String, required: true },
  preferredTimeSlot: { type: String, required: true },
});

export default mongoose.model("PatientAppointment", PatientAppointmentSchema);
