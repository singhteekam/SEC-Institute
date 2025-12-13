// components/ViewStudentDetails.js
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Avatar,
  Stack,
  Button
} from '@mui/material';
import showDateDDMMYYYY from '../../utils/dateConvert';

export default function ViewStudentDetails({ open, onClose, student }) {
  if (!student) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>📄 Student Details</DialogTitle>
      <DialogContent>
        <Box display="flex" justifyContent="center" mb={2}>
          {student.studentProfilePicture && (
            <Avatar
              src={`data:image/jpeg;base64,${student.studentProfilePicture}`}
              alt={student.studentName}
              sx={{ width: 100, height: 100 }}
            />
          )}
        </Box>

        <Stack spacing={1}>
          <Typography><strong>Enrollment Number:</strong> {student.enrollmentNumber}</Typography>
          <Typography><strong>Student Name:</strong> {student.studentName}</Typography>
          <Typography><strong>Gender:</strong> {student.gender}</Typography>
          <Typography><strong>Father Name:</strong> {student.fatherName}</Typography>
          <Typography><strong>Program Name:</strong> {student.programName}</Typography>
          <Typography><strong>Course Name:</strong> {student.courseName}</Typography>
          <Typography><strong>Date of Birth:</strong> {showDateDDMMYYYY(student.dateOfBirth)}</Typography>
          <Typography><strong>Admission Date:</strong> {showDateDDMMYYYY(student.admissionDate)}</Typography>
          <Typography><strong>Verified:</strong> {student.isVerified ? 'Yes' : 'No'}</Typography>
        </Stack>

        <Box mt={3} textAlign="right">
          <Button variant="outlined" onClick={onClose}>Close</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
