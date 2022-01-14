import './App.css';
import ToggleSwitch from './components/CustomToggleSwitch';
// import FacultyDashBoard from './features/faculty/dashboard/facultyDashBoard';
// import ForumEventDashboard from './features/forum/event_dashboard/forumEventDashboard';
import { UserProvider } from './providers/user/UserProvider';
import AllRoutes from './routes/routes';
import {useState} from 'react'
import CreateEvent from './features/forum/create_event/createEvent';

function App() {

  const [toggle, setToggle] = useState<boolean>(false)

  return (
    <div className="App font-inter">
      {/* <UserProvider> 
       <AllRoutes />
      </UserProvider> */}
      <CreateEvent/>
    </div>
  );
}

export default App;
