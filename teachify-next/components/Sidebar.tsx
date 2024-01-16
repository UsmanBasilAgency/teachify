"use client";

import { useState } from "react";
import { useDarkMode } from "@/hooks/useDarkMode";
import Link from "next/link";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function Sidebar() {
    const { darkMode, toggleDarkMode } = useDarkMode();
    const router = useRouter();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        console.log("Sidebar Open:", !isSidebarOpen); // To check the state change
    };

    const handleSignOut = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        await supabase.auth.signOut();
        console.log("Signed Out");
        router.push("/login");
    };

    return (
        <div className="flex justify-between items-center p-4">
            <button
                data-drawer-target="default-sidebar"
                data-drawer-toggle="default-sidebar"
                aria-controls="default-sidebar"
                onClick={toggleSidebar}
                type="button"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Open sidebar</span>
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                </svg>
            </button>

            <div className="p-4 flex justify-end">
                <label className="flex items-center cursor-pointer">
                    <div className="relative">
                        <input
                            type="checkbox"
                            id="darkModeToggle"
                            className="sr-only"
                            onChange={toggleDarkMode}
                        />
                        <div className="block bg-gray-600 w-14 h-8 rounded-full dark:bg-gray-700"></div>
                        <div
                            className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
                                darkMode ? "transform translate-x-6" : ""
                            }`}
                        ></div>
                    </div>
                    <div
                        className="ml-3 text-gray-700 dark:text-gray-300 font-medium"
                        onClick={toggleDarkMode}
                    >
                        Dark Mode {darkMode ? "On" : "Off"}
                    </div>
                </label>
            </div>

            <aside
                id="default-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a
                                onClick={toggleSidebar}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19 12H5"></path>
                                    <path d="M12 19l-7-7 7-7"></path>
                                </svg>

                                <span className="ms-3">Back</span>
                            </a>
                        </li>
                        <li>
                            <Link
                                href="/menu"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <svg
                                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 18"
                                >
                                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">
                                    Courses
                                </span>
                            </Link>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <svg
                                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 18 20"
                                >
                                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">
                                    Settings
                                </span>
                            </a>
                        </li>

                        <li>
                            <Link
                                href="/login"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <svg
                                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                                    />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">
                                    Sign In
                                </span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                href=""
                                onClick={handleSignOut}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <svg
                                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 32 32"
                                >
                                    <g data-name="37-User">
                                        <path d="M10 10V8a6 6 0 0 1 12 0v2a1 1 0 0 0 1 1v2h2v-2a2 2 0 0 0-1-1.73V8A8 8 0 0 0 8 8v1.27A2 2 0 0 0 7 11v2a2 2 0 0 0 1 1.75 8.07 8.07 0 0 0 4 6.16v1.39L4.7 25c-.91.23-4.7 1.37-4.7 4v2a1 1 0 0 0 1 1h14v-2H2v-1c0-.78 1.92-1.7 3.24-2h.11l8-3a1 1 0 0 0 .65-1v-2.69a1 1 0 0 0-.57-.9A6 6 0 0 1 10 14a1 1 0 0 0-1-1v-2a1 1 0 0 0 1-1zM31.71 22.29l-3-3-1.41 1.41 1.29 1.3H21v2h7.59l-1.29 1.29 1.41 1.41 3-3a1 1 0 0 0 0-1.41z" />
                                        <path d="M23 27a1 1 0 0 1-1 1h-3V18h3a1 1 0 0 1 1 1v1h2v-1a3 3 0 0 0-3-3h-4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h4a3 3 0 0 0 3-3v-1h-2z" />
                                    </g>
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">
                                    Logout
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
}
