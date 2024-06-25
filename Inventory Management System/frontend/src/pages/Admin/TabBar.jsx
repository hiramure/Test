import { BiMenu } from "react-icons/bi";

const TabBar = ({ tab, setTab }) => {
  return (
    <div>
      <span className="lg:hidden">
        <BiMenu className="w-6 h-6 cursor-pointer" />
      </span>
      <div className="hidden lg:flex flex-row p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md">
        <button
          onClick={() => setTab("admin")}
          className={`${
            tab === "admin"
              ? "bg-paleYellowColor text-primaryColor"
              : "bg-transparent text-textColor"
          } w-full btn mt-0 rounded-md`}
        >
          Admins
        </button>
        <button
          onClick={() => setTab("student")}
          className={`${
            tab === "student"
              ? "bg-paleYellowColor text-primaryColor"
              : "bg-transparent text-textColor"
          } w-full btn mt-0 rounded-md`}
        >
          Students
        </button>
        <button
          onClick={() => setTab("toData")}
          className={`${
            tab === "toData"
              ? "bg-paleYellowColor text-primaryColor"
              : "bg-transparent text-textColor"
          } w-full btn mt-0 rounded-md`}
        >
          Technical Officers
        </button>
        <button
          onClick={() => setTab("lab")}
          className={`${
            tab === "lab"
              ? "bg-paleYellowColor text-primaryColor"
              : "bg-transparent text-textColor"
          } w-full btn mt-0 rounded-md`}
        >
          Lab Instructors
        </button>
      </div>
    </div>
  );
};

export default TabBar;
