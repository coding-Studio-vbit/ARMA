import { Route, Routes } from "react-router-dom";
import Footer from "../components/CustomFooter";
import Navbar from "../components/CustomNavbar";
import Dashboard from "../features/forum/main_dashboard/Dashboard";
import { EventVenue } from "../features/forum/event_venue";
import { ReportAndMedia } from "../features/forum/event_reports_and_media/reportsAndMedia";
import ForumEventDashboard from "../features/forum/event_dashboard/forumEventDashboard";
import EventEquip from "../features/forum/event_equipment/EventEquip";

const ForumRoutes = () => {
  return (
    <div>
      <Navbar navItems={[]}/>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/eventDashboard" element={<ForumEventDashboard/>} />
          <Route path="/eventEquipment" element={<EventEquip />} />
          <Route path="/event-venue" element={<EventVenue/>} />
          <Route path="/reportAndMedia" element={<ReportAndMedia/>} />
          
        </Routes>
      <Footer />
    </div>
  );
};

export default ForumRoutes;
