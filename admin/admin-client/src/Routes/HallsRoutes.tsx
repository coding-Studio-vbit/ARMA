import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddHalls } from "../features/Halls/AddHalls";
import { HallsList } from "../features/Halls/HallsList";



function HallsRoutes() {
  return (
      <Routes>
          <Route path = '/AddHall' element = {<AddHalls isEdit={false} />}/>
          <Route path = '/EditHall/:id' element = {<AddHalls isEdit={true} />}/>
          <Route path = '/' element = {<HallsList isEdit={false} />}/>      
      </Routes>

  );
}

export default HallsRoutes;