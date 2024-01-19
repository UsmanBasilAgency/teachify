"use client";

import { useState, useContext, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { DarkModeContext } from "@/context/darkModeContext";
import { Authorization } from "@/components/Authorization";
import { Role } from "@/utils/const";
import { supabase } from "@/utils/supabase/client";

export default function LogsContent({}) {
    const [messages, setMessages] = useState<any>([]);
    useEffect(() => {
        const fetchData = async () => {
            let { data, error } = await supabase.from("messages").select(`
                text,
                course_id,
                courses ( id, code, name, credit )
              `);

            if (error) {
                console.error(error);
            } else if (data) {
                setMessages(data);
            }
        };

        fetchData();
    }, []);

    const darkMode = useContext(DarkModeContext);
    const containerClass = darkMode
        ? "dark:bg-gray-800 h-full overflow-auto text-white"
        : "bg-gray-100 h-full overflow-auto text-gray-800";

    return (
        <Authorization roles={[Role.admin, Role.professor]}>
            <div className={`w-full menu-container ${containerClass}`}>
                <Sidebar />
                <div className="mx-12 flex flex-row">
                    <div className="flex-grow">
                        <form className="border border-gray-300 rounded-lg mb-20">
                            <label
                                htmlFor="default-search"
                                className="mb-2 text-sm font-medium sr-only"
                            >
                                Search
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg
                                        className="w-4 h-4"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="search"
                                    id="default-search"
                                    className="block w-full p-4 ps-10 text-smborder border-gray-300 rounded-lg bg-gray-50 focus:ring-custom-blue focus:border-custom-blue"
                                    placeholder="Search Courses, Students ..."
                                    required
                                />
                                <button
                                    type="submit"
                                    className="text-gray-800 absolute end-2.5 bottom-2.5 bg-dark-custom-blue hover:bg-custom-blue focus:ring-4 focus:outline-none focus:ring-custom-blue font-medium rounded-lg text-sm px-4 py-2"
                                >
                                    Search
                                </button>
                            </div>
                        </form>

                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right">
                                <thead className="text-gray-800 text-xs uppercase bg-super-light-purple dark:text-white">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Course Code
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Course Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Course Credit
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Logs
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {messages.map(
                                        (item: any, index: number) => (
                                            <tr
                                                key={index}
                                                className="border-b text-gray-800 dark:text-white"
                                            >
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium whitespace-nowrap"
                                                >
                                                    {item.courses?.code}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {item.courses?.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.courses?.credit}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.text}
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Authorization>
    );
}
