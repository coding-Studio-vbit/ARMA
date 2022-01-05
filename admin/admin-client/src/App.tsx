import './App.css';

import { UserProvider } from './Provider/userProvider';
import AllRoutes from './Routes/AllRoutes';

function App() {

  return (
    <div className="App font-inter flex w-screen">
      <UserProvider>
      <AllRoutes />
      </UserProvider>
       {/* <p className='text-4xl mt-auto text-center  ' >Welcome to ARMA ADMIN</p> */}
       
    </div>
  );
}


export default App;
