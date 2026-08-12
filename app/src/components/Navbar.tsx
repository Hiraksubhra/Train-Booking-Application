import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext.tsx";
import { TrainFront, ChevronDown } from 'lucide-react';

export const Navbar: React.FC = () => {
    const { isAuthenticated, username, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="sticky top-0 z-50 bg-[#fcfaf4]/90 backdrop-blur-sm border-b border-gray-100 font-sans transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Left: Brand / Logo */}
                    <div
                        className="flex flex-col items-center justify-center cursor-pointer group"
                        onClick={() => navigate('/')}
                    >
                        <TrainFront className="w-9 h-9 text-[#7a20c9] group-hover:scale-105 transition-transform" />
                        <span className="text-xs font-extrabold text-[#5b1796] tracking-widest mt-1">
                            IRCTC
                        </span>
                    </div>

                    {/* Center: Navigation Links */}
                    <div className="hidden md:flex flex-1 justify-center space-x-10">
                        <button onClick={() => navigate('/')} className="text-sm font-medium text-gray-800 hover:text-[#7a20c9] transition-colors">
                            Home
                        </button>
                        <button onClick={() => navigate('/search')} className="text-sm font-medium text-gray-800 hover:text-[#7a20c9] transition-colors">
                            Train Info
                        </button>
                        <button onClick={() => navigate('/bookings')} className="text-sm font-medium text-gray-800 hover:text-[#7a20c9] transition-colors">
                            My Bookings
                        </button>

                        <div className="relative group cursor-pointer flex items-center">
                            <button className="text-sm font-medium text-gray-800 hover:text-[#7a20c9] transition-colors flex items-center gap-1">
                                More
                                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#7a20c9] transition-colors" />
                            </button>
                        </div>
                    </div>

                    {/* Right: Authentication Buttons */}
                    <div className="flex flex-shrink-0 items-center">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center border border-purple-200">
                                        <span className="text-[#7a20c9] font-bold text-sm">
                                            {username?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-800 hidden sm:block">Hi, {username}</span>
                                </div>
                                <button
                                    onClick={logout}
                                    className="px-5 py-2 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border border-red-100 rounded-full text-sm font-semibold transition-all shadow-sm"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center bg-white/50 backdrop-blur-sm border border-gray-200 rounded-full p-1 shadow-sm">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="bg-[#7a20c9] hover:bg-[#6819b0] text-white px-6 py-1.5 rounded-full text-sm font-semibold transition-colors shadow-md"
                                >
                                    Log in
                                </button>
                                <button
                                    onClick={() => navigate('/login?mode=signup')}
                                    className="text-gray-700 hover:bg-[#f4f2ff] hover:text-[#7a20c9] px-6 py-1.5 rounded-full text-sm font-semibold transition-colors"
                                >
                                    Sign up
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};