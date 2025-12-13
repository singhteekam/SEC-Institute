import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Avatar,
  Paper,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  FormControlLabel,
  Checkbox,
  useTheme,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageCompressor from "image-compressor.js";
import courseOptions from "../../utils/courseOptions";
import enGB from 'date-fns/locale/en-GB';

export default function RegisterStudent() {
  const theme = useTheme();
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
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGenderChange = (e, newGender) => {
    if (newGender !== null) {
      setFormData((prev) => ({ ...prev, gender: newGender }));
    }
  };

  // const handleFileChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   if (file.size > 0.064 * 1024 * 1024) {
  //     try {
  //       new ImageCompressor(file, {
  //         quality: 0.6,
  //         maxWidth: 800,
  //         maxHeight: 800,
  //         success(result) {
  //           setSelectedFile(result);
  //           const reader = new FileReader();
  //           reader.onloadend = () => setPreview(reader.result);
  //           reader.readAsDataURL(result);
  //         },
  //         error(err) {
  //           console.error("Image compression error:", err);
  //         },
  //       });
  //     } catch (error) {
  //       console.error("Compression failed:", error);
  //     }
  //   } else {
  //     setSelectedFile(file);
  //     const reader = new FileReader();
  //     reader.onloadend = () => setPreview(reader.result);
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 64 KB in bytes
    const maxSize = 64 * 1024;

    if (file.size > maxSize) {
      toast.error(
        "File size should be less than or equal to 64 KB. Please choose a smaller file."
      );
      // Optionally reset file input here if you want to clear it:
      e.target.value = null;
      return;
    }

    // If file size is okay, proceed
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
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
      isVerified
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
    console.log(selectedFile);
    if (selectedFile) {
      data.append("profilePicture", selectedFile);
    }

    try {
      const res = await axios.post("/api/admin/create/student", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 201) {
        toast.success("Student registered successfully!");
        handleReset();
      } else {
        throw new Error("Failed to register");
      }
    } catch (error) {
      toast.error("Error registering student. Please try again.");
      console.error("Error:", error);
    }
  };

  const handleReset = () => {
    setFormData({
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
    });
    setSelectedFile(null);
    setPreview(null);
    toast.info("Form reset successfully");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
      <Container component="main" maxWidth="sm">
        <ToastContainer />
        <Paper elevation={6} sx={{ p: 4, mt: 6, borderRadius: 3 }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar sx={{ bgcolor: "primary.main", mb: 2 }}>
              <SchoolIcon />
            </Avatar>
            <Typography component="h1" variant="h5" gutterBottom>
              Register Student
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              width="100%"
            >
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
                        backgroundColor: theme.palette.secondary.main, // your misty blue/gray
                        color: theme.palette.text.primary,
                        "&:hover": {
                          backgroundColor:
                            theme.palette.secondary.dark ||
                            theme.palette.secondary.main,
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
                    setFormData((prev) => ({
                      ...prev,
                      admissionDate: newValue,
                    }))
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
                    required={false}
                  />
                </Button>
                {preview && (
                  <Box mt={2}>
                    <Typography variant="subtitle2">Preview:</Typography>
                    <Avatar src={preview} sx={{ width: 100, height: 100 }} />
                  </Box>
                )}
              </Box>
              <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ borderRadius: 2 }}
                >
                  Register
                </Button>
                <Button
                  onClick={handleReset}
                  fullWidth
                  variant="outlined"
                  sx={{ borderRadius: 2 }}
                >
                  Reset
                </Button>
              </Stack>
            </Box>
          </Box>
        </Paper>
      </Container>
    </LocalizationProvider>
  );
}
