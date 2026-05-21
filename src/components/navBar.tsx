"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SignInButton, SignUpButton, Show, UserProfile, UserButton } from "@clerk/nextjs"

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
    const NoSecondaryNavBarPages = ["/", "/upload", "/sign-in", "/sign-up", "/studentStore/sell"];
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
                        <div className="flex items-center text-center gap-2 sm:gap-4 ml-2">
                            <Show when="signed-out">

                                <Link href="/sign-in" className="rounded-full pt-1 m-auto  hover:cursor-pointer  font-medium text-white h-8 w-16">
                                    SignIn
                                </Link>
                                <Link href="/sign-up" className="rounded-full pt-1 m-auto  hover:cursor-pointer font-medium text-white h-8 w-16">
                                    SignUp
                                </Link>
                            </Show>
                            <Show when="signed-in">
                                <UserButton />
                            </Show>
                        </div>
                    </div>
                </div>


            </nav>
            {/* Secondary Section (Below Navbar) - Hidden on Home Page */}
            {!NoSecondaryNavBarPages.includes(pathName) && (
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