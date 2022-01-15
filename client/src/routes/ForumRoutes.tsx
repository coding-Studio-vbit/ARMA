import { Route, Routes } from "react-router-dom";
import Footer from "../components/CustomFooter";
import Navbar from "../components/CustomNavbar";
import Dashboard from "../features/forum/main_dashboard/Dashboard";
import { EventVenue } from "../features/forum/event_venue";
import { ReportAndMedia } from "../features/forum/event_reports_and_media/reportsAndMedia";
import ForumEventDashboard from "../features/forum/event_dashboard/forumEventDashboard";
import EventEquip from "../features/forum/event_equipment/EventEquip";
import CreateEvent from "../features/forum/create_event/createEvent";
import UpdateEventDetails from "../features/forum/event_details/updateEventDetails";
const ForumRoutes = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar navItems={[]}/>
      <div className="flex-1 mt-[80px]">
      <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/eventDashboard" element={<ForumEventDashboard/>} />
          <Route path="/eventEquipment" element={<EventEquip />} />
          <Route path="/event-venue" element={<EventVenue/>} />
          <Route path="/reportAndMedia" element={<ReportAndMedia/>} />
          <Route path="/createEvent" element={<CreateEvent/>} />
          <Route path="/eventDetails" element={<UpdateEventDetails/>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default ForumRoutes;
