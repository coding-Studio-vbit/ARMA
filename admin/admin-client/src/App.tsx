import './App.css';
import { Sidebar } from './Components/Sidebar';
import { Topnav } from './Components/Topnav';
import { AddAdmin } from './features/Admin/AddAdmin';
import AllRoutes from './Routes/AllRoutes';

function App() {
  return (
    <div className="App font-inter flex w-screen">
       {/* <p className='text-4xl mt-auto text-center  ' >Welcome to ARMA ADMIN</p> */}
       <Sidebar />
       <div className='flex flex-col grow'>
       <Topnav />
       <AllRoutes />
       </div>
    </div>
  );
}

export default App;
