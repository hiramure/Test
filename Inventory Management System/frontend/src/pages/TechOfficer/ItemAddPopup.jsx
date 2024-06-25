import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { Dialog, DialogTitle, DialogContent, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config.js";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const intialValues = {
  itemId: "",
  handlingMethos: "",
  description: "",
  category: "",
  availability: true,
  borrowedBy: "",
  manualUrl: "",
  categoryTest: "",
};

const ItemAddPopup = ({ openPopup, setOpenPopup }) => {
  const [values, setValues] = useState(intialValues);
  const [categories, setCategories] = useState([{}]);
  // const [categoryTest, setCategoryTest] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${BASE_URL}/category/categories`);
      const newData = await response.json();
      setCategories(newData);
    };
    fetchData();
  }, []);

  const addItem = () => {
    axios
      .post(`${BASE_URL}/item/`, values)
      .then((response) => {
        {
          console.log(response);
          console.log(values);
          setValues("");
          navigate("/techOfficer/itemlist");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    //navigate("/techOfficer/itemlist");
    setOpenPopup(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <Dialog open={openPopup} fullWidth maxWidth="sm">
      <DialogTitle>
        Add New Inventory
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
              <TextField
                fullWidth
                id="fullWidth"
                //style={{ margin: "5px 0px 5px 0px" }}
                name="itemId"
                label="Item ID"
                value={values.itemId}
                onChange={handleInputChange}
                autoComplete="off"
              />

              <TextField
                fullWidth
                id="fullWidth"
                style={{ margin: "5px 0px 5px 0px" }}
                name="description"
                label="Description"
                value={values.description}
                onChange={handleInputChange}
                autoComplete="off"
              />
              <TextField
                fullWidth
                id="fullWidth"
                style={{ margin: "5px 0px 5px 0px" }}
                name="manualUrl"
                label="Manual"
                value={values.manualUrl}
                onChange={handleInputChange}
                autoComplete="off"
              />
              {/* <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.category}
                    label="Category"
                    name="category"
                    onChange={handleInputChange}
                  >
                    {categories.map((c) => (
                      <MenuItem value={c.name} key={c._id}>
                        {c.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box> */}
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.categoryTest}
                    label="Category"
                    name="categoryTest"
                    onChange={handleInputChange}
                    // onChange={(value) => {
                    //   setCategoryTest(value);
                    // }}
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
              {/* dropdown for category */}

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
                    Yes{" "}
                    <input
                      type="radio"
                      className="mx-2 "
                      name="availability"
                      value="1"
                      onChange={handleInputChange}
                      onClick={() => setVisible(false)}
                    />
                  </div>
                  <div className="col-sm-2 mt-2">
                    No{" "}
                    <input
                      type="radio"
                      className="mx-2"
                      name="availability"
                      onChange={handleInputChange}
                      value="0"
                      onClick={() => setVisible(true)}
                    />
                  </div>
                </div>
                {visible && (
                  <TextField
                    label="Borrowed by"
                    style={{ margin: "0px 0px 0px 50px" }}
                    autoComplete="off"
                    name="borrowedBy"
                    value={values.borrowedBy}
                    onChange={handleInputChange}
                  />
                )}
              </div>
            </Grid>
          </Grid>

          <Button
            onClick={addItem}
            variant="contained"
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

export default ItemAddPopup;
