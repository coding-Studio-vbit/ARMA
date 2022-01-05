import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddAdmin } from "../features/Admin/AddAdmin";
import { AdminList } from "../features/Admin/AdminList";
import { EditAdmin } from "../features/Admin/EditAdmin";


function AdminRoutes() {
  return (

      <Routes>
          <Route path = '/AddAdmin' element = {<AddAdmin />}/>
          <Route path = '/EditAdmin' element = {<EditAdmin />}/>
          <Route path = '/' element = {<AdminList />}/>



       
      </Routes>

  );
}

export default AdminRoutes;