"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Show } from "@clerk/nextjs"
export function SavedPapersPage() {
    const [savedPapers, setSavedPapers] = useState<any[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("savedPapers");
            if (saved) {
                try {
                    setSavedPapers(JSON.parse(saved));
                } catch (e) {
                    console.error("Failed to parse saved papers");
                }
            }
            setIsLoaded(true);
        }
    }, []);

    const handleUnsave = (paperId: string) => {
        setSavedPapers(prev => {
            const newSaved = prev.filter(p => p.id !== paperId);
            if (typeof window !== "undefined") {
                localStorage.setItem("savedPapers", JSON.stringify(newSaved));
            }
            return newSaved;
        });
    };

    // Group by year
    const groupedPapers: Record<string, any[]> = savedPapers.reduce<Record<string, any[]>>((acc, paper) => {
        const year = paper.year || "Unknown Year";
        if (!acc[year]) acc[year] = [];
        acc[year].push(paper);
        return acc;
    }, {});

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-neutral-50 dark:bg-neutral-950 relative flex flex-col pt-8 md:pt-12 pb-24 px-4 sm:px-6 lg:px-8 z-0">
            {/* Header */}
            <div className="w-full max-w-6xl mx-auto space-y-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 sm:p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
                        Saved Papers
                    </h1>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base max-w-2xl">
                    Quickly access your bookmarked question papers across different subjects and years.
                </p>
            </div>

            {/* Content Area */}
            <div className="w-full max-w-6xl mx-auto flex-1">
                {!isLoaded ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                    </div>
                ) : savedPapers.length === 0 ? (
                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-10 text-center shadow-sm">
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400 mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">No saved papers yet</h2>
                        <p className="text-neutral-500 dark:text-neutral-400 mb-8 max-w-sm mx-auto">
                            Head over to the Previous Papers section and bookmark some papers to see them here!
                        </p>
                        <Link href="/previousPapers" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-full transition-colors shadow-lg shadow-emerald-600/30">
                            Find Papers
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {Object.entries(groupedPapers).map(([year, papers]) => (
                            <div key={year} className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 border-b border-neutral-200 dark:border-neutral-800 pb-2">
                                    {year}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {papers.map((paper) => (
                                        <div key={paper.id} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group">
                                            <div className="flex items-start gap-4">
                                                <div className={`p-3 rounded-xl flex-shrink-0 ${paper.type === 'pdf' ? 'bg-red-50 text-red-500 dark:bg-red-900/20 dark:text-red-400' : 'bg-blue-50 text-blue-500 dark:bg-blue-900/20 dark:text-blue-400'}`}>
                                                    {paper.type === 'pdf' ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0 pr-2">
                                                    <h4 className="font-bold text-neutral-900 dark:text-white line-clamp-2 text-sm sm:text-base leading-tight mb-1">{paper.title}</h4>
                                                    <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                                                        {paper.university} • {paper.course}
                                                    </p>
                                                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                                                        {paper.branch}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center">
                                                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 rounded">
                                                    {paper.type === 'pdf' ? 'PDF Doc' : 'Image'}
                                                </span>
                                                <button
                                                    onClick={() => handleUnsave(paper.id)}
                                                    className="p-1.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors tooltip"
                                                    title="Remove from saved"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function SavedPapers() {
    return (
        <>
            <Show when="signed-out">
                <div className="min-h-[78vh] bg-neutral-50 dark:bg-neutral-950 relative flex flex-col items-center justify-center pt-8 md:pt-12 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
                    {/* Background Elements */}
                    <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
                        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/5 blur-[100px] rounded-full"></div>
                        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-600/5 blur-[100px] rounded-full"></div>
                    </div>

                    <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-300">
                        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 md:p-12 text-center shadow-xl space-y-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                                Authentication Required
                            </h2>
                            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                                You need to be signed in to view and manage your saved papers. Join our community to bookmark important study resources and access them instantly.
                            </p>
                            <div className="pt-2">
                                <Link href="/sign-in"
                                    className="inline-block w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full hover:scale-105 hover:cursor-pointer transition-all duration-300 shadow-lg shadow-blue-600/20 text-center"
                                >
                                    Sign In to View
                                </Link>
                            </div>
                            <div className="text-center pt-2">
                                <Link href="/previousPapers" className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
                                    Browse Previous Papers
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Show>
            <Show when="signed-in">
                <SavedPapersPage />
            </Show>
        </>
    )
}