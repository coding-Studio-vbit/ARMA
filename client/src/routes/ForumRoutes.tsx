import { Route, Routes } from "react-router-dom";
import Footer from "../components/CustomFooter";
import Navbar from "../components/CustomNavbar";
import Dashboard from "../features/forum/main_dashboard/Dashboard";
import { EventVenue } from "../features/forum/event_venue";

const ForumRoutes = () => {
  return (
    <div>
      <Navbar navItems={[]}/>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/event-venue" element={<EventVenue/>} />
        </Routes>
      <Footer />
    </div>
  );
};

export default ForumRoutes;
