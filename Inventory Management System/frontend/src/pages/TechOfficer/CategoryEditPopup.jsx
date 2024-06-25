import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { BASE_URL } from "../../config.js";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const CategoryEditPopup = ({ openPopup, setOpenPopup, selectedCategory }) => {
  console.log(selectedCategory);
  const [name, setName] = useState("");

  useEffect(() => {
    axios.get(`${BASE_URL}/category/${selectedCategory}`).then((response) => {
      setName(response.data.name);
    });
  }, [selectedCategory]);

  const addCategory = async () => {
    const newCategory = { name };
    await axios.put(`${BASE_URL}/category/${selectedCategory}`, newCategory);
    setOpenPopup(false);
  };
  return (
    <Dialog open={openPopup} fullWidth maxWidth="sm">
      <DialogTitle>
        Edit category
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
        {""}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            id="category"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            style={{ margin: "5px 0px 5px 0px" }}
            label="Category"
            autoComplete="off"
          />
          <Button
            variant="contained"
            onClick={addCategory}
            sx={{
              // mr: 1,
              marginTop: 2,
              backgroundColor: "#FFAD33",
              "&:hover": {
                backgroundColor: "#F8F0E4",
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryEditPopup;
