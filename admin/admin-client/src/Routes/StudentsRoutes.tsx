import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddStudents } from "../features/Students/AddStudents";
import { ListStudents } from "../features/Students/ListStudents";



function StudentsRoutes() {
  return (

      <Routes>
          <Route path = '/AddStudents' element = {<AddStudents />}/>
          <Route path = '/' element = {<ListStudents />}/>



       
      </Routes>

  );
}

export default StudentsRoutes;