import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import HashLoader from "react-spinners/HashLoader";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

function AddLabIns(props) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    role: "labInstructor",
    phone: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (
      formData.firstName &&
      formData.lastName &&
      formData.username &&
      formData.email &&
      formData.password &&
      formData.role
    ) {
      setErrors("");
      return true;
    } else {
      let errorFeilds = [];
      for (const [key, value] of Object.entries(formData)) {
        if (!value) {
          errorFeilds.push(key);
        }
      }
      setErrors(errorFeilds.join(" , "));

      return false;
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "Content-type": "application/json",
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
      navigate("/admin");
    } catch (err) {
      toast.error(err.message || "An error occurred");
      setLoading(false);
    }
  };

  const { openPopup, setOpenPopup } = props;

  return (
    <Dialog open={openPopup} onSubmit={submitHandler}>
      <div style={{ marginLeft: "auto", margin: "5px 0px 0px 300px" }}>
        <Button
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
      <DialogTitle>Add New Lab Instructor</DialogTitle>

      <DialogContent>
        {" "}
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
            onSubmit={submitHandler}
            onChange={handleInputChange}
            fullWidth
            label="First Name"
            id="firstNameInput"
            style={{ margin: "10px 0px 5px 0px" }}
          />
          <TextField
            type="text"
            name="lastName"
            value={formData.lastName}
            onSubmit={submitHandler}
            onChange={handleInputChange}
            fullWidth
            label="Last Name"
            id="lastNameInput"
            style={{ margin: "5px 0px 5px 0px" }}
          />
          <TextField
            name="email"
            type="email"
            value={formData.email}
            onSubmit={submitHandler}
            onChange={handleInputChange}
            fullWidth
            label="email"
            id="emailInput"
            style={{ margin: "5px 0px 5px 0px" }}
          />
          <TextField
            name="phone"
            type="text"
            value={formData.phone}
            onSubmit={submitHandler}
            onChange={handleInputChange}
            fullWidth
            label="Phone number"
            id="phoneInput"
            style={{ margin: "5px 0px 5px 0px" }}
          />
          <TextField
            name="username"
            type="text"
            value={formData.username}
            onSubmit={submitHandler}
            onChange={handleInputChange}
            fullWidth
            label="username"
            id="usernameInput"
            style={{ margin: "5px 0px 5px 0px" }}
          />

          <TextField
            name="password"
            type="password"
            value={formData.password}
            onSubmit={submitHandler}
            onChange={handleInputChange}
            fullWidth
            label="password"
            id="passwordInput"
            style={{ margin: "5px 0px 5px 0px" }}
          />

          {errors && <div className="error">{`Please include: ${errors}`}</div>}

          <div className="mt-7">
            <button
              disabled={loading && true}
              type="submit"
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
              onClick={submitHandler}
            >
              {loading ? <HashLoader size={20} color="#ffffff" /> : "Register"}
            </button>
          </div>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default AddLabIns;
