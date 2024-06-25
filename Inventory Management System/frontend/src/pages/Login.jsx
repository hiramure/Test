import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import loginImg from "../assets/images/secureLogin.png";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import { authContext } from "../context/AuthContext.jsx";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        //const { message } = await res.json();
        throw new Error(result.message);
      }

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data,
          token: result.token,
          role: result.role,
        },
      });

      console.log(result, "login data");

      setLoading(false);
      toast.success(result.message);
      navigate(`/${result.role}`);
    } catch (err) {
      toast.error(err.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center px-5 lg:px-0 h-screen">
      <div className="w-full max-w-screen-xl mx-auto rounded-lg shadow-md md:p-10 flex">
        <img
          src={loginImg}
          alt="Secure Login"
          className="w-1/2 md:w-1/2 object-cover rounded-l-lg"
        />
        <div className="w-1/2 md:w-1/2 p-6">
          <h3 className="text-center text-headinColor text-[22px] leading-9 font-bold mb-10 ">
            EIE - Inventory Management System <br />
            <span className="text-primaryColor"> Welcome </span> 🎉
          </h3>
          <form className="py-4 md:py-0" onSubmit={submitHandler}>
            <div className="mb-8">
              <input
                type="email"
                placeholder="Enter your username"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border-b border-solid border-[#0066ff61] focus:outline-none 
                  focus:border-b-primaryColor text-[16px] leading-7 text-headingColor 
                  placeholder:text-textColor cursor-pointer"
                required
              />
            </div>

            <div className="mb-5">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full border-b border-solid border-[#0066ff61] focus:outline-none 
                  focus:border-b-primaryColor text-[16px] leading-7 text-headingColor 
                  placeholder:text-textColor cursor-pointer"
                required
              />
            </div>

            <div className="mt-7">
              <button
                type="submit"
                className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
              >
                {loading ? <HashLoader size={25} color="#fff" /> : "Login"}
              </button>
            </div>

            <p className="mt-5 text-textColor text-center">
              Only authorized accesses are accepted.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
