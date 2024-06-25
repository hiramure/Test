import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: "#F8F0E4",
      }}
    >
      <div>
        <Link>
          <Button
            variant="contained"
            sx={{
              fontSize: "15px",
              margin: "10px",
              width: "200px",
              height: "80px",
              border: "2px solid #E66107",
              borderRadius: "20px",
              backgroundColor: "Transparent",
              color: "#000000",
              "&:hover": {
                backgroundColor: "#FEECD3",
                color: "black",
              },
            }}
          >
            Admin
          </Button>
        </Link>

        <Link to={"/login"}>
          <Button
            variant="contained"
            sx={{
              fontSize: "15px",
              margin: "10px",
              width: "200px",
              height: "80px",
              border: "2px solid #E66107",
              borderRadius: "20px",
              backgroundColor: "transparent",
              color: "#000000",
              "&:hover": {
                backgroundColor: "#FEECD3",
                color: "black",
              },
            }}
          >
            User
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
