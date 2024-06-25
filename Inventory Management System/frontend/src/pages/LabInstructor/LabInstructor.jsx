import React from "react";
import { authContext } from "../../context/AuthContext.jsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import "./LabInstructor.css";
import bg from "../../assets/images/sddefault.jpg";
import image1 from "../../assets/images/elecdep.jpg";
import image2 from "../../assets/images/download.jpg";
import { Parallax, Background } from "react-parallax";

const LabInstructor = () => {
  const { user, token } = useContext(authContext);
  // console.log(user);
  const navigate = useNavigate();

  const handleButtonClick1 = () => {
    navigate("/categoryList");
  };
  const handleButtonClick2 = () => {
    navigate("/itemList");
  };
  const handleButtonClick3 = () => {
    navigate("/labInstructor/request");
  };

  return (
    <div className="App">
      <Parallax
        className="parallax img"
        strength={300}
        bgImage={bg}
        bgImageAlt="background"
      >
        <div className="LIcontainer">
          <div className="text_content">
            <div style={{ fontSize: 50 }}>
              Laboratory of Electrical and Information Engineering University of
              Ruhuna
            </div>
            <div style={{ fontSize: 20 }}>
              Discover our Electrical and Information Engineering Department's
              cutting-edge Renewable Energy and High Voltage Laboratory,
              equipped with state-of-the-art equipment for hands-on study and
              research.
            </div>
          </div>
        </div>
      </Parallax>
      <div className="contnt">
        <div className="cont">
          <img
            src={image1}
            alt="Image 1"
            style={{ width: "300px", height: "400px", padding: "15px 15px" }}
          />
          <img
            src={image2}
            alt="Image 2"
            style={{ width: "200px", height: "250px", padding: "15px 15px" }}
          />
          <div className="box_content">
            <h1>You are logged as Lab Instructor.</h1>
            <p style={{ textAlign: "center" }}>
              You can view All Categories and All Items in Laboratory.
            </p>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <button className="my-button" onClick={handleButtonClick1}>
                View Categories
              </button>
              <button className="my-button" onClick={handleButtonClick2}>
                View Items
              </button>
              <button className="my-button" onClick={handleButtonClick3}>
                Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabInstructor;
