import './App.css';
import CreateEvent from './features/forum/create_event/createEvent';
import UpdateEventDetails from './features/forum/event_details/updateEventDetails';
import { UserProvider } from './providers/user/UserProvider';
import AllRoutes from './routes/routes';

function App() {


  return (
    <div className="App font-inter">
      {/* <UserProvider> 
       <AllRoutes />
      </UserProvider> */}
      <UpdateEventDetails />
    </div>
  );
}

export default App;
