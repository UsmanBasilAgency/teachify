import { DarkModeContext } from "@/context/darkModeContext";
import { useContext } from "react";

export function useDarkMode() {
    const context = useContext(DarkModeContext);

    if (context === null) {
        throw new Error('useDarkMode must be used within a DarkModeContextProvider');
    }

    return context;
};