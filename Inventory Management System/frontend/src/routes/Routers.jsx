import Home from "../pages/Home.jsx";
import Login from "../pages/Login";
import TechOfficer from "../pages/TechOfficer/TechOfficer";
import CategoryList from "../pages/TechOfficer/CategoryList";
import ItemList from "../pages/TechOfficer/ItemList";
import { Routes, Route } from "react-router-dom";
import TOData from "../pages/Admin/TOData";
import LabInstructorData from "../pages/Admin/LabInstructorData";
import AddUser from "../pages/Admin/AddUser";
import LabInstructor from "../pages/LabInstructor/LabInstructor";
import AdminAccount from "../pages/Admin/AdminAccount";
import InstructorAccount from "../pages/LabInstructor/InstructorAccount";
import TechOfficerAccount from "../pages/TechOfficer/TechOfficerAccount";
import ProtectedRoute from "./ProtectedRoute";
import ItemListView from "../components/ItemView/ItemListView";
import Categories from "../components/Categories/Categories";
import Items from "../components/Items/Items";
import RequestFromUsers from "../pages/TechOfficer/RequestFromUsers";
import RequestHistory from "../components/RequestHistory/RequestHistory";
import ItemByCategory from "../components/ItemsByCategory/ItemByCategory";
import SearchComponent from "../components/SearchComponent/SearchComponent.jsx";
import ItemsByCategory from "../pages/TechOfficer/ItemsByCategory";
import Item from "../pages/TechOfficer/Item";
import AdminHome from "../pages/Admin/AdminHome";
import StudentData from "../pages/Admin/StudentData";
import Dashboard from "../pages/Admin/Dashboard";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
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
        path="/student"
        element={
          <ProtectedRoute allowedRoles={"admin"}>
            <StudentData />
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
      <Route path="/techOfficer/categorylist" element={<CategoryList />} />
      <Route path="/techOfficer/itemlist" element={<ItemList />} />
      <Route path="/techOfficer/itemRequest" element={<RequestFromUsers />} />
      <Route path="/categoryList" element={<Categories />} />
      <Route path="/itemDetails/:id" element={<ItemListView />} />
      <Route path="/component/search" element={<SearchComponent />} />

      <Route path="/itemList" element={<Items />} />
      <Route path="/labInstructor/request" element={<RequestHistory />} />
      <Route path="/item/category/:categoryTest" element={<ItemByCategory />} />
      <Route path="/to/item/:id" element={<Item />} />
      <Route
        path="/to/item/category/:categoryTest"
        element={<ItemsByCategory />}
      />
      <Route path="/admin/adduser" element={<AddUser />} />
      <Route
        path="/admin/profile/me"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminAccount />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/profile"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Dashboard />
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
