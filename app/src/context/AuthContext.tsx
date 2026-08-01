import React, { createContext, useState, useContext, ReactNode } from "react";
import { login as apiLogin } from "../api/userApi";

interface AuthContextType {
    username: string | null;
    isAuthenticated: boolean;
    login : (username : string, password: string) => Promise<void>;
    logout: ()=> void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode} > = ({ children }) =>{
    const [username, setUsername] = useState<string | null>(null);

    const login = async (user: string, pass: string)=>{
        try{
            const response = await apiLogin(user, pass);

            if(response === 'Login Successful') {
                setUsername(user);
                localStorage.setItem('currentUser', user);
            }
        }catch (error){
            console.error("Login failed", error);
            throw new Error("Invalid credentials");
        }
    };

    const logout = () => {
        setUsername(null);
        localStorage.removeItem('currentUser');
    }

    React.useEffect(()=>{
        const storedUser = localStorage.getItem('currentUser');
        if(storedUser){
            setUsername(storedUser);
        }
    }, []);

    return(
        <AuthContext.Provider value={{username, isAuthenticated: !!username, login, logout}}>
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