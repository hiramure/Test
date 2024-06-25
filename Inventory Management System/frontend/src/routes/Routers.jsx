import Home from "../pages/Home";
import Login from "../pages/Login";
import TechOfficer from "../pages/TechOfficer/TechOfficer";
import CategoryList from "../pages/TechOfficer/CategoryList";
import ItemList from "../pages/TechOfficer/ItemList";
import { Routes, Route } from "react-router-dom";
import TOData from "../pages/Admin/TOData";
import LabInstructorData from "../pages/Admin/LabInstructorData";
import AddUser from "../pages/Admin/AddUser";
import AddStudent from "../pages/Admin/AddStudent";
import LabInstructor from "../pages/LabInstructor/LabInstructor";
import InstructorAccount from "../pages/LabInstructor/InstructorAccount";
import TechOfficerAccount from "../pages/TechOfficer/TechOfficerAccount";
import ProtectedRoute from "./ProtectedRoute";
import StudentData from "../pages/Admin/StudentData";
import Dashboard from "../pages/Admin/Dashboard";
import AdminHome from "../pages/Admin/AdminHome";
import AdminAccount from "../pages/Admin/AdminAccount";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/techOfficer"
        element={
          <ProtectedRoute allowedRoles={"techOfficer"}>
            <TechOfficer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/labInstructor"
        element={
          <ProtectedRoute allowedRoles={"labInstructor"}>
            <LabInstructor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={"admin"}>
            <AdminHome />
          </ProtectedRoute>
        }
      />
      <Route
        path="/techOfficer"
        element={
          <ProtectedRoute allowedRoles={"admin"}>
            <TOData />
          </ProtectedRoute>
        }
      />
      <Route
        path="/labInstructor"
        element={
          <ProtectedRoute allowedRoles={"admin"}>
            <LabInstructorData />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={"admin"}>
            <StudentData />
          </ProtectedRoute>
        }
      />
      <Route path="/techOfficer/categorylist" element={<CategoryList />} />
      <Route path="/techOfficer/itemlist" element={<ItemList />} />
      <Route path="/admin/adduser" element={<AddUser />} />
      <Route path="/admin/addstudent" element={<AddStudent />} />

      <Route
        path="/admin/profile"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/profile/me"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminAccount />
          </ProtectedRoute>
        }
      />
      <Route
        path="/labInstructor/profile/me"
        element={
          <ProtectedRoute allowedRoles={["labInstructor"]}>
            <InstructorAccount />
          </ProtectedRoute>
        }
      />
      <Route
        path="/techOfficer/profile/me"
        element={
          <ProtectedRoute allowedRoles={["techOfficer"]}>
            <TechOfficerAccount />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routers;
