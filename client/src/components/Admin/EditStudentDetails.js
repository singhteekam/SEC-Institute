// EditStudentDetails.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Avatar,
  Typography,
  FormControlLabel,
  Checkbox,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import courseOptions from "../../utils/courseOptions";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import enGB from 'date-fns/locale/en-GB';

export default function EditStudentDetails({
  open,
  student,
  onClose,
  onUpdate,
}) {
  const [formData, setFormData] = useState({
    enrollmentNumber: "",
    studentName: "",
    gender: "",
    fatherName: "",
    programName: "",
    courseName: "",
    dateOfBirth: null,
    admissionDate: null,
    certificateIssueDate: null,
    isVerified: false,
    studentProfilePicture: null,
  });
  const [preview, setPreview] = useState(null);

  // Initialize form data when student changes
  useEffect(() => {
    if (student) {
      setFormData({
        enrollmentNumber: student.enrollmentNumber || "",
        studentName: student.studentName || "",
        gender: student.gender || "",
        fatherName: student.fatherName || "",
        programName: student.programName || "",
        courseName: student.courseName || "",
        dateOfBirth: student.dateOfBirth ? new Date(student.dateOfBirth) : null,
        admissionDate: student.admissionDate
          ? new Date(student.admissionDate)
          : null,
        certificateIssueDate: student.certificateIssueDate
          ? new Date(student.certificateIssueDate)
          : null,
        isVerified: student.isVerified || false,
        studentProfilePicture: null,
      });
      setPreview(
        student.studentProfilePicture
          ? `data:image/jpeg;base64,${student.studentProfilePicture}`
          : null
      );
    }
  }, [student]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Reset courseName if programName changes
    if (name === "programName") {
      setFormData((prev) => ({ ...prev, courseName: "" }));
    }
  };

  // Gender toggle handler
  const handleGenderChange = (_, newGender) => {
    if (newGender !== null) {
      setFormData((prev) => ({ ...prev, gender: newGender }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 64 KB in bytes
    const maxSize = 64 * 1024;
    if (file.size > maxSize) {
      toast.error(
        "File size should be less than or equal to 64 KB. Please choose a smaller file."
      );
      e.target.value = null;
      return;
    }
    setFormData((prev) => ({ ...prev, studentProfilePicture: file }));
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  // Save button handler
  const handleSave = async (e) => {
    e.preventDefault();

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
      studentProfilePicture,
      isVerified,
    } = formData;

    if (
      !enrollmentNumber ||
      !studentName ||
      !gender ||
      !fatherName ||
      !programName ||
      !courseName ||
      !dateOfBirth ||
      !admissionDate ||
      !certificateIssueDate
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    const data = new FormData();
    data.append("enrollmentNumber", enrollmentNumber);
    data.append("studentName", studentName);
    data.append("gender", gender);
    data.append("fatherName", fatherName);
    data.append("programName", programName);
    data.append("courseName", courseName);
    data.append("dateOfBirth", dateOfBirth);
    data.append("admissionDate", admissionDate);
    data.append("certificateIssueDate", certificateIssueDate);
    data.append("isVerified", isVerified);
    console.log(studentProfilePicture);
    if (studentProfilePicture) {
      data.append("profilePicture", studentProfilePicture);
    }

    try {
      const res = await axios.put(
        `/api/admin/editstudent/save?studentId=${student._id}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Response:", res.data);
      if (res.status === 200) {
        toast.success("Student details edited successfully!");
        setTimeout(() => {
          onClose();
          onUpdate();
        }, 700);
      } else {
        toast.error("Failed to edit student details. Please try again later.");
        throw new Error("Failed to Edit student details");
      }
    } catch (error) {
      toast.error("Error editing student details. Please try again...");
      console.error("Error:", error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <ToastContainer />
      <DialogTitle>Edit Student Details</DialogTitle>
      <DialogContent dividers>
        <TextField
          fullWidth
          label="Enrollment Number"
          name="enrollmentNumber"
          value={formData.enrollmentNumber}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Student Name"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>
          Gender
        </Typography>
        <ToggleButtonGroup
          value={formData.gender}
          exclusive
          onChange={handleGenderChange}
          fullWidth
        >
          {["male", "female", "other"].map((gender) => (
            <ToggleButton
              key={gender}
              value={gender}
              sx={{
                textTransform: "capitalize",
                fontWeight: "bold",
                borderRadius: 1,
                "&.Mui-selected": {
                  backgroundColor: "#90caf9",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#64b5f6",
                  },
                },
              }}
            >
              {gender}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <TextField
          fullWidth
          label="Father Name"
          name="fatherName"
          value={formData.fatherName}
          onChange={handleChange}
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="program-label">Program Name</InputLabel>
          <Select
            labelId="program-label"
            name="programName"
            value={formData.programName}
            label="Program Name"
            onChange={handleChange}
          >
            <MenuItem value="Diploma">Diploma</MenuItem>
            <MenuItem value="Courses">Courses</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="course-label">Course Name</InputLabel>
          <Select
            labelId="course-label"
            name="courseName"
            value={formData.courseName}
            label="Course Name"
            onChange={handleChange}
            disabled={!formData.programName}
          >
            {formData.programName &&
              courseOptions[formData.programName]?.map((course) => (
                <MenuItem key={course} value={course}>
                  {course}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
          <Stack spacing={2} direction="column" sx={{ mt: 2 }}>
            <DatePicker
              label="Date of Birth"
              value={formData.dateOfBirth}
              onChange={(newValue) =>
                setFormData((prev) => ({ ...prev, dateOfBirth: newValue }))
              }
              renderInput={(params) => (
                <TextField {...params} margin="normal" fullWidth required />
              )}
            />
            <DatePicker
              label="Admission Date"
              value={formData.admissionDate}
              onChange={(newValue) =>
                setFormData((prev) => ({ ...prev, admissionDate: newValue }))
              }
              renderInput={(params) => (
                <TextField {...params} margin="normal" fullWidth required />
              )}
            />
            <DatePicker
              label="Certificate Issue Date"
              value={formData.certificateIssueDate}
              onChange={(newValue) =>
                setFormData((prev) => ({
                  ...prev,
                  certificateIssueDate: newValue,
                }))
              }
              renderInput={(params) => (
                <TextField {...params} margin="normal" fullWidth required />
              )}
            />
          </Stack>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.isVerified}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isVerified: e.target.checked,
                }))
              }
              name="isVerified"
              color="success"
            />
          }
          label="Mark this as verified student"
        />
        <Box mt={2}>
          <Button variant="contained" component="label">
            Upload Profile Picture
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
          {preview && (
            <Box mt={2} textAlign="center">
              <Typography variant="subtitle2">Preview:</Typography>
              <Avatar
                src={preview}
                sx={{ width: 100, height: 100, margin: "auto" }}
              />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
    </LocalizationProvider>
  );
}
