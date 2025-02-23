import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<string>("");

    useEffect(() => {
        const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
        if (currentUrl.split("/").pop() === "audit") {
            setCurrentPage("audit");
        } else {
            setCurrentPage("schedule");
        }
    }, []);

    return (
        <nav className="p-6 px-10 fixed bg-white w-screen border-b text-sm">
            <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                    <Link href="/schedule" className={`px-6 py-1 rounded-full ${currentPage === "schedule" ? "bg-indigo-600 text-white font-bold" : "hover:underline hover:underline-offset-4 bg-transparent"}`}>
                        Schedule
                    </Link>
                    <Link href="/audit" className={`px-6 py-1 rounded-full ${currentPage === "audit" ? "bg-indigo-600 text-white font-bold " : "hover:underline hover:underline-offset-4 bg-transparent"}`}>
                        Degree Audit
                    </Link>
                </div>
                <button className="hover:underline hover:underline-offset-2 hover:cursor-pointer border px-6 py-1 bg-white rounded-full flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"></path>
                        <polyline points="16 6 12 2 8 6"></polyline>
                        <line x1="12" y1="2" x2="12" y2="15"></line>
                    </svg>
                    <span >Share with your advisor</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;