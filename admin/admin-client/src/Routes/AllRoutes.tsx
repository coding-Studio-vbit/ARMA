import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";


function AllRoutes() {
  return (

      <Routes>
          <Route path = '/Admins/*' element = {<AdminRoutes />}/>
       
      </Routes>

  );
}

export default AllRoutes;