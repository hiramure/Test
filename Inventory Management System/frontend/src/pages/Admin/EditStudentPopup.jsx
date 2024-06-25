import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import HashLoader from "react-spinners/HashLoader";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

function EditStudentPopup({ user, openPopup, setOpenPopup }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    role: "",
    regNo: "",
    batch: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
        email: user.email || "",
        regNo: user.regNo || "",
        batch: user.batch || "",
        password: user.password || "",
        role: user.role || "",
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
          disabled={loading}
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
      <DialogTitle>Edit Student</DialogTitle>

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
            name="regNo"
            type="text"
            value={formData.regNo}
            onChange={handleInputChange}
            fullWidth
            label="Reg. No"
            id="regNo"
            style={{ margin: "10px 0px 5px 0px" }}
          />
          <TextField
            name="batch"
            type="number"
            value={formData.batch}
            onChange={handleInputChange}
            fullWidth
            label="Batch"
            id="batch"
            style={{ margin: "10px 0px 5px 0px" }}
          />
          <TextField
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleInputChange}
            fullWidth
            label="First Name"
            id="firstName"
            style={{ margin: "10px 0px 5px 0px" }}
          />
          <TextField
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            fullWidth
            label="Last Name"
            id="lastName"
            style={{ margin: "5px 0px 5px 0px" }}
          />
          <TextField
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            label="email"
            id="email"
            style={{ margin: "5px 0px 5px 0px" }}
          />
          <TextField
            name="username"
            type="text"
            value={formData.username}
            onChange={handleInputChange}
            fullWidth
            label="UserName"
            id="username"
            style={{ margin: "5px 0px 5px 0px" }}
          />
          <TextField
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            fullWidth
            label="password"
            id="password"
            style={{ margin: "5px 0px 5px 0px" }}
          />

          <div className="mt-7">
            <button
              disabled={loading}
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

export default EditStudentPopup;
