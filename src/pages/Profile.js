import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  TextField,
  Container,
  Box,
  Typography,
  Avatar,
  Grid,
  CircularProgress,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";
import useFetch from "../hooks/useFetch";
import "../styles/profile.css";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState("");
  const {
    data: userData,
    loading,
    error,
    // } = useFetch(`${BASE_URL}/users/${user._id}`);
  } = useFetch(`${BASE_URL}/users/${user.id}`);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [userData]);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true); // Bắt đầu tải ảnh lên

      // Tạo FormData để gửi file ảnh tới Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "tourImg"); // Hãy chắc chắn rằng preset này được phép tải lên ảnh

      try {
        // Upload ảnh lên Cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dyz76qvjr/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        if (data.secure_url) {
          // Cập nhật avatar mới vào trong state của avatar
          setAvatar(data.secure_url);
        }
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      } finally {
        setIsUploading(false); // Kết thúc quá trình tải ảnh lên
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      avatar,
      username,
      ...(password && { password }), // Only include password if it is non-empty
    };

    try {
      const response = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();
      if (result.success) {
        // alert("Profile updated successfully!");
        toast.success("Cập nhật tài khoản thành công");

        // Update user data in AuthContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { ...user, ...updatedData },
        });

        // Update user data in localStorage
        const updatedUser = { ...user, ...updatedData };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // Optionally, you can update the UI or show a success message.
      } else {
        // alert("Failed to update profile. Please try again.");
        toast.error("Cập nhật tài khoản thất bại");
        return;
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Cập nhật tài khoản thất bại");
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch({ type: "LOGIN_SUCCESS", payload: storedUser });
    }
  }, [dispatch]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Cài đặt tài khoản
        </Typography>

        <Avatar
          src={
            avatar ||
            "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg"
          }
          sx={{ width: 100, height: 100, mb: 2 }}
        />

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ mb: 2 }}
            disabled={isUploading}
          >
            {isUploading ? (
              <CircularProgress size={24} />
            ) : (
              "Cập nhật ảnh đại diện"
            )}
            <input type="file" hidden onChange={handleAvatarChange} />
          </Button>

          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Tên tài khoản"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={user.email}
            disabled
          />

          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Mật khẩu"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#faa935", // Default color
              color: "black", // Text color
              "&:hover": {
                backgroundColor: "#ff7e01", // Hover color
              },
            }}
          >
            Cập nhật tài khoản
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfilePage;
