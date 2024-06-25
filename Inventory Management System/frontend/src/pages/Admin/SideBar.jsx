import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/AuthContext";

function SideBar() {
  const { role } = useContext(authContext);
  const { dispatch } = useContext(authContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  const navigate = useNavigate();
  return (
    <div className="bg-white sidebar p-2">
      <div>
        <i className="bi bi-bootstrap-fill me-2 fs-4"></i>
        <span className="role"> Admin</span>
      </div>
      <hr className="text-dark" />
      <div className="list-group list-group-flush">
        <div onClick={() => navigate(`/${role}`)}>
          <a href="" className="list-group-item py-2 ">
            <i className="bi bi-speedometer2 fs-5 me-3"></i>
            <span>Dashboard</span>
          </a>
        </div>
        <div onClick={() => navigate(`/home`)}>
          <a href="" className="list-group-item py-2">
            <i className="bi bi-house-door fs-4 me-3"></i>
            <span>Home</span>
          </a>
        </div>
        <div onClick={() => navigate(`/${role}/profile`)}>
          <a href="" className="list-group-item py-2">
            <i className="bi bi-table fs-4 me-3"></i>
            <span>Data Sheets</span>
          </a>
        </div>
        <div onClick={() => navigate(`/${role}/profile/me`)}>
          <a href="" className="list-group-item py-2">
            <i className="bi bi-gear fs-4 me-3"></i>
            <span>Profile Settings</span>
          </a>
        </div>
        <div onClick={() => navigate(`/${role}`)}>
          <a href="" className="list-group-item py-2">
            <i className="bi bi-arrow-left fs-4 me-3"></i>
            <span>Back</span>
          </a>
        </div>
        <div onClick={handleLogout}>
          <a href="" className="list-group-item py-2">
            <i className="bi bi-power fs-4 me-3"></i>
            <span>Logout</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
