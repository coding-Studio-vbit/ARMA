import './App.css';
import { UserProvider } from './providers/user/UserProvider';
import AllRoutes from './routes/routes';

function App() {
  return (
    <div className="App font-inter p-80">
        <UserProvider> 
        <AllRoutes />
        </UserProvider>      
    </div>
  );
}

export default App;
