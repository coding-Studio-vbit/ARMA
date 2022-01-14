import { useUser } from "../providers/user/UserProvider";
import Navbar from "../components/CustomNavbar";
import Footer from "../components/CustomFooter";
import { Routes, Route } from "react-router-dom";
import StudentsList from "../features/faculty/students/StudentsList";
import ForumsList from "../features/faculty/forums/ForumsList";
import RequestsView from "../features/faculty/requests_view/RequestsView";
import FacultyDashBoard from "../features/faculty/dashboard/facultyDashBoard";
import { FacultyProfile } from "../features/faculty/profile/facultyprofile";

const FacultyRoutes = () => {
  const { faculty } = useUser();
  const navItems=[
    {  label:'Dashboard',icon:"home",path:'/'},
    {  label:'Forums',icon:"group",path:'/' },
    {  label:'Students',icon:"person",path:'/' },        
];
  return (
    <div className="min-h-screen flex flex-col"> 
        <Navbar navItems={navItems}/>
        <div className="flex-1 mt-[80px]">
        <Routes>
        <Route path="/studentsList" element={<StudentsList/>} />
        <Route path="/forumsList" element={<ForumsList/>} />
        <Route path="/" element={<FacultyDashBoard/>} />
        <Route path="/requestsView" element={<RequestsView/>} />
        <Route path="/profile" element={<FacultyProfile/>} />



        </Routes>
      </div>
        <Footer />
    </div>
  );
};

export default FacultyRoutes;
