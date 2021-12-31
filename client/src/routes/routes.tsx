import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import { Login } from "../components/Auth/login";


  function AllRoutes() {
    return (
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
  
      </Routes>
    </BrowserRouter>
    );
  }
  
  export default AllRoutes ;