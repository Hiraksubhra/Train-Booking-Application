import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LoginForm } from "./components/LoginForm";
import { TrainSearch } from "./components/TrainSearch";
import { MyBookings } from "./components/MyBookings.tsx";
import {LandingPage} from "./components/LandingPage.tsx";
import { HelpPage } from "./components/HelpPage";
import { Deals } from "./components/Deals";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

function App() {
    return(
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <BrowserRouter>
                    <Toaster position="top-right" richColors />
                    <div className='min-h-screen bg-gray-100 p-8'>
                        {/*<h1 className='text-4xl font-bold text-center mb-10 text-blue-900'>*/}
                        {/*    Train Booking App*/}
                        {/*</h1>*/}
                        <div className='min-h-screen bg-gray-100'>
                            {/* Define your application routes here */}
                            <Routes>
                                <Route path="/" element={<LandingPage />} />
                                <Route path="/search" element={<div className="p-8"><TrainSearch /></div>} />
                                <Route path="/bookings" element={<MyBookings />} />
                                <Route path="/help" element={<HelpPage />} />
                                <Route path="/deals" element={<Deals />} />
                                <Route path="/login" element={<div className="p-8"><LoginForm /></div>} />
                            </Routes>
                        </div>
                    </div>
                </BrowserRouter>
            </AuthProvider>
        </QueryClientProvider>
    );
}
export default App;