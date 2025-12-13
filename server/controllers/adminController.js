const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
// const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const Counter = require("../models/Counter");
const sendEmail = require("../services/mailer");
const Admin = require("../models/Admin");
const { default: mongoose } = require("mongoose");
// const Visit = require("../models/Visitor");
// const passport = require("../services/passportAuth.js");

const getNextEnrollmentNumber = async () => {
  const counter = await Counter.findByIdAndUpdate(
    { _id: "student_enrollment" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const padded = String(counter.seq).padStart(4, "0");
  return `SECI${padded}`;
};

exports.fetchAllStudents = async (req, res) => {
  const { page = 1, search = "" } = req.query;
  const pageSize = 10;

  try {
   const query = {
  $or: [
    { studentName: { $regex: search, $options: "i" } },
    { enrollmentNumber: { $regex: search, $options: "i" } }
  ]
};

    const total = await Student.countDocuments(query);
    const students = await Student.find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({
      students,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createNewStudent = async (req, res) => {
  try {
    const {
      enrollmentNumber,
      studentName,
      gender,
      fatherName,
      programName,
      courseName,
      dateOfBirth,
      admissionDate,
      certificateIssueDate,
      isVerified,
    } = req.body;

    // const enrollmentNumber = await getNextEnrollmentNumber();

    const existingUser = await Student.findOne({ enrollmentNumber });
    if (existingUser) {
      return res.status(400).json({ message: "Student already exists" });
    }

    let profilePictureData = null;
    const profilePicture = req.files.find(
      (file) => file.fieldname === "profilePicture"
    );
    if (!profilePicture) {
      profilePictureData =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";
    } else {
      // Convert the file buffer to a Base64 string
      profilePictureData = profilePicture.buffer.toString("base64");
    }

    console.log("File uploaded:", profilePictureData);

    const newStudent = new Student({
      enrollmentNumber,
      studentName,
      gender,
      fatherName,
      programName,
      courseName,
      dateOfBirth,
      admissionDate,
      certificateIssueDate,
      isVerified: isVerified || false,
      studentProfilePicture: profilePictureData,
    });

    await newStudent.save();

    const receiver = process.env.EMAIL;
    const subject = "New student registered successfully!";
    const html = `
              <div class="content">
                <h2>Hi ${receiver},</h2>
                <p>New Student has been created successfully.</p>
                <p>Please validate the below details: </p>
                <div class="student-details">
                  <p><strong>Enrollment Number:</strong> ${newStudent.enrollmentNumber}</p>
                  <p><strong>Student Name:</strong> ${newStudent.studentName}</p>
                  <p><strong>Gender:</strong> ${newStudent.gender}</p>
                  <p><strong>Father's Name:</strong> ${newStudent.fatherName}</p>
                  <p><strong>Program Name:</strong> ${newStudent.programName}</p> 
                  <p><strong>Course Name:</strong> ${newStudent.courseName}</p>
                  <p><strong>Date of Birth:</strong> ${newStudent.dateOfBirth}</p>
                  <p><strong>Admission Date:</strong> ${newStudent.admissionDate}</p>
                  <p><strong>Certificate Issue Date:</strong> ${newStudent.certificateIssueDate}</p>
              </div>
                `;

    // sendEmail(receiver, subject, html)
    //   .then((response) => {
    //     console.log(`Email sent to ${receiver}:`, response);
    //   })
    //   .catch((error) => {
    //     console.error("Error sending email:", error);
    //   });

    res.status(201).json({
      message: "Student created successfully",
      enrollmentNumber: newStudent.enrollmentNumber,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Student creation failed", error: error.message });
  }
};

exports.editStudentDetails = async (req, res) => {
  try {
    const studentId = req.query.studentId;
    const {
      enrollmentNumber,
      studentName,
      gender,
      fatherName,
      programName,
      courseName,
      dateOfBirth,
      admissionDate,
      isVerified
    } = req.body;
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    // Check if the enrollment number is already taken by another student
    const existingStudent = await Student.findOne({
      enrollmentNumber,
      _id: { $ne: studentId }, // Exclude the current student
    });
    if (existingStudent) {
      return res.status(400).json({ message: "Enrollment number already exists" }); 
    }
    // Handle profile picture upload
    let profilePictureData = null;  
    const profilePicture = req.files.find(
      (file) => file.fieldname === "profilePicture"
    );
    if (profilePicture) {
      // Convert the file buffer to a Base64 string
      profilePictureData = profilePicture.buffer.toString("base64");
      console.log("File uploaded:", profilePictureData);
    } else {
      // If no new profile picture is uploaded, keep the existing one
      profilePictureData = student.studentProfilePicture;
    }
    // Update student details
    student.enrollmentNumber = enrollmentNumber;
    student.studentName = studentName;
    student.gender= gender;
    student.fatherName = fatherName;
    student.programName = programName;
    student.courseName = courseName;
    student.dateOfBirth = dateOfBirth;
    student.admissionDate = admissionDate;
    student.isVerified = isVerified || false;
    student.studentProfilePicture = profilePictureData;
    await student.save();
    res.status(200).json({
      message: "Student details updated successfully",
      student: {
        id: student._id,
        enrollmentNumber: student.enrollmentNumber,
        studentName: student.studentName,
      }
    });
  } catch (error) {
    console.error("Error updating student details:", error);
    res.status(500).json({ message: "Failed to update student details", error: error.message });
  }
};


exports.createNewAdmin = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const newAdmin = new Admin({
      fullName,
      userName: email.split("@")[0], // Use email prefix as username
      email,
      password: await bcrypt.hash(password, 10), // Hash the password
      isVerified: true,
    });

    await newAdmin.save();

    res.status(201).json({
      message: "Admin created successfully",
    });
  } catch (error) {
    console.log("Error creating admin:", error);
    res
      .status(500)
      .json({ message: "Admin creation failed", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: admin._id, email: admin.email, fullName: admin.fullName },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
        userName: admin.userName,
      },
    });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

exports.getProfileDetails= async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.error("Invalid user ID:", userId);
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const admin = await Admin.findById(userId);
    if (!admin) {
      console.error("Admin not found for user ID:", userId);
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json({
      userName: admin.userName,
      fullName: admin.fullName,
      email: admin.email,
      role: admin.role,
      profilePicture: admin.profilePicture,
      isVerified: admin.isVerified,
      createdAt: admin.createdAt,
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// exports.uploadProfilePicture2 = async (req, res) => {
//   try {
//       const userId = req.query.userId;
//       console.log("UserID:", userId);

//       // Access the uploaded file from req.files
//       const profilePicture = req.files.find(file => file.fieldname === "profilePicture");

//       if (!profilePicture) {
//           return res.status(400).json({ error: "No profile picture uploaded" });
//       }

//       console.log("File uploaded:", profilePicture);

//       // Convert the file buffer to a Base64 string
//       const profilePictureData = profilePicture.buffer.toString("base64");

//       // Save the profile picture to the user's database record
//       console.log("user idddd:  ", userId);
//       const user = await User.findById(userId);
//       if (!user) {
//           return res.status(404).json({ error: "User not found" });
//       }

//       user.profilePicture = profilePictureData;
//       await user.save();

//       res.status(200).json({ message: "Profile picture uploaded successfully", user: user });
//   } catch (error) {
//       console.error("Error uploading profile picture:", error);

//       res.status(500).json({ error: "Failed to upload profile picture" });
//   }
// };
