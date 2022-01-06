import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddHalls } from "../features/Halls/AddHalls";
import { HallsList } from "../features/Halls/HallsList";



function HallsRoutes() {
  return (

      <Routes>
          <Route path = '/AddHall' element = {<AddHalls />}/>
          <Route path = '/' element = {<HallsList />}/>



       
      </Routes>

  );
}

export default HallsRoutes;