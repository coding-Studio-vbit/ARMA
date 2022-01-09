import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../Components/Auth/login";
import { Sidebar } from "../Components/Sidebar";
import { Topnav } from "../Components/Topnav";
import { useUser } from "../Provider/userProvider";
import AdminRoutes from "./AdminRoutes";
import FacilitiesRoutes from "./FacilitiesRoutes";
import FacultyRoutes from "./FacultyRoutes";
import ForumsRoutes from "./ForumsRoutes";
import HallsRoutes from "./HallsRoutes";
import RolesRoutes from "./RolesRoutes";
import StudentsRoutes from "./StudentsRoutes";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<ProtectedRoutes />} />
    </Routes>
  );
}
const ProtectedRoutes = () => {
  const { user } = useUser();
  console.log(user);
  const [showSidebar, setShowSidebar] = useState(false);

  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <div className="flex flex-col grow">
        <Topnav showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <Routes>
        <Route path="/Admins/*" element={<AdminRoutes />} />
        <Route path="/Faculty/*" element={<FacultyRoutes />} />
        <Route path="/Halls/*" element={<HallsRoutes />} />
        <Route path="/Roles/*" element={<RolesRoutes />} />
        <Route path="/Facilities/*" element={<FacilitiesRoutes />} />
        <Route path="/Forums/*" element={<ForumsRoutes />} />
        <Route path="/Students/*" element={<StudentsRoutes />} />

        

      </Routes>
      </div>
      
    </>
  );
};

export default AllRoutes;
