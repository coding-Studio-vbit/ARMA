import { Route, Routes } from "react-router-dom";
import Footer from "../components/CustomFooter";
import Navbar from "../components/CustomNavbar";
import Dashboard from "../features/forum/main_dashboard/Dashboard";
import { ReportAndMedia } from "../features/forum/event_reports_and_media/reportsAndMedia";
import ForumEventDashboard from "../features/forum/event_dashboard/forumEventDashboard";
import ForumProfile from "../features/forum/profile/ForumProfile";
import EventAttendance from "../features/forum/event_attendance/event_attendance";
import UpdateEventDetails from "../features/forum/event_details/updateEventDetails";
import AddNewCoreTeamMember from "../features/forum/profile/AddNewCoreTeamMember";
import AddNewForumMember from "../features/forum/profile/AddNewForumMember";
import EventBudget from "../features/forum/event_budget/EventBudget";
import CreateEventRoutes from "./CreateEventRoutes";

const ForumRoutes = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar navItems={[]} />
      <div className="flex-1 mt-[60px]">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/eventDashboard" element={<ForumEventDashboard />} />
          <Route path="/reportAndMedia" element={<ReportAndMedia />} />
          <Route path="/createEvent/*" element={<CreateEventRoutes />} />
          <Route path="/updateEventDetails" element={<UpdateEventDetails />} />
          <Route path="/profile" element={<ForumProfile />} />
          <Route path="/eventAttendance" element={<EventAttendance />} />
          <Route
            path="/addNewCoreTeamMember"
            element={<AddNewCoreTeamMember />}
          />
          <Route path="/budget" element={<EventBudget />} />

          <Route path="/addNewForumMember" element={<AddNewForumMember />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default ForumRoutes;
