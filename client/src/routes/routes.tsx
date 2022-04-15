import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../components/Auth/login";
import FacultyRoutes from "./FacultyRoutes";
import ForumRoutes from "./ForumRoutes";
import { ForgotPassword } from "../components/Auth/forgotPassword";
import { ResetPassword } from "../components/Auth/ResetPassword";
import { useUser } from "../providers/user/UserProvider";
// import FORoutes from "./FORoutes";
// import FacultyDashBoard from "../features/faculty/dashboard/facultyDashBoard";
import EventCalendar from "../features/general/eventCalendar/eventCalendar";
import { Students_View } from "../features/faculty/students_view/Students_View";
import { Forum } from "@material-ui/icons";
import { Forum_View } from "../features/faculty/forum_view/Forum_View";

function AllRoutes() {
  const { faculty, forum } = useUser();
  console.log(faculty?.role);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<Forum_View />} />
        <Route path="/" element={<Login />} />
        <Route path="/eventCalendar" element={<EventCalendar />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />

        {forum && <Route path="/forum/*" element={<ForumRoutes />} />}

        {faculty && <Route path="/faculty/*" element={<FacultyRoutes />} />}

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

const PageNotFound = () => {
  const { forum, faculty } = useUser();
  if (!forum || !faculty) {
    return <Navigate to={"/"} />;
  } else {
    return <div>Page Not found! We will do this later :)</div>;
  }
};

export default AllRoutes;
