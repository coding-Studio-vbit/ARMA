import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../components/Auth/login";
import FacultyRoutes from "./FacultyRoutes";
import ForumRoutes from "./ForumRoutes";
import Table from "../components/CustomTable";
import RequestsPage from "../features/faculty/requests_view/RequestsPage";
import { ForgotPassword } from "../components/Auth/forgotPassword";
import { ReportAndMedia } from "../features/forum/event_reports_and_media/reportsAndMedia";
import StudentsList from "../features/faculty/students/StudentsList";

function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/forum/*" element={<ForumRoutes />} />
        <Route path="/faculty/*" element={<FacultyRoutes />} />
        <Route path="/test" element={<StudentsList/>} />
       
      
      </Routes>
    </BrowserRouter>
  );
}

export default AllRoutes;
