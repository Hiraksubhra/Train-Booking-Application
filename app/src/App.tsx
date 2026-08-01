import {QueryClient, QueryClientContext, QueryClientProvider} from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { LoginForm } from "./components/LoginForm";
import { TrainSearch } from "./components/TrainSearch";

const queryClient = new QueryClient();

function App() {
    return(
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <div className='min-h-screen bg-gray-100 p-8'>
                    <h1 className='text-4xl font-bold text-center mb-10 text-blue-900'>
                        Train Booking App
                    </h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                        <LoginForm />
                        <TrainSearch />
                    </div>
                </div>
            </AuthProvider>
        </QueryClientProvider>
    );
}
export default App;