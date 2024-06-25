import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import logo from "./../../assets/images/Mask group.png";
import { RiLinkedinFill } from "react-icons/ri";
import { AiFillYoutube, AiOutlineInstagram } from "react-icons/ai";

const socialLinks = [
  {
    path: "https://www.youtube.com/results?search_query=university+of+ruhuna+faculty+of+engineering",
    icon: <AiFillYoutube className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://www.facebook.com/groups/106026112048/?ref=share&mibextid=NSMWBT", // Update the Facebook path
    icon: <FaFacebook className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://instagram.com/ieeeuor?igshid=OGQ5ZDc2ODk2ZA==",
    icon: <AiOutlineInstagram className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://lk.linkedin.com/?original_referer=https%3A%2F%2Fwww.google.com%2F",
    icon: <RiLinkedinFill className="group-hover:text-white w-4 h-5" />,
  },
];

const quickLinks01 = [
  {
    path: "https://www.ruh.ac.lk/index.php/en/",
    display: "University of Ruhuna",
  },
  {
    path: "http://www.eng.ruh.ac.lk/",
    display: "Faculty of Engineering",
  },
  {
    path: "https://paravi.ruh.ac.lk/foenmis/index.php",
    display: "ENG-MIS",
  },
  {
    path: "https://www.iesl.lk/index.php?lang=en",
    display: "IESL",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="pb-4 pt-6 ml-6">
      <div className="container"></div>
      <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">
        {/* Logo and Long Paragraph */}
        <div className="flex flex-col md:w-1/5">
          <img src={logo} alt="" style={{ width: "200px", height: "auto" }} />
          <p className="text-[16px] leading-7 font-[400] text-textColor mt-4 text-justify">
            The Faculty of Engineering of University of Ruhuna was established
            on 1st July 1999 at Hapugala, Galle. Admission to the Faculty of
            Engineering, University of Ruhuna, is subject to the University
            Grants Commission policy on university admissions.
          </p>
        </div>

        {/* Info */}
        <div className="md:w-1/5">
          <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
            Info
          </h2>
          <ul>
            {quickLinks01.map((item, index) => (
              <li key={index} className="mb-4">
                <Link
                  to={item.path}
                  className="text-[16px] leading-7 font-[400] text-textColor underline"
                >
                  {item.display}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us */}
        <div className="md:w-1/5">
          <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
            Contact Us
          </h2>
          <ul>
            <li className="mb-2">
              Faculty of Engineering, Hapugala, Galle, Sri Lanka.
            </li>
            <li className="mb-2">📞Phone: +(94) 0 91 2245765/6</li>
            <li>
              📧Email:{" "}
              <a href="mailto:webmaster@eng.ruh.ac.lk">
                webmaster@eng.ruh.ac.lk
              </a>
            </li>
          </ul>
        </div>

        {/* Visit Us */}
        <div className="md:w-1/5">
          <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
            Visit Us
          </h2>
          <div className="flex item-center gap-3 mt-4">
            {socialLinks.map((link, index) => (
              <Link
                to={link.path}
                key={index}
                className="w-9 h-9 border border-solid border-[#181A1E]
                  rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none"
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-[16px] leading-7 font-[400] text-textColor mt-4 text-center">
        Copyright © Faculty of Engineering-{year}.
      </p>
    </footer>
  );
};

export default Footer;
