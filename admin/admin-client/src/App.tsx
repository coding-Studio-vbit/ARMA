import './App.css';

import { UserProvider } from './Provider/userProvider';
import AllRoutes from './Routes/AllRoutes';

function App() {

  return (
    <div className="App font-inter sm:grid grid-cols-[0px_1fr] sm:grid-cols-[190.838px_1fr] overflow-x-scroll">
      <UserProvider>
      <AllRoutes />
      </UserProvider>
       {/* <p className='text-4xl mt-auto text-center  ' >Welcome to ARMA ADMIN</p> */}
       
    </div>
  );
}


export default App;
