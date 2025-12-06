import mongoose from "mongoose";

const BookAppointmentSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: { type: String, required: true },
  gender: { type: String, required: true },
  contactNumber: { type: String, required: true },

  appointmentType: {
    type: String,
    enum: ["New Consultation", "Follow-Up", "Teleconsultation"],
    required: true,
  },
  consultationMode: {
    type: String,
    enum: ["In-person", "Virtual/Telemedicine"],
    required: true,
  },
  preferredDoctor: { type: String },
  urgencyLevel: {
    type: String,
    enum: ["Routine", "Urgent", "Emergency"],
    required: true,
  },
  preferredDate: { type: String, required: true },
  preferredTimeSlot: { type: String, required: true },
  reasonForAppointment: { type: String, required: true },
  symptoms: { type: String },
  department: {
    type: String,
    enum: [
      "Cardiology",
      "Pediatrics",
      "Dermatology",
      "Neurology",
      "Orthopedics",
      "Gastroenterology",
      "Oncology",
      "Endocrinology",
      "Nephrology",
      "Ophthalmology",
      "ENT",
      "Pulmonology",
      "Psychiatry",
      "General Medicine",
      "Other",
    ],
    required: true,
  },
  preferredCommunicationMethod: {
    type: String,
    enum: ["Call", "Email", "SMS"],
    required: true,
  },
});

const BookAppointment = mongoose.model(
  "BookAppointment",
  BookAppointmentSchema
);
export default BookAppointment;
