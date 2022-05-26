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
  const [showSidebar, setShowSidebar] = useState(false);

  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="sm:grid grid-cols-[0px_1fr] sm:grid-cols-[190.838px_1fr]">
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <div className="flex flex-col">
        <Topnav showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <Routes>
        <Route path="/Students/*" element={<StudentsRoutes />} />
        <Route path="/Admins/*" element={<AdminRoutes />} />
        <Route path="/Faculty/*" element={<FacultyRoutes />} />
        <Route path="/Halls/*" element={<HallsRoutes />} />
        <Route path="/Roles/*" element={<RolesRoutes />} />
        <Route path="/Facilities/*" element={<FacilitiesRoutes />} />
        <Route path="/Forums/*" element={<ForumsRoutes />} />
      </Routes>
      </div>
      
    </div>
  );
};

export default AllRoutes;
