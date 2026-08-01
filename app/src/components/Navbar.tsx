import React from 'react';
import { useAuth } from "../context/AuthContext.tsx";

export const Navbar: React.FC = () =>{
    const { isAuthenticated, username, logout } = useAuth();

    return(
        <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
            <div className="flex items-center text-blue-700 font-extrabold text-2xl tracking-tighter">
                <div className="w-10 h-10 border-4 border-blue-600 rounded-full flex items-center justify-center mr-2">
                    R
                </div>
                IRCTC
            </div>

            <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
                <a href="#" className="hover:text-blue-600">Home</a>
                <a href="#" className="hover:text-blue-600">Train Info</a>
                <a href="#" className="hover:text-blue-600">Help & Support</a>
                <a href="#" className="hover:text-blue-600">Daily Deals !</a>
            </div>

            <div className="flex bg-gray-100 rounded-full p-1 border border-gray-200 items-center">
                {
                    isAuthenticated ? (
                        <>
                            <span className="px-4 py-2 text-gray-700 font-semibold truncate max-w-[150px]">
                                Hi, {username}
                            </span>
                            <button
                                onClick={logout}
                                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium shadow transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium shadow transition">
                                Log in
                            </button>
                            <button className="px-6 py-2 text-gray-600 font-medium hover:text-gray-900 transition">
                                Sign Up
                            </button>
                        </>
                    )
                }
            </div>
        </nav>
    );
};