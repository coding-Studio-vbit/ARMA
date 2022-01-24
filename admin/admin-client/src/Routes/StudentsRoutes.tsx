import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddStudents } from "../features/Students/AddStudents";
import { ListStudents } from "../features/Students/ListStudents";
import { StudentView } from "../features/Students/StudentsView"

function StudentsRoutes() {
  return (

      <Routes>
          <Route path = '/StudentView' element = {<StudentView />}/>
          <Route path = '/AddStudents' element = {<AddStudents isEdit={false} />}/>
          <Route path = '/EditStudents/:id' element = {<AddStudents isEdit={true} />}/>
          <Route path = '/' element = {<ListStudents />}/>
      </Routes>

  );
}

export default StudentsRoutes;





