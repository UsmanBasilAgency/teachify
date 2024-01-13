"use client"

import { DARK_MODE_CLASS_NAME } from '@/utils/const';
import { ReactNode, createContext, useContext, useState } from 'react';

const INITIAL_COLOR_MODE_STATE = true;

interface DarkModeState {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

interface DarkModeContextProviderProps {
    children: ReactNode;
}

const DarkModeContext = createContext<DarkModeState | undefined>(undefined);


const DarkModeContextProvider: React.FC<DarkModeContextProviderProps> = ({ children }) => {
    const [darkMode, setDarkMode] = useState<boolean>(INITIAL_COLOR_MODE_STATE);

    // Function to update the context value
    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        if (newMode) {
            document.documentElement.classList.add(DARK_MODE_CLASS_NAME);
        } else {
            document.documentElement.classList.remove(DARK_MODE_CLASS_NAME);
        }
    };

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export {
    DarkModeContext,
    DarkModeContextProvider,
    INITIAL_COLOR_MODE_STATE,
}
