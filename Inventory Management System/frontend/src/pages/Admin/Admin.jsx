import AddUser from "./AddUser";
import AddStudent from "./AddStudent";
import { useState } from "react";
import Nav from "./Nav";

function Admin({ Toggle }) {
  const [openUserPopup, setOpenUserPopup] = useState(false);
  const [openStudentPopup, setOpenStudentPopup] = useState(false);
  return (
    <>
      <div className="px-3">
        <Nav Toggle={Toggle} />
        <section
          className="bg-[#fffefb]"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          <div>
            <button
              onClick={() => setOpenUserPopup(true)}
              className="bg-transparent hover:bg-yellowColor hover:text-black text-yellowColor font-bold py-2 px-4 rounded mr-4"
            >
              + New User
            </button>
            <AddUser
              openPopup={openUserPopup}
              setOpenPopup={setOpenUserPopup}
            ></AddUser>
          </div>
          <div>
            <button
              onClick={() => setOpenStudentPopup(true)}
              className="bg-transparent hover:bg-primaryColor hover:text-black text-yellowColor font-bold py-2 px-4 rounded mr-4"
            >
              + New Student
            </button>

            <AddStudent
              openPopup={openStudentPopup}
              setOpenPopup={setOpenStudentPopup}
            ></AddStudent>
          </div>

          <div className="container text-center">
            <h2 className="heading">Find a User</h2>
            <div
              className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center
          justify-between"
            >
              <input
                type="search"
                className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none 
            cursor-pointer placeholder:text-textColor"
                placeholder="Search User"
              />
              <button className="btn mt-0 rounded-[0px] rounded-r-md">
                Search
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Admin;
