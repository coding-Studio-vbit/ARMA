import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../components/Auth/login";
import FacultyRoutes from "./FacultyRoutes";
import ForumRoutes from "./ForumRoutes";
import { ForgotPassword } from "../components/Auth/forgotPassword";
import {ResetPassword} from "../components/Auth/ResetPassword";
import ForumsList from "../features/faculty/forums/ForumsList";
import { useUser } from "../providers/user/UserProvider";

function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password/:id" element={<ResetPassword/>} />
        <Route
          path="/*"
          element={
            <ProtectedRoutes>
              <Route path="/forum/*" element={<ForumRoutes />} />
              <Route path="/faculty/*" element={<FacultyRoutes />} />
            </ProtectedRoutes>
          }
        />
        <Route path="/test" element={<ForumsList />} />
      </Routes>
    </BrowserRouter>
  );
}

const ProtectedRoutes = (props: { children: any }) => {
  const { faculty, forum } = useUser();
 

  if (faculty || forum) {
    return <Routes>{props.children}</Routes>;
  }
  return <Navigate to={"/"} />;
};

export default AllRoutes;
