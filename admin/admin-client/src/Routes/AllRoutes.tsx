import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import FacultyRoutes from "./FacultyRoutes";
import HallsRoutes from "./HallsRoutes";



function AllRoutes() {
  return (

      <Routes>
          <Route path = '/Admins/*' element = {<AdminRoutes />}/>
          <Route path = '/Faculty/*' element = {<FacultyRoutes />}/>
          <Route path = '/Halls/*' element = {<HallsRoutes/>}/>


       
      </Routes>

  );
}

export default AllRoutes;