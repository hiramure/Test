import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { BASE_URL } from "../../config.js";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ItemRequest from "../ItemRequest/ItemRequest";
import { toast } from "react-toastify";

export default function ItemListView() {
  const [openPopup, setOpenPopup] = useState(false);
  const [item, setItem] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/item/${id}`)
      .then((response) => {
        setItem(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        alert(error.message);
        toast.error("Something is wrong with getting the item.");
      });
  }, []);
  return (
    <div>
      <Button
        type="button"
        className="btn btn-outline-warning "
        sx={{
          position: "absolute",
          top: 200,
          right: 150,
          borderRadius: "6px",
          padding: "10px",
          color: "black",
          backgroundColor: "#FFAD33",
          "&:hover": {
            backgroundColor: "#F8F0E4",
            color: "black",
          },
        }}
        onClick={() => setOpenPopup(true)}
      >
        Send Request
      </Button>
      <List
        sx={{
          width: "100%",
          maxWidth: 720,
          bgcolor: "background.paper",
          marginLeft: "200px",
          overflowY: "auto",
        }}
      >
        <ListItem alignItems="flex-start">
          <ListItemText
            primary="Serial Number"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                ></Typography>
                {item.itemId}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider />
        {/* <ListItem alignItems="flex-start">
          <ListItemText
            primary="Category "
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                ></Typography>
                {item.categoryTest}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider /> */}
        <ListItem alignItems="flex-start">
          <ListItemText
            primary="Description"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                ></Typography>
                {item.description}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider />

        <ListItem alignItems="flex-start">
          <ListItemText
            primary="Available"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                ></Typography>
                {item.availability ? "Yes" : "No"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider />
        {!item.availability && ( // Render only if item is not available
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Borrowed by"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  ></Typography>
                  {item.borrowedBy}
                </React.Fragment>
              }
            />
          </ListItem>
        )}
        <Divider />
        <ListItem alignItems="flex-start">
          <ListItemText
            primary="Manual"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                ></Typography>
                {/* {item.description} */}

                <a
                  href={item.manualUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.manualUrl}
                </a>
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
      <ItemRequest
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        item={item}
      ></ItemRequest>
    </div>
  );
}
