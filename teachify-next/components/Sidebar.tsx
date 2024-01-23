"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { DarkModeButton } from "@/components/DarkModeButton";
import { SidebarToggle } from "@/components/SidebarToggle";
import SidebarLink from "@/components/SidebarLink";

export default function Sidebar() {
    const [userRole, setUserRole] = useState<string>('');
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        async function getRole() {
            const response = await fetch("/api/v1/getRole", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            if (response.ok) {
                const data = await response.json();
                if (data && data?.roles) {
                    setUserRole(data?.roles[0]);
                }
            } else {
                console.error('Failed to fetch user role');
            }
        }
        getRole();
    }, []);

    const toggleDropdown = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setIsDropdownOpen(!isDropdownOpen);
    };

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSignOut = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        await supabase.auth.signOut();
        router.push("/login");
    };

    return (
        <div className="flex justify-between items-center p-4">
            <SidebarToggle onClick={toggleSidebar} />
            <DarkModeButton />
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
                        <SidebarLink href="/menu" label="Courses" icon={<svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                            />
                        </svg>} />
                        
                        {(userRole === 'professor' || userRole === 'admin') && <><li>
                            <Link
                                href="/logs"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                                    />
                                </svg>

                                <span className="flex-1 ms-3 whitespace-nowrap">
                                    Logs
                                </span>
                            </Link>
                        </li>
                        <li>
                            <a
                                onClick={toggleDropdown}
                                className="cursor-pointer flex items-center justify-between w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                            >
                                <span className="flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                        />
                                    </svg>

                                    <span className="flex-1 ml-3 text-left whitespace-nowrap">
                                        Add
                                    </span>
                                </span>
                            </a>
                            {isDropdownOpen && (
                                <div className="py-2 space-y-2">
                                    <Link
                                        href="/add/courses"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white"
                                    >
                                        <span className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                />
                                            </svg>

                                            <span className="flex-1 ml-3 text-left whitespace-nowrap">
                                                Courses
                                            </span>
                                        </span>
                                    </Link>
                                    <Link
                                        href="/add/students"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white"
                                    >
                                        <span className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                />
                                            </svg>

                                            <span className="flex-1 ml-3 text-left whitespace-nowrap">
                                                Students
                                            </span>
                                        </span>
                                    </Link>
                                </div>
                            )}
                        </li></>}

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
