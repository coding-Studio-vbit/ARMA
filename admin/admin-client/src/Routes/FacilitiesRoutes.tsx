import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddEquip } from "../features/Equipment/AddEquip";
import { EquipList } from "../features/Equipment/EquipList";


function FacilitiesRoutes() {
  return (

      <Routes>
          <Route path = '/AddEquip' element = {<AddEquip />}/>
          <Route path = '/' element = {<EquipList />}/>



       
      </Routes>

  );
}

export default FacilitiesRoutes;