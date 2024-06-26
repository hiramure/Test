//import React from "react";
//import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./HomeT.css";
import bg from "../assets/images/sddefault.jpg";
import image1 from "../assets/images/elecdep.jpg";
import image2 from "../assets/images/download.jpg";
import { Parallax } from "react-parallax";

const HomeT = () => {
  //const navigate = useNavigate();

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
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
            <div style={{ fontSize: 70 }}>Welcome!</div>
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
          <div className="box_content"></div>
        </div>
      </div>
    </div>
  );
};

export default HomeT;
