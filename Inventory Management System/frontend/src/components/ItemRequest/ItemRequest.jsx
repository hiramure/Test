import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { Dialog, DialogTitle, DialogContent, Grid, Icon } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config.js";
import { authContext } from "../../context/AuthContext.jsx";

const initialValues = {
  requestFrom: "",
  itemId: "",
  burrowDate: "",
  returnDate: "",
  purpose: "",
};

const ItemRequest = ({ openPopup, setOpenPopup, item }) => {
  const [values, setValues] = useState(initialValues);
  const [request, setRequest] = useState([{}]);

  const { user } = useContext(authContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${BASE_URL}/request/`);
      const newData = await response.json();
      setRequest(newData);
    };

    fetchData();
  }, []);

  const addItem = () => {
    const payload = {
      ...values,
      itemId: item._id,
      requestFrom: user ? user._id : null,
    };
    axios
      .post(`${BASE_URL}/request`, payload)
      .then((response) => {
        {
          console.log(response);
          console.log(payload);
          setValues("");
          navigate("/itemList");
          toast.success("Request successfully sent.");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Request failed.");
      });
    //navigate("/techOfficer/itemlist");
    setOpenPopup(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      // itemId: item._id,
      [name]: value,
    });
  };

  return (
    <Dialog open={openPopup} fullWidth maximize="sm">
      <DialogTitle>
        Send Request
        <IconButton
          aria-label="close"
          onClick={() => setOpenPopup(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {" "}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // width: 300,
            // maxWidth: "100%",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <h3
                style={{
                  marginTop: "0px",
                  marginLeft: "10px",
                  marginBottom: "10px",
                }}
                name="itemId"
                value={values.itemId}
              >
                {item.itemId}
              </h3>
              <TextField
                style={{ margin: "5px 0px" }}
                fullWidth
                id="fullWidth"
                label="Burrowing Date"
                type="date"
                name="burrowDate"
                value={values.burrowDate}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                style={{ margin: "5px 0px" }}
                fullWidth
                id="fullWidth"
                label="Returning Date"
                type="date"
                name="returnDate"
                value={values.returnDate}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                style={{ margin: "5px 0px" }}
                fullWidth
                id="fullWidth"
                label="Purpose"
                name="purpose"
                value={values.purpose}
                autoComplete="off"
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>

          <Button
            onClick={addItem}
            variant="contained"
            sx={{
              // mr: 1,
              marginTop: 2,
              backgroundColor: "#FFAD33",
              color: "black",
              "&:hover": {
                backgroundColor: "#F8F0E4",
                color: "black",
              },
            }}
          >
            Send
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ItemRequest;
