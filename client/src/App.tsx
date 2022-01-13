import './App.css';
import { UserProvider } from './providers/user/UserProvider';
import AllRoutes from './routes/routes';
import EventEquip from '../src/features/forum/event_equipment/EventEquip';

function App() {
  return (
    <div className="App font-inter">
      <UserProvider> 
       <AllRoutes />
      </UserProvider>
    </div>
  );
}

export default App;
