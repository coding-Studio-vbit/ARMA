import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../components/Auth/login";
import ForumRoutes from "./ForumRoutes";

function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forum/*" element={<ForumRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AllRoutes;
