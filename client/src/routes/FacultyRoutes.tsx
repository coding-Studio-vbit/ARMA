import { useUser } from "../providers/user/UserProvider";
import Navbar from "../components/CustomNavbar";
import Footer from "../components/CustomFooter";
import { Routes, Route } from "react-router-dom";
import StudentsList from "../features/faculty/students/StudentsList";
import ForumsList from "../features/faculty/forums/ForumsList";
import RequestsList from "../features/faculty/requests_view/RequestsList";
import FacultyDashBoard from "../features/faculty/dashboard/facultyDashBoard";
import { FacultyProfile } from "../features/faculty/profile/facultyprofile";
import { Students_View } from "../features/faculty/students_view/Students_View";
import FODashBoard from "../features/faculty/dashboard/FODashBoard";
import { Forum_View } from "../features/faculty/forum_view/Forum_View";

const FacultyRoutes = () => {
  const { faculty } = useUser();

  const navItems:any = [
    //  { label: "Dashboard", icon: "home", path: "/faculty/" },
    //  { label: "Forums", icon: "group", path: "/faculty/forums" },
    // { label: "Students", icon: "person", path: "/faculty/students" },
  ];
  
  const setNavItems = ()=>{
    if(faculty?.role.SAC)
    navItems.push(  { label: "Dashboard", icon: "home", path: "/faculty/" },
    { label: "Forums", icon: "group", path: "/faculty/forums" },
    { label: "Students", icon: "person", path: "/faculty/students" },
    
    )
    return navItems
  }

  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar navItems={setNavItems()} />
      <div className="flex-1 mt-[80px]">
        <Routes>
          
        <Route path="/" element={ <FacultyDashBoard/>} />
        <Route path="/foRequests" element={ <FODashBoard/>} />

          <Route path="/profile" element={<FacultyProfile />} />
          <Route path="/forums" element={<ForumsList />} />
          <Route path="/students" element={<StudentsList />} />
          <Route path="/students/:id" element={<Students_View />} />
          <Route path="/forum/:id" element={<Forum_View/>} />
          <Route path="/requests" element={<RequestsList />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );  
};

export default FacultyRoutes;
