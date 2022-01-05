import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FacultyList } from "../features/Faculty/FacultyList";

function FacultyRoutes() {
  return (

      <Routes>
          <Route path = '/' element = {<FacultyList/>}/>



       
      </Routes>

  );
}

export default FacultyRoutes;