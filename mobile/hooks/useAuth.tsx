import React, { createContext, useContext, useEffect, useState } from "react";
import { loginRequest } from "@/services/auth";
import { IUser } from "@/types/user";

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: (token: string) => Promise<void>;
    user: IUser | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true); // Should start as true
    const [user, setUser] = useState<IUser | null>(null)

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            setIsLoading(true);
            if (user == null) {
                setIsAuthenticated(false);
            } else {
                setIsAuthenticated(true)
            }
        } catch (error) {
            console.error('Error checking auth status: ', error);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            
            const { user } = await loginRequest(email, password)

            const loggedInUser: IUser = {
                email,
                token: user.AccessToken
            }
            
            console.log(loggedInUser)

            setUser(loggedInUser)
            setIsAuthenticated(true);
        } catch (error) {
            setIsAuthenticated(false)
            console.error('Error saving auth token: ', error);
        }
    };

    const logout = async (token: string) => {
        try {
            // Remove token logic here
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Error removing auth token: ', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}