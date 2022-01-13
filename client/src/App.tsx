import './App.css';
import FacultyDashBoard from './features/faculty/dashboard/facultyDashBoard';
import ForumEventDashboard from './features/forum/event_dashboard/forumEventDashboard';
// import { UserProvider } from './providers/user/UserProvider';
// import AllRoutes from './routes/routes';

function App() {
  return (
    <div className="App font-inter">
      {/* <UserProvider> */}
      {/* <AllRoutes />
      </UserProvider> */}
      <ForumEventDashboard/>
    </div>
  );
}

export default App;
