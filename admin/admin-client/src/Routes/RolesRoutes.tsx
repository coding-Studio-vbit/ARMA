import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddRoles } from "../features/Roles/AddRoles";
import { RolesList } from "../features/Roles/RolesList";



function RolesRoutes() {
  return (

      <Routes>
          <Route path = '/AddRoles' element = {<AddRoles />}/>
          <Route path = '/' element = {<RolesList />}/>



       
      </Routes>

  );
}

export default RolesRoutes;