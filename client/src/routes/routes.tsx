import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../components/Auth/login";
import FacultyRoutes from "./FacultyRoutes";
import ForumRoutes from "./ForumRoutes";
import { ForgotPassword } from "../components/Auth/forgotPassword";
import {ResetPassword} from "../components/Auth/ResetPassword";
import ForumsList from "../features/faculty/forums/ForumsList";
import { useUser } from "../providers/user/UserProvider";
import EventEquip from "../features/forum/event_equipment/EventEquip";
import FacultyDashBoard from "../features/faculty/dashboard/facultyDashBoard";

function AllRoutes() {
  const { faculty, forum } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password/:id" element={<ResetPassword/>} />
        
          {
            forum && <Route path="/forum/*" element={<ForumRoutes />} />
          }    
           { faculty &&    <Route path="/faculty/*" element={<FacultyRoutes />} />}
           
        <Route path="*" element={ <PageNotFound/> } />

      </Routes>
    </BrowserRouter>
  );
}

const PageNotFound = ()=>{
  const {forum,faculty} = useUser()
  if(!forum || !faculty) {
    return <Navigate to={'/'}/>
  }else{
    return <div>Page Not found! We will do this later :)</div>
  }
}


export default AllRoutes;