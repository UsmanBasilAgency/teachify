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
        ? "dark:bg-gray-800 h-full overflow-auto"
        : "bg-gray-100 h-full overflow-auto";

    return (
        <div className={`w-full menu-container ${containerClass}`}>
            <Sidebar />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 py-12 px-6 gap-16">
                <Card
                    course="CIS2430"
                    professor="Judi McCuaig"
                    description="Delve into Object Oriented Programming"
                    university="University of Guelph"
                />
                <Card
                    course="CIS3760"
                    professor="Judi McCuaig"
                    description="Software Engineering"
                    university="University of Guelph"
                />
                <Card
                    course="CIS4450"
                    professor="Judi McCuaig"
                    description="Object Oriented Modeling, Design and Programming"
                    university="University of Guelph"
                />
            </div>
        </div>
    );
};
