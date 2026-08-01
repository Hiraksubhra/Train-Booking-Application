import React, {use, useState} from "react";
import { useAuth } from "../context/AuthContext";

export const LoginForm: React.FC = ()=>{
    const { login, isAuthenticated, username, logout } = useAuth();
    const [inputUser, setInputUser] = useState('');
    const [inputPass, setInputPass] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.SubmitEvent)=>{
        e.preventDefault();
        setError('');
        try{
            await login(inputUser, inputPass);
        }catch (err){
            setError('Invalid username or password');
        }
    };

    if(isAuthenticated){
        return(
            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-center">
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
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">User Login</h2>
            {error && <p className= "text-red-500 mb-4 text-center">{error}</p>}

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <input
                    type='text'
                    placeholder='Username'
                    className= 'p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                    value={inputUser}
                    onChange={(e)=>setInputUser(e.target.value)}
                    required
                />

                <input
                    type='password'
                    placeholder='Password'
                    className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={inputPass}
                    onChange={(e)=>setInputPass(e.target.value)}
                    required
                />

                <button
                    type='submit'
                    className='p-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition'
                >
                    Login
                </button>
            </form>
        </div>
    );
}