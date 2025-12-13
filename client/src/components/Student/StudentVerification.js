import React, { useState } from "react";
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
  useTheme,
  CircularProgress
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function StudentVerification() {
  const theme = useTheme();
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleVerify = async () => {
    setStudent(null);
    setLoading(true); // Start loading

    try {
      const res = await axios.get(
        `/api/student/profile?enrollmentNumber=${enrollmentNumber}`
      );
      setStudent(res.data);
      toast.success("Student found successfully");
    } catch (err) {
      toast.error("Student not found");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // if(loading){
  //   return <Box sx={{display:"flex", justifyContent:"center"}}>
  //       <CircularProgress color="success" />
  //   </Box>
  // }

  const showDate= (date1) => {
  const date = new Date(date1);
  const day = date.getDate();
  const month = date.toLocaleString('en-GB', { month: 'long' });
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

  return (
    <Container maxWidth="sm" sx={{ my: 6 }}>
      <ToastContainer />

      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor: theme.palette.background.default,
          border: `1px solid ${theme.palette.primary.main}`,
        }}
      >
        <Typography
          variant="h5"
          sx={{ mb: 3, fontWeight: 600, color: theme.palette.primary.main }}
        >
          🎓 Student Verification
        </Typography>

        <TextField
          fullWidth
          label="Enrollment Number"
          value={enrollmentNumber}
          onChange={(e) => setEnrollmentNumber(e.target.value)}
          variant="outlined"
          margin="normal"
          required
        />

        <Button
          variant="contained"
          onClick={handleVerify}
          fullWidth
          disabled={loading}
          sx={{
            mt: 2,
            py: 1.3,
            fontWeight: 600,
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
            "&.Mui-disabled": {
              backgroundColor: theme.palette.primary.main,
              color: "#fff",
              opacity: 0.7, // Optional: slightly faded to indicate it's disabled
            },
          }}
        >
          {loading ? "Verifying..." : "Verify"}
        </Button>

        {loading && (
          <Box sx={{display:"flex", justifyContent:"center", alignItems:"center" , flexDirection:"column"}}>
            <CircularProgress color="success" /> 
            <p>Please wait while loading...</p>
          </Box>
        )}

        {student && (
          <TableContainer
            component={Paper}
            sx={{
              mt: 5,
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <Table>
              <TableBody sx={{ backgroundColor: "#f4f4f4" }}>
                {student.studentProfilePicture && (
                  <TableRow sx={{ backgroundColor: "#f4f4f4" }}>
                    <TableCell colSpan={2} align="center">
                      <Avatar
                        alt={student.studentName}
                        src={`data:image/jpeg;base64,${student.studentProfilePicture}`}
                        sx={{ width: 100, height: 100, mx: "auto", my: 2 }}
                      />
                    </TableCell>
                  </TableRow>
                )}

                {renderInfoRow("Enrollment Number", student.enrollmentNumber)}
                {renderInfoRow("Student Name", student.studentName)}
                {renderInfoRow("Gender", student.gender)}
                {renderInfoRow("Father's Name", student.fatherName)}
                {renderInfoRow("Program Name", student.programName)}
                {renderInfoRow("Course Name", student.courseName)}
                {renderInfoRow("Date of Birth", showDate(student.dateOfBirth))}
                {renderInfoRow("Admission Date", showDate(student.admissionDate))}
                {renderInfoRow("Certificate Issue Date", showDate(student.certificateIssueDate))}
                {renderInfoRow("Verified", student.isVerified ? "Yes" : "No")}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
}

// Reusable row renderer with border and subtle alternating row background
const renderInfoRow = (label, value, index) => (
  <TableRow key={label} sx={{ "& td": { borderBottom: "1px solid #ccc" } }}>
    <TableCell sx={{ fontWeight: "bold", width: "40%", py: 1.5 }}>
      {label}
    </TableCell>
    <TableCell sx={{ py: 1.5 }}>{value}</TableCell>
  </TableRow>
);
