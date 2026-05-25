"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavBar() {
    const pathname = usePathname();

    const tabs = [
        {
            name: "Home",
            href: "/",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-6.5 sm:w-6.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )
        },
        {
            name: "Papers",
            href: "/previousPapers",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-6.5 sm:w-6.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            )
        },
        {
            name: "Store",
            href: "/studentStore",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-6.5 sm:w-6.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            )
        },
        {
            name: "Chats",
            href: "/studentStore/chatScreen",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-6.5 sm:w-6.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            )
        },
        {
            name: "Saved",
            href: "/SavedPapers",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-6.5 sm:w-6.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
            )
        }
    ];

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] sm:w-fit z-50 rounded-full bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-2xl transition-all duration-300">
            <div className="flex justify-around sm:justify-center items-center h-18 px-2.5 sm:px-6 gap-1 sm:gap-6 w-full">
                {tabs.map((tab) => {
                    let isActive = false;
                    if (tab.href === "/") {
                        isActive = pathname === "/";
                    } else if (tab.href === "/studentStore") {
                        isActive = pathname.startsWith("/studentStore") && !pathname.startsWith("/studentStore/chatScreen");
                    } else {
                        isActive = pathname === tab.href || pathname.startsWith(`${tab.href}/`);
                    }

                    const isStore = tab.href.startsWith("/studentStore");
                    const isPapers = tab.href === "/previousPapers" || tab.href === "/SavedPapers";

                    const themeColor = isStore
                        ? "emerald"
                        : isPapers
                            ? "sky"
                            : "indigo";

                    const activeClass = themeColor === "emerald"
                        ? "bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 dark:border-emerald-500/35"
                        : themeColor === "sky"
                            ? "bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 border-sky-500/20 dark:border-sky-500/35"
                            : "bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-500/20 dark:border-indigo-500/35";

                    return (
                        <Link
                            key={tab.name}
                            href={tab.href}
                            className="flex flex-col items-center justify-center w-14 sm:w-16 h-full space-y-1 transition-all duration-300 pointer-events-auto hover:scale-105 active:scale-95"
                        >
                            {/* Perfectly circular larger icon wrapper */}
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${isActive
                                ? activeClass
                                : "border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                                }`}>
                                <div className={`${isActive ? "scale-110" : "scale-100"} transition-transform duration-300 flex-shrink-0`}>
                                    {tab.icon}
                                </div>
                            </div>

                            {/* Tiny stacked label */}
                            <span className={`text-[9px] sm:text-[10px] font-semibold tracking-wide transition-colors duration-300 select-none ${isActive
                                ? (themeColor === "emerald"
                                    ? "text-emerald-600 dark:text-emerald-400 font-extrabold"
                                    : themeColor === "sky"
                                        ? "text-sky-600 dark:text-sky-400 font-extrabold"
                                        : "text-indigo-600 dark:text-indigo-400 font-extrabold")
                                : "text-neutral-500 dark:text-neutral-400 font-medium"
                                }`}>
                                {tab.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
