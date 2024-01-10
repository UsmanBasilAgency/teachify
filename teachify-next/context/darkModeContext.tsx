"use client"

import { ReactNode, createContext, useState } from 'react';

const INITIAL_COLOR_MODE_STATE = true;

interface DarkModeState {
    darkMode: boolean;
    updateDarkMode: (newDarkModeState: boolean) => void;
}

interface DarkModeContextProviderProps {
    children: ReactNode;
}

const DarkModeContext = createContext<DarkModeState | undefined>(undefined);


const DarkModeContextProvider: React.FC<DarkModeContextProviderProps> = ({ children }) => {
    const [darkMode, setDarkMode] = useState<boolean>(INITIAL_COLOR_MODE_STATE);

    // Function to update the context value
    const updateDarkMode = (newDarkModeState: boolean) => {
        setDarkMode(newDarkModeState);
    };

    return (
        <DarkModeContext.Provider value={{ darkMode, updateDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export {
    DarkModeContext,
    DarkModeContextProvider,
    INITIAL_COLOR_MODE_STATE
}
