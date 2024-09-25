import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
    role: string;
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    // Add any other fields your user object includes
}

interface UserContextType {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    login: (userData: User, expiresIn: number) => void;
    logout: () => void;
    checkAuthStatus: () => boolean;
}

interface UserProviderProps {
    children: ReactNode;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    const logout = useCallback(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('expirationTime');
        setUser(null);
        navigate('/auth/login'); // Redirect to login on logout
    }, [navigate]);

    const login = useCallback(
        (userData: User, expiresIn: number) => {
            const expirationTime = new Date().getTime() + expiresIn * 1000;

            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('expirationTime', expirationTime.toString());

            setUser(userData);
            navigate('/dashboard'); // Redirect to dashboard on successful login
        },
        [navigate]
    );

    const checkAuthStatus = useCallback(() => {
        const storedUser = localStorage.getItem('user');
        const expirationTime = localStorage.getItem('expirationTime');

        if (storedUser && expirationTime) {
            const currentTime = new Date().getTime();

            if (currentTime < parseInt(expirationTime)) {
                setUser(JSON.parse(storedUser));
                return true;
            }
        }
        return false;
    }, []);

    useEffect(() => {
        if (!checkAuthStatus()) {
            logout();
        }
    }, [checkAuthStatus, logout]);

    return <UserContext.Provider value={{ user, setUser, login, logout, checkAuthStatus }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }

    return context;
};

export default UserContext;
