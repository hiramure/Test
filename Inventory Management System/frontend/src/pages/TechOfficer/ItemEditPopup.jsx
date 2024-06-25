import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Dialog, DialogTitle, DialogContent, Grid } from "@mui/material";
import { BASE_URL } from "../../config.js";

const ItemEditPopup = ({ openPopup2, setOpenPopup2, selectedItemId }) => {
  console.log(selectedItemId);
  const [itemId, setItemId] = useState("");
  const [handlingMethos, setHandlingMethos] = useState("");
  const [description, setDescription] = useState("");
  const [borrowedBy, setBorrowedBy] = useState("");
  const [categoryTest, setCategoryTest] = useState("");
  const [availability, setAvailability] = useState(true);
  const [manualUrl, setManualUrl] = useState("");
  const [categories, setCategories] = useState([{}]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${BASE_URL}/category/categories`);
      const newData = await response.json();
      setCategories(newData);
    };

    const fetchItemData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/item/${selectedItemId}`);
        const itemData = response.data;

        setItemId(itemData.itemId);

        setCategoryTest(itemData.categoryTest);
        setAvailability(itemData.availability);
        setHandlingMethos(itemData.handlingMethos);
        setDescription(itemData.description);
        setBorrowedBy(itemData.borrowedBy);
        setManualUrl(itemData.manualUrl);
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };
    fetchData();
    fetchItemData();
    console.log(categoryTest);
  }, [selectedItemId]);

  const addItem = async () => {
    const newItem = {
      itemId,
      categoryTest,
      availability,
      handlingMethos,
      description,
      borrowedBy,
      manualUrl,
    };
    await axios.put(`${BASE_URL}/item/${selectedItemId}`, newItem);

    setOpenPopup2(false);
  };

  return (
    <Dialog open={openPopup2} fullWidth maxWidth="sm">
      <DialogTitle>
        Edit Item
        <IconButton
          aria-label="close"
          onClick={() => setOpenPopup2(false)}
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
            height: "500px",
            width: "600px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <TextField
                fullWidth
                id="itemId"
                value={itemId}
                onChange={(e) => {
                  setItemId(e.target.value);
                }}
                label="Item ID"
                autoComplete="off"
                style={{ margin: "10px 0px 0px 0px" }}
              />

              <TextField
                fullWidth
                id="description"
                value={description}
                style={{ margin: "10px 0px 5px 0px" }}
                label="Description"
                autoComplete="off"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <TextField
                fullWidth
                id="manualUrl"
                value={manualUrl}
                style={{ margin: "5px 0px 5px 0px" }}
                label="Manual"
                autoComplete="off"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Category"
                    value={categoryTest}
                    onChange={(e) => {
                      setCategoryTest(e.target.value);
                    }}
                  >
                    {categories.map((c) => (
                      <MenuItem value={c._id} key={c._id}>
                        {c.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <div
                className="form-group"
                //style={{ margin: "0px 0px 0px 200px" }}
              >
                <div
                  className="row-form-group "
                  style={{ margin: "0px 0px 0px 50px" }}
                >
                  <label className="col-sm-3 col-form-label">Available</label>
                  <div className="col-sm-2 mt-2 ">
                    <input
                      type="radio"
                      className="mx-2 "
                      name="availability"
                      // value="1"
                      onChange={() => {
                        setAvailability(true);
                        setVisible(false);
                        setBorrowedBy("");
                      }}
                      //onClick={() => setVisible(false)}
                    />
                    Yes{" "}
                  </div>
                  <div className="col-sm-2 mt-2">
                    <input
                      type="radio"
                      className="mx-2"
                      name="availability"
                      // value="0"
                      onChange={() => {
                        setAvailability(false);
                        setVisible(true);
                      }}
                      //onClick={() => setVisible(true)}
                    />
                    No{" "}
                  </div>
                </div>
                {visible && (
                  <TextField
                    id="borrowedBy"
                    label="Borrowed by"
                    style={{ margin: "0px 0px 0px 50px" }}
                    autoComplete="off"
                    onChange={(e) => {
                      setBorrowedBy(e.target.value);
                    }}
                  />
                )}
              </div>
            </Grid>
          </Grid>

          <Button
            variant="contained"
            onClick={addItem}
            sx={{
              // mr: 1,
              marginTop: 12,
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

export default ItemEditPopup;
