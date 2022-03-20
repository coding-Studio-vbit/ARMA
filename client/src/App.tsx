import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import { UserProvider } from './providers/user/UserProvider';
import AllRoutes from './routes/routes';

function App() {
  const queryClient = new QueryClient()

  return (
    <div className="App font-inter">
      <QueryClientProvider client={queryClient}>

        <UserProvider> 
        <AllRoutes />
        </UserProvider>      
      </QueryClientProvider>
    </div>
  );
}

export default App;
