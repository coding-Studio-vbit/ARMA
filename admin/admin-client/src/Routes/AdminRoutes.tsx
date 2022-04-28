import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddAdmin } from "../features/Admin/AddAdmin";
import { AdminList } from "../features/Admin/AdminList";
import { EditAdmin } from "../features/Admin/EditAdmin";


function AdminRoutes() {
  return (

      <Routes>
          <Route path = '/AddAdmin' element = {<AddAdmin isEdit={false} />}/>
          <Route path = '/EditAdmin/:id' element = {<AddAdmin isEdit={true} />}/>
          <Route path = '/' element = {<AdminList />}/>
      </Routes>

  );
}

export default AdminRoutes;