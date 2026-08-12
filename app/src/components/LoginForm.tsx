import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signUp } from "../api/userApi";
import { LockKeyhole, LogIn, User, UserPlus } from "lucide-react";
import { toast } from "sonner";

export const LoginForm: React.FC = () => {
    const { login, isAuthenticated, username, logout } = useAuth();
    const [searchParams] = useSearchParams();
    const initialIsSignUp = searchParams.get('mode') === 'signup';

    const [isSignUp, setIsSignUp] = useState(initialIsSignUp);
    const [inputUser, setInputUser] = useState('');
    const [inputPass, setInputPass] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setIsSignUp(searchParams.get('mode') === 'signup');
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isSignUp) {
                await signUp({ name: inputUser, password: inputPass } as any);
                toast.success('Account created successfully! Logging you in...');
                await login(inputUser, inputPass);
                navigate('/');
            } else {
                await login(inputUser, inputPass);
                toast.success('Logged in successfully!');
                navigate('/');
            }
        } catch (err: any) {
            if (isSignUp) {
                setError(typeof err?.response?.data === 'string' ? err.response.data : 'Sign up failed. Username may be taken.');
            } else {
                setError('Invalid username or password');
            }
        } finally {
            setLoading(false);
        }
    };

    if (isAuthenticated) {
        return (
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

    return (
        <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-purple-50 relative z-10">
            {/* Mode Switcher Tabs */}
            <div className="flex bg-[#f4f2ff] p-1 rounded-xl mb-6">
                <button
                    type="button"
                    onClick={() => { setIsSignUp(false); setError(''); }}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                        !isSignUp ? 'bg-white text-[#7a20c9] shadow-sm' : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                    Log In
                </button>
                <button
                    type="button"
                    onClick={() => { setIsSignUp(true); setError(''); }}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                        isSignUp ? 'bg-white text-[#7a20c9] shadow-sm' : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                    Sign Up
                </button>
            </div>

            <h2 className="text-3xl font-bold mb-6 text-[#5b1796] text-center tracking-tight">
                {isSignUp ? 'Create an Account' : 'Welcome Back'}
            </h2>

            {error && <p className="text-red-500 mb-6 text-center font-medium bg-red-50 p-3 rounded-lg text-sm">{error}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="relative">
                    <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                        type='text'
                        placeholder='Username'
                        className='w-full pl-12 p-3.5 bg-[#f4f2ff] border border-[#e5e0ff] rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-medium transition-all'
                        value={inputUser}
                        onChange={(e) => setInputUser(e.target.value)}
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
                        onChange={(e) => setInputPass(e.target.value)}
                        required
                    />
                </div>

                <button
                    type='submit'
                    disabled={loading}
                    className='mt-2 p-3.5 bg-[#7a20c9] text-white font-bold rounded-xl hover:bg-[#6819b0] transition shadow-md flex justify-center items-center gap-2 disabled:opacity-50'
                >
                    {isSignUp ? <UserPlus className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
                    {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Log In securely')}
                </button>
            </form>
        </div>
    );
}