import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddFaculty } from "../features/Faculty/AddFaculty";
import { FacultyList } from "../features/Faculty/FacultyList";

function FacultyRoutes() {
  return (

      <Routes>
          <Route path = '/' element = {<FacultyList isEdit={false} />}/>
          <Route path = '/AddFaculty' element = {<AddFaculty/>}/>




       
      </Routes>

  );
}

export default FacultyRoutes;