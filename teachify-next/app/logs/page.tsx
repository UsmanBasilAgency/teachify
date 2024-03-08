"use client";

import { useState, useContext, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { DarkModeContext } from "@/context/darkModeContext";
import { Authorization } from "@/components/Authorization";
import { Role } from "@/utils/const";
import { supabase } from "@/utils/supabase/client";

export default function LogsContent({}) {
    const [messages, setMessages] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10; // Adjust this value as needed
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            const startIndex = (currentPage - 1) * itemsPerPage;
            let { data, error, count } = await supabase
                .from("messages")
                .select(`
                    text,
                    course_id,
                    courses ( id, code, name, credit )
                `, { count: 'exact' })
                .range(startIndex, startIndex + itemsPerPage - 1);

            if (error) {
                console.error(error);
            } else if (data) {
                setMessages(data);
                if (count) {
                    setTotalPages(Math.ceil(count / itemsPerPage));
                }
            }
        };

        fetchData();
    }, [currentPage]);

    const darkMode = useContext(DarkModeContext);
    const containerClass = darkMode
        ? "dark:bg-gray-800 h-full overflow-auto text-white"
        : "bg-gray-100 h-full overflow-auto text-gray-800";

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <Authorization roles={[Role.admin, Role.professor]}>
            <div className={`w-full menu-container ${containerClass}`}>
                <Sidebar />
                <div className="mx-12 flex flex-row">
                    <div className="flex-grow">
                        <form className="border border-gray-300 rounded-lg mb-20">
                            {/* Search Form Inputs and Button */}
                            <label htmlFor="default-search" className="mb-2 text-sm font-medium sr-only">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                </div>
                                <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm border border-gray-300 rounded-lg bg-gray-50 text-black focus:ring-custom-blue focus:border-custom-blue" placeholder="Search Courses, Students ..." required />
                                <button type="submit" className="text-gray-800 absolute end-10 bottom-2.5 bg-dark-custom-blue hover:bg-custom-blue focus:ring-4 focus:outline-none focus:ring-custom-blue font-medium rounded-lg text-sm px-4 py-2">Search</button>
                            </div>
                        </form>

                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Course Code</th>
                                        <th scope="col" className="px-6 py-3">Course Name</th>
                                        <th scope="col" className="px-6 py-3">Course Credit</th>
                                        <th scope="col" className="px-6 py-3">Logs</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {messages.map((item: any, index: number) => (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-6 py-4">{item.courses?.code}</td>
                                            <td className="px-6 py-4">{item.courses?.name}</td>
                                            <td className="px-6 py-4">{item.courses?.credit}</td>
                                            <td className="px-6 py-4">{item.text}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="pagination flex justify-center space-x-2 mb-20 mt-4">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-4 py-2 rounded-full ${currentPage === index + 1 ? "bg-gray-500 text-white" : "bg-gray-300 text-gray-800"} mx-1`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Authorization>
    );
}