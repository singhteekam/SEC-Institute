const mongoose = require("mongoose");

const IST_OFFSET = 330;

const studentSchema = new mongoose.Schema({
  enrollmentNumber: {
    type: String,
    required: true,
    unique: true,
  },
  studentName: {
    type: String,
    required: false,
  },
  studentProfilePicture: {
    type: String,
    default: "https://via.placeholder.com/150",
  },
  gender: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  programName: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  admissionDate: {
    type: String,
    required: true,
  },
  certificateIssueDate: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Student",
  },

  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: () => new Date(new Date().getTime() + IST_OFFSET * 60000),
  },
});

const Student = mongoose.model("students", studentSchema);

module.exports = Student;
