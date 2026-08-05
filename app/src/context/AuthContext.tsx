import React, { createContext, useState, useContext, ReactNode } from "react";
import { login as apiLogin } from "../api/userApi";

interface AuthContextType {
    username: string | null;
    userId: string | null;
    isAuthenticated: boolean;
    login : (username : string, password: string) => Promise<void>;
    logout: ()=> void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode} > = ({ children }) =>{
    const [username, setUsername] = useState<string | null>(()=>localStorage.getItem('username'));
    const [userId, setUserId] = useState<string | null>(()=>localStorage.getItem('userId'));
    const login = async (user: string, pass: string)=>{
        try{
            const response = await apiLogin(user, pass);

            setUsername(response.username);
            setUserId(response.userId);
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('username', response.username);
            localStorage.setItem('userId', response.userId);
        }catch (error){
            console.error("Login failed", error);
            throw new Error("Invalid credentials");
        }
    };

    const logout = () => {
        setUsername(null);
        setUserId(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
    }

    return(
        <AuthContext.Provider value={{username, userId, isAuthenticated: !!username, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if(!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};