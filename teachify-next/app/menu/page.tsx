"use client";

import { useContext } from "react";
import Sidebar from "@/components/Sidebar";
import { DarkModeContext } from "@/context/darkModeContext";
import { Card } from "@/components/Card";
import { useAuth } from "@/hooks/useAuth";

export default function Menu() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <h1>Loading...</h1>;
    } else if (isAuthenticated) {
        return <MenuContent />;
    } else {
        return null;
    }
}

const MenuContent = () => {
    const darkMode = useContext(DarkModeContext);
    const containerClass = darkMode
        ? "dark:bg-gray-800 h-lvh"
        : "bg-gray-100 h-lvh";

    return (
        <div className={`w-full menu-container ${containerClass}`}>
            <Sidebar />
            <Card
                course="CIS2430"
                professor="Judi McCuaig"
                description="Delve into Object Oriented Programming"
                university="University of Guelph"
            />
        </div>
    );
};
