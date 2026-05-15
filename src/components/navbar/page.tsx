"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
    // MOCK AUTH STATE - Replace this with your actual auth logic later
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const baseNavLinks = [
        { name: "Previous Papers", href: "/previousPapers" },
        { name: "Student Store", href: "/studentStore" },
    ];

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const pathName = usePathname();
    return (
        <>
            {/* Top Navigation Bar */}
            <nav className="sticky rounded-b-sm w-full top-0 z-50 bg-sky-950/100 backdrop-blur-md border-b border-sky-800/60 shadow-lg shadow-sky-900/20">
                <div className="max-w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-14">

                        {/* Logo Section */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 sm:gap-3 group">
                                {/* <Image src={logoPic} alt="Logo" width={40} height={40} className="object-contain" /> */}

                                {/* Placeholder Logo Icon - Remove this once you add your actual logo */}
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-md shadow-sky-500/40 group-hover:shadow-sky-400/60 transition-shadow">
                                    P
                                </div>

                                <span className="text-base sm:text-xl font-bold tracking-tight bg-gradient-to-r from-sky-200 to-blue-400 bg-clip-text text-transparent group-hover:from-white group-hover:to-sky-300 transition-colors whitespace-nowrap">
                                    PrepPapers
                                </span>
                            </Link>
                        </div>

                        {/* Auth Section in Navbar (Same for Mobile & Desktop) */}
                        <div className="flex items-center gap-2 sm:gap-4 ml-2">
                            {!isLoggedIn && (
                                <>
                                    <Link
                                        href="/login"
                                        className="px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium bg-sky-600 text-white hover:bg-sky-500 shadow-md shadow-sky-600/30 hover:shadow-sky-500/50 transition-all duration-300 whitespace-nowrap"
                                    >
                                        Login
                                    </Link>
                                </>
                            )}

                            {/* Profile Section */}
                            {isLoggedIn && (
                                <div className="flex items-center gap-1 sm:gap-2">
                                    {/* Profile Avatar */}
                                    <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-sky-600 text-white font-bold text-sm sm:text-base shadow-sm shadow-sky-600/30">
                                        S
                                    </div>

                                    {/* 3 Dots Menu */}
                                    <div className="relative group">
                                        <button
                                            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                            onBlur={() => setTimeout(() => setIsProfileMenuOpen(false), 200)}
                                            className="p-1 sm:p-1.5 text-sky-200 hover:text-white hover:bg-sky-800/50 rounded-full transition-colors cursor-pointer flex items-center justify-center"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                            </svg>
                                        </button>

                                        {/* Dropdown Menu */}
                                        <div className={`absolute right-0 top-full mt-2 w-32 bg-sky-900/95 backdrop-blur-md border border-sky-700/50 rounded-xl shadow-xl transition-all duration-200 flex flex-col py-1 pointer-events-auto ${isProfileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'}`}>
                                            <div className="px-3 py-2 border-b border-sky-800/50 mb-1 text-center">
                                                <span className="text-sky-100 font-medium text-md whitespace-nowrap">Student Profile</span>
                                            </div>
                                            <button
                                                onClick={handleLogout}
                                                className="px-3 py-1.5 text-center text-bold text-red-400 hover:bg-sky-800/50 hover:text-red-300 transition-colors text-lg font-medium w-full"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>


            </nav>
            {/* Secondary Section (Below Navbar) - Hidden on Home Page */}
            {pathName !== "/" && (
                <div className="py-2 px-4 sm:px-6 lg:px-8 w-full sticky top-14 z-40 pointer-events-none bg-gradient-to-b from-neutral-50/90 to-transparent dark:from-neutral-950/90 backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl pointer-events-none">

                        {/* Navigation Links */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-6">
                            {baseNavLinks.map((link) => {
                                const isActive = pathName === link.href || pathName.startsWith(`${link.href}/`) && pathName != "/";
                                return (<Link
                                    key={link.name}
                                    href={link.href}
                                    className={(isActive ? "bg-sky-800 " : "text-black ") + "px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium border border-sky-800/60 hover:bg-sky-800/60 hover:border-sky-600 hover:text-white transition-all duration-300 shadow-sm whitespace-nowrap pointer-events-auto"}
                                >
                                    {link.name}
                                </Link>);
                            }
                            )}
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default Navbar;