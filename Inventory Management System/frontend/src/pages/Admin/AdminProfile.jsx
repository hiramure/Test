/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

const AdminProfile = ({ user }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
        email: user.email || "",
        password: user.password || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/admin/${user._id}`, {
        method: "put",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
      }

      const { message } = await res.json();

      setLoading(false);
      toast.success(message);
      navigate("/admin/profile/me");
    } catch (err) {
      toast.error(err.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <form onSubmit={submitHandler}>
        <div className="mb-5">
          <input
            type="text"
            placeholder="User name"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full pr-4 border-b border-solid border-[#0066ff61] focus:outline-none 
                  focus:border-b-primaryColor text-[16px] leading-7 text-headingColor 
                  placeholder:text-textColor cursor-pointer"
            required
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full pr-4 border-b border-solid border-[#0066ff61] focus:outline-none 
                  focus:border-b-primaryColor text-[16px] leading-7 text-headingColor 
                  placeholder:text-textColor cursor-pointer"
            required
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full pr-4 border-b border-solid border-[#0066ff61] focus:outline-none 
                  focus:border-b-primaryColor text-[16px] leading-7 text-headingColor 
                  placeholder:text-textColor cursor-pointer"
            required
          />
        </div>
        <div className="mb-5">
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full pr-4 border-b border-solid border-[#0066ff61] focus:outline-none 
                  focus:border-b-primaryColor text-[16px] leading-7 text-headingColor 
                  placeholder:text-textColor cursor-pointer"
            aria-readonly
            readOnly
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            placeholder="Telephone Number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full pr-4 border-b border-solid border-[#0066ff61] focus:outline-none 
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
            className="w-full pr-4 border-b border-solid border-[#0066ff61] focus:outline-none 
                  focus:border-b-primaryColor text-[16px] leading-7 text-headingColor 
                  placeholder:text-textColor cursor-pointer"
          />
        </div>

        {/*
        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure
              className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor
                    flex items-center justify-center"
            >
              <img
                src={formData.photo}
                alt=""
                className="w-full rounded-full"
              />
            </figure>
          )}

          <div className="relative w-[130px] h-[50px]">
            <input
              type="file"
              Name="photo"
              id="customFile"
              onChange={handleFileInputChange}
              accept=".jpg, .png"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 w-full h-full flex
                      items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
            >
              {selectedFile ? selectedFile.name : "Upload Photo"}
            </label>
          </div>
        </div> */}
        <div className="mt-7">
          <button
            disabled={loading && true}
            type="submit"
            className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
          >
            {loading ? <HashLoader size={25} color="#ffffff" /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProfile;
