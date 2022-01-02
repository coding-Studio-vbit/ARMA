import './App.css';
import { UserProvider } from './providers/auth/AuthProvider';
import AllRoutes from './routes/routes';

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
