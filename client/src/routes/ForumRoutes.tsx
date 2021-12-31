import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "../components/CustomFooter";
import Navbar from "../components/CustomNavbar";
import Dashboard from "../features/forum/main_dashboard/Dashboard";

const ForumRoutes = () => {
  console.log("hello");
  return (
    <div>
      <Navbar navItems={[]} userName="coding.Studio();"/>
        <Routes>
          <Route path="*" element={<Dashboard/>} />
        </Routes>
      <Footer />
    </div>
  );
};

export default ForumRoutes;
