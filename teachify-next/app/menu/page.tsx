"use client";

import { useContext } from "react";
import Sidebar from "@/components/Sidebar";
import { DarkModeContext } from "@/context/darkModeContext";
import { Card } from "@/components/Card";
import { Authentication } from "@/components/Authentication";

export default function MenuContent() {
    const darkMode = useContext(DarkModeContext);
    const containerClass = darkMode
        ? "dark:bg-gray-800 h-full overflow-auto"
        : "bg-gray-100 h-full overflow-auto";

    return (
        <Authentication>
            <div className={`w-full menu-container ${containerClass}`}>
                <Sidebar />
                <h1 className="px-8 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    Regain control over your{" "}
                    <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
                        courses
                    </mark>
                </h1>
                <p className="px-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                    Here at Teachify, we empower students to get a personal
                    teaching assistant that is available 24/7
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 py-12 px-8 gap-16">
                    <Card
                        course="CIS2430"
                        professor="Judi McCuaig"
                        description="Delve into Object Oriented Programming"
                        university="University of Guelph"
                        imageURL="/cis2430.jpeg"
                    />
                    <Card
                        course="CIS3760"
                        professor="Judi McCuaig"
                        description="Software Engineering"
                        university="University of Guelph"
                        imageURL="/cis3760.png"
                    />
                    <Card
                        course="CIS4450"
                        professor="Judi McCuaig"
                        description="Object Oriented Modeling, Design and Programming"
                        university="University of Guelph"
                        imageURL="/cis4450.png"
                    />
                </div>
            </div>
        </Authentication>
    );
}
