import './App.css';
import FacultyDashBoard from './features/faculty/dashboard/facultyDashBoard';
// import { UserProvider } from './providers/auth/AuthProvider';
// import AllRoutes from './routes/routes';

function App() {
  return (
    <div className="App font-inter">
      {/* <UserProvider>
      <AllRoutes />
      </UserProvider> */}
      <FacultyDashBoard/>      
    </div>
  );
}

export default App;
