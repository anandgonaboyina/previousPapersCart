"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
// TO ADD YOUR LOGO:
// 1. Place your logo image in your project (e.g., in the public folder or assets folder).
// 2. Uncomment the import below and update the path to match your logo's location.
// import logoPic from "@/assets/logo.png"; 

const Navbar = () => {
    // MOCK AUTH STATE - Replace this with your actual auth logic later
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const baseNavLinks = [
        { name: "Previous Papers", href: "/previous-papers" },
        { name: "Student Store", href: "/store" },
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
            <nav className="fixed w-full top-0 z-50 bg-sky-950/70 backdrop-blur-md border-b border-sky-800/60 shadow-lg shadow-sky-900/20">
                <div className="max-w-full  px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">

                        {/* Logo Section */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
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
                                        className="text-sky-100 hover:text-white text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
                                    >
                                        Sign In
                                    </Link>
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
                                <div className="flex items-center justify-end gap-2 sm:gap-4">
                                    <div className="flex items-center gap-1.5 sm:gap-3 px-1.5 sm:px-2 py-1 bg-sky-900/40 rounded-xl border border-sky-800/50 shadow-sm">
                                        <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-sky-600 flex-shrink-0 flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-sm shadow-sky-600/30">
                                            S
                                        </div>
                                        <span className="text-sky-100 font-medium text-xs sm:text-sm pr-1 whitespace-nowrap">Student Profile</span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-xl text-white text-xs sm:text-sm font-medium bg-red-600 border border-white-900/50 hover:bg-red-950/60 hover:text-red-300 transition-all shadow-sm shadow-red-900/20 whitespace-nowrap"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                </div>


            </nav>
            {/* Secondary Section (Below Navbar) - Hidden on Home Page */}
            {pathName !== "/" && (
                <div className="pt-21 pb-6 mx-2 px-4 sm:px-6 lg:px-8 py-8 fixed">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4rounded-2xl ">

                        {/* Navigation Links */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-6">
                            {baseNavLinks.map((link) => {
                                const isActive = pathName === link.href || pathName.startsWith(`${link.href}/`) && pathName != "/";
                                return (<Link
                                    key={link.name}
                                    href={link.href}
                                    className={(isActive ? "bg-sky-800 " : "text-black ") + "px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium border border-sky-800/60 hover:bg-sky-800/60 hover:border-sky-600 hover:text-white transition-all duration-300 shadow-sm whitespace-nowrap"}
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