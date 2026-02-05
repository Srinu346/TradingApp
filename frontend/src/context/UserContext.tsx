import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// Define the shape of the context
interface UserContextType {
    username: string | null;
    setUsername: (name: string | null) => void;
    isLoggedIn: boolean;
    logout: () => void;
}

// Create the context with a default value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component props
interface UserProviderProps {
    children: ReactNode;
}

// Create the provider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [username, setUsernameState] = useState<string | null>(null);

    // Load username from localStorage on initial mount
    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsernameState(storedUsername);
        }
    }, []);

    // Custom setter that also updates localStorage
    const setUsername = (name: string | null) => {
        if (name) {
            localStorage.setItem("username", name);
        } else {
            localStorage.removeItem("username");
        }
        setUsernameState(name);
    };

    // Logout function to clear user data
    const logout = () => {
        localStorage.removeItem("username");
        setUsernameState(null);
    };

    // Computed property to check if user is logged in
    const isLoggedIn = username !== null;

    return (
        <UserContext.Provider value={{ username, setUsername, isLoggedIn, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook for easy access to user context
export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
