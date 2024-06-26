import { useContext, useState } from "react";
import { authContext } from "./../../context/AuthContext";
import userImg from "../../assets/images/user.png";
import Loading from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import AdminProfile from "./AdminProfile";
import { Navigate } from "react-router-dom";
import useGetProfile from "../../hooks/usefetchdata";
import { BASE_URL } from "../../config";

const AdminAccount = () => {
  const { data, loading, error } = useGetProfile(
    `${BASE_URL}/admin/profile/me`
  );

  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("settings");
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading />}
        {error && !loading && <Error errMessage={error} />}

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] rounded-md">
              <div className="flex items-center justify-center">
                <figure className="w-100px h-[100px] rounded-full border-2 border-solid border-primaryColor">
                  <img
                    src={userImg}
                    className="w-full h-full rounded-full"
                  ></img>
                </figure>
              </div>
              <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                  {data.username}
                </h3>
              </div>
              <div className="mt-[50 px] md:mt-[100px]">
                <button
                  className="w-full bg-[#181A1E] p-3 text-[20px] leading-7 rounded-md text-white"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="md:col-span-2 md:px-[30px]">
              <div>
                <button
                  onClick={() => setTab("exit")}
                  className={` ${
                    tab === "exit" && "bg-primaryColor text-white font-normal"
                  } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor `}
                >
                  Exit
                </button>
                <button
                  onClick={() => setTab("settings")}
                  className={`${
                    tab === "settings"
                      ? "bg-primaryColor text-white font-normal"
                      : ""
                  } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                >
                  Profile Settings
                </button>
              </div>
              {tab === "exit" && <Navigate to="/admin" />}
              {tab === "settings" && <AdminProfile user={data} />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminAccount;
