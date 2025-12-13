// pages/AdminProfile.js
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

export default function AdminProfile() {
  const theme = useTheme();
  const [adminData, setAdminData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUser(parsedUser);
      //   console.log("User Data:", JSON.parse(user));
    }
  }, []);

  //   console.log("User ID:", user ? JSON.parse(user)._id : "No user data");

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (!user || !user._id) {
          toast.error("User not found in localStorage");
          return;
        }

        const res = await axios.get(`/api/admin/profile?userId=${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAdminData(res.data);
        if (res.data.profilePicture) {
          setPreview(`data:image/jpeg;base64,${res.data.profilePicture}`);
        }
      } catch (error) {
        console.error("Failed to fetch admin profile:", error);
        toast.error("Failed to fetch profile");
      }
    };

    fetchAdmin();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 64 * 1024) {
      toast.error("File size must be less than 64KB.");
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", selectedFile);

    try {
      const res = await axios.put("/api/admin/updateProfilePicture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 200) {
        toast.success("Profile picture updated!");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    }
  };

  if (!adminData) return null;

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography
          variant="h5"
          sx={{ mb: 3, fontWeight: 600, color: theme.palette.primary.main }}
        >
          👤 Admin Profile
        </Typography>

        <Box display="flex" justifyContent="center" mb={3}>
          <Avatar src={preview} sx={{ width: 100, height: 100 }} />
        </Box>

        <TextField
          fullWidth
          label="Full Name"
          value={adminData.fullName}
          margin="normal"
          disabled
        />
        <TextField
          fullWidth
          label="Email"
          value={adminData.email}
          margin="normal"
          disabled
        />
        <TextField
          fullWidth
          label="Role"
          value={adminData.role}
          margin="normal"
          disabled
        />

        <Box mt={2}>
          <Button variant="contained" component="label">
            Upload New Profile Picture
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>

          {selectedFile && (
            <Button variant="outlined" sx={{ ml: 2 }} onClick={handleUpload}>
              Save Picture
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
