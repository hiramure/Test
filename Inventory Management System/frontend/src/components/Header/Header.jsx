import { useEffect, useContext, useRef, useState } from "react";
import logo from "../../assets/images/Mask group.png";
import { Link } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import userImg from "../../assets/images/user2.jpg";

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token } = useContext(authContext);

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("sticky_header");
      } else {
        headerRef.current.classList.remove("sticky_header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();

    return () => window.removeEventListener("scroll", handleStickyHeader);
  });

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between ">
          {/*===== logo ==== */}
          <div>
            <img
              src={logo}
              alt="Logo"
              style={{ width: "400px", height: "auto" }}
              className="mt-4"
            />
          </div>

          <div
            className="flex items-center gap-20"
            ref={menuRef}
            onClick={toggleMenu}
          >
            {token && user != null ? (
              <div>
                <h1>{user.lastName}</h1>

                <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                  <img
                    onClick={() => setOpenMenu((prev) => !prev)}
                    //src={user?.photo}
                    src={userImg}
                    className="w-42 h-42 rounded-full"
                    alt={role}
                  />
                  {openMenu && <DropdownMenu />}
                </figure>
              </div>
            ) : (
              <Link to="/login">
                <button
                  className="bg-primaryColor py-2 px-8 text-white font-[600] h-[44px] flex items-center
  justify-center rounded-[10px] mt-14"
                >
                  Login
                </button>
                <div className="paragraph mt-0">
                  <p>You are not logged in.</p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
