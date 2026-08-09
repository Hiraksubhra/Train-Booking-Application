import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {LockKeyhole, LogIn, User} from "lucide-react";

export const LoginForm: React.FC = ()=>{
    const { login, isAuthenticated, username, logout } = useAuth();
    const [inputUser, setInputUser] = useState('');
    const [inputPass, setInputPass] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e: React.SubmitEvent)=>{
        e.preventDefault();
        setError('');
        try{
            await login(inputUser, inputPass);
            navigate('/');
        }catch (err){
            setError('Invalid username or password');
        }
    };

    if(isAuthenticated){
        return(
            <div className="max-w-md mx-auto mt-10 p-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 text-center">
                <h2 className="text-2xl font-bold mb-4">Welcome, {username}!</h2>

                <button
                    onClick={logout}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                    Logout
                </button>
            </div>
        );
    }

    return(
        <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-purple-50">

            <div
                className="absolute top-[-5%] left-0 w-full h-[800px] bg-no-repeat bg-cover lg:bg-contain bg-top opacity-40 pointer-events-none mix-blend-multiply z-0"
                style={{ backgroundImage: "url('/assets/login_background.webp')" }}
            ></div>

            <h2 className="text-3xl font-bold mb-8 text-[#5b1796] text-center tracking-tight">Welcome Back</h2>
            {error && <p className= "text-red-500 mb-6 text-center font-medium bg-red-50 p-3 rounded-lg">{error}</p>}

            <form onSubmit={handleLogin} className="flex flex-col gap-5">
                <div className="relative">
                    <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                        type='text'
                        placeholder='Username'
                        className='w-full pl-12 p-3.5 bg-[#f4f2ff] border border-[#e5e0ff] rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-medium transition-all'
                        value={inputUser}
                        onChange={(e)=>setInputUser(e.target.value)}
                        required
                    />
                </div>

                <div className="relative">
                    <LockKeyhole className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                        type='password'
                        placeholder='Password'
                        className='w-full pl-12 p-3.5 bg-[#f4f2ff] border border-[#e5e0ff] rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-medium transition-all'
                        value={inputPass}
                        onChange={(e)=>setInputPass(e.target.value)}
                        required
                    />
                </div>

                <button
                    type='submit'
                    className='mt-2 p-3.5 bg-[#7a20c9] text-white font-bold rounded-xl hover:bg-[#6819b0] transition shadow-md flex justify-center items-center gap-2'
                >
                    <LogIn className="w-5 h-5" />
                    Log In securely
                </button>
            </form>
        </div>
    );
}