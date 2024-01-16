"use client";

import { useContext } from "react";
import Sidebar from "@/components/Sidebar";
import { DarkModeContext } from "@/context/darkModeContext";
import { withAuthorizationRoute } from "@/components/withAdminRoute";
import { Roles } from "@/utils/const";


const AddCourses = ({ }) => {

    const darkMode = useContext(DarkModeContext);
    const containerClass = darkMode
        ? "dark:bg-gray-800 h-full overflow-auto text-white"
        : "bg-gray-100 h-full overflow-auto text-gray-800";

    return (
        <div className={`w-full menu-container ${containerClass}`}>
            <Sidebar />
            <h1>Hello</h1>
        </div>
    );
};
export default withAuthorizationRoute(AddCourses, [
    Roles.admin,
    Roles.professor
]);
