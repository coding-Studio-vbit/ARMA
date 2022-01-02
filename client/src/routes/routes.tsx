import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../components/Auth/login";
import FacultyRoutes from "./FacultyRoutes";
import ForumRoutes from "./ForumRoutes";
import Table from "../components/CustomTable";

function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forum/*" element={<ForumRoutes />} />
        <Route path="/faculty/*" element={<FacultyRoutes />} />

        <Route
          path="/test"
          element={
            <Table
              api="http://localhost:5000"
              rowsPerPage={4}
              buttonsCount={4}
              headers={[
                {
                  displayName: "Name",
                  dataPath: "name",
                  sortable: true,
                },
                {
                  displayName: "Roll Number",
                  dataPath: "rollNumber",
                  sortable: true,
                },
                {
                  displayName: "Branch",
                  dataPath: "branch",
                  sortable: false,
                },
              ]}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AllRoutes;
