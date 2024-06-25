import React, { useState } from "react";
import { BASE_URL, token } from "../../config";
import useGetProfile from "../../hooks/usefetchdata";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";
import TabBar from "./TabBar";
import StudentData from "./StudentData";
import TOData from "./TOData";
import LabInstructorData from "./LabInstructorData";
import AdminData from "./AdminData";

const Dashboard = () => {
  const [tab, setTab] = useState("profile");
  const { data, loading, error } = useGetProfile(
    `${BASE_URL}/admin/profile/me`
  );
  return (
    <section>
      <div className="max-w-[1170] px-5 mx-auto">
        {loading && !error && <Loader />}
        {error && !loading && <Error />}

        {!loading && !error && (
          <div className="grid lg:grid-cols-1 gap-[30px] lg:gap-[0px]">
            <TabBar tab={tab} setTab={setTab} />
            <div className="mt-8">
              {tab === "admin" && <AdminData />}
              {tab === "student" && <StudentData />}
              {tab === "toData" && <TOData />}
              {tab === "lab" && <LabInstructorData />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
