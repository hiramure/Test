import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import HashLoader from "react-spinners/HashLoader";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

function EditTOPopup({ user, openPopup, setOpenPopup }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    role: "",
    phone: "",
    lab: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
        email: user.email || "",
        password: "",
        role: user.role || "",
        phone: user.phone || "",
        lab: user.lab || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/${user.role}/${user._id}`, {
        method: "put",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
      }

      const { message } = await res.json();

      setLoading(false);
      toast.success(message);
      navigate("/admin/profile");
    } catch (err) {
      toast.error(err.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <Dialog open={openPopup} className="edit-popup">
      <div style={{ marginLeft: "auto", margin: "5px 0px 0px 300px" }}>
        <Button
          className="btn"
          size="small"
          disabled={loading && true}
          type="button"
          onClick={() => {
            setOpenPopup(false);
          }}
          variant="contained"
          sx={{
            mr: 1,
            backgroundColor: "#E6AD29",
            "&:hover": {
              backgroundColor: "#E7DC95",
            },
          }}
        >
          x
        </Button>
      </div>
      <DialogTitle>Edit Technical Officer</DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 300,
            maxWidth: "100%",
          }}
        >
          <TextField
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleInputChange}
            fullWidth
            label="First Name"
            style={{ margin: "5px 0px 5px 0px" }}
          />
          <TextField
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleInputChange}
            fullWidth
            label="Last Name"
            style={{ margin: "5px 0px 5px 0px" }}
          />
          <TextField
            name="username"
            type="text"
            value={formData.username}
            onChange={handleInputChange}
            fullWidth
            label="Username"
            style={{ margin: "5px 0px 5px 0px" }}
          />
          <TextField
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            label="Email"
            style={{ margin: "5px 0px 5px 0px" }}
          />
          <TextField
            name="phone"
            type="text"
            value={formData.phone}
            onChange={handleInputChange}
            fullWidth
            label="Phone"
            style={{ margin: "5px 0px 5px 0px" }}
          />
          <InputLabel
            id="roleLabel"
            style={{ margin: "5px 5px 5px 5px", width: "300px" }}
          >
            Laboratory
          </InputLabel>
          <Select
            name="lab"
            value={formData.lab}
            onChange={handleInputChange}
            onSubmit={submitHandler}
            fullWidth
            label="Laboratory"
            id="labSelect"
          >
            <MenuItem value="Laboratory 1">Laboratory 1</MenuItem>
            <MenuItem value="Laboratory 2">Laboratory 2</MenuItem>
            <MenuItem value="Laboratory 3">Laboratory 3</MenuItem>
            <MenuItem value="Laboratory 4">Laboratory 4</MenuItem>
            <MenuItem value="Laboratory 5">Laboratory 5</MenuItem>
          </Select>
          <TextField
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            fullWidth
            label="Password"
            style={{ margin: "5px 0px 5px 0px" }}
          />
          <div className="mt-7">
            <button
              disabled={loading && true}
              type="submit"
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
              onClick={submitHandler}
            >
              {loading ? <HashLoader size={20} color="#ffffff" /> : "Update"}
            </button>
          </div>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default EditTOPopup;
