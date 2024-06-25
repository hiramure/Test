import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/AuthContext";

const DropdownMenu = () => {
  const { role } = useContext(authContext);
  const { dispatch } = useContext(authContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  const navigate = useNavigate();
  return (
    <div className="dropdownmenu">
      <ul className="menu-list">
        <li onClick={() => navigate(`/${role}/profile/me`)}>
          <span className="menu-icon">👤</span> Profile
        </li>
        <li onClick={() => navigate(`/${role}/profile`)}>
          <span className="menu-icon">🏠</span> Home
        </li>
        <li onClick={() => navigate(`/${role}`)}>
          <span className="menu-icon">⬅️</span> Back
        </li>
        <li onClick={handleLogout}>
          <span className="menu-icon">🔒</span> Logout
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
