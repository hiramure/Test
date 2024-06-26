import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import { FaHome, FaUser, FaBackward } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";

const DropdownMenu = () => {
  const { role, dispatch } = useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="dropdownmenu">
      <ul className="menu-list">
        <li onClick={() => navigate(`/${role}/profile/me`)}>
          <div className="menu-icon">
            <FaUser style={{ marginRight: "0px" }} /> Profile
          </div>
        </li>
        <li onClick={() => navigate(`/home`)}>
          <div className="menu-icon">
            <FaHome style={{ marginRight: "5px" }} /> Home
          </div>
        </li>
        <li onClick={() => navigate(-1)}>
          <div className="menu-icon">
            <FaBackward style={{ marginRight: "5px" }} /> Back
          </div>
        </li>
        <li onClick={handleLogout}>
          <div className="menu-icon">
            <IoMdLogOut style={{ marginRight: "5px" }} /> Logout
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
