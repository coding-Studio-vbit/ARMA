import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddEquip } from "../features/Equipment/AddEquip";
import { EquipList } from "../features/Equipment/EquipList";


function FacilitiesRoutes() {
  return (

      <Routes>
          <Route path = '/AddEquip' element = {<AddEquip isEdit={false} />}/>
          <Route path = '/EditEquip/:id' element = {<AddEquip isEdit={true} />}/>
          <Route path = '/' element = {<EquipList isEdit={false} />}/>      
      </Routes>

  );
}

export default FacilitiesRoutes;