"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function PreviousPapersPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUniversity, setSelectedUniversity] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedBranch, setSelectedBranch] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [uniSearch, setUniSearch] = useState("");
    const [isUniDropdownOpen, setIsUniDropdownOpen] = useState(false);
    const [showPapers, setShowPapers] = useState(false);
    const [savedPapers, setSavedPapers] = useState<any[]>([]);

    // Load saved papers from localStorage on mount
    React.useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("savedPapers");
            if (saved) {
                try {
                    setSavedPapers(JSON.parse(saved));
                } catch (e) {
                    console.error("Failed to parse saved papers");
                }
            }
        }
    }, []);

    const toggleSave = (paper: any) => {
        setSavedPapers(prev => {
            const isSaved = prev.some(p => p.id === paper.id);
            let newSaved;
            if (isSaved) {
                newSaved = prev.filter(p => p.id !== paper.id);
            } else {
                newSaved = [...prev, paper];
            }
            if (typeof window !== "undefined") {
                localStorage.setItem("savedPapers", JSON.stringify(newSaved));
            }
            return newSaved;
        });
    };

    const universities = ["JNTUH", "Osmania University", "Kakatiya University", "Andhra University"];
    const branches = ["CSE", "ECE", "EEE", "Mechanical", "Civil"];

    const universityCoursesMapping: Record<string, string[]> = {
        "JNTUH": ["B.Tech", "M.Tech", "MBA", "MCA"],
        "Osmania University": ["B.Tech", "M.Tech", "MCA"],
        "Kakatiya University": ["B.Tech", "MBA", "MCA"],
        "Andhra University": ["B.Tech", "M.Tech", "MBA"],
    };

    const courseYearsMapping: Record<string, string[]> = {
        "B.Tech": ["1st Year", "2nd Year", "3rd Year", "4th Year"],
        "M.Tech": ["1st Year", "2nd Year"],
        "MBA": ["1st Year", "2nd Year"],
        "MCA": ["1st Year", "2nd Year"],
    };

    const courses = selectedUniversity ? universityCoursesMapping[selectedUniversity] || [] : [];
    const years = selectedCourse ? courseYearsMapping[selectedCourse] || [] : [];

    const handleUniversityClick = (uni: string) => {
        setSelectedUniversity(uni);
        setSelectedCourse("");
        setSelectedBranch("");
        setSelectedYear("");
        setUniSearch("");
        setIsUniDropdownOpen(false);
        setShowPapers(false);
    };

    const handleCourseClick = (course: string) => {
        setSelectedCourse(course);
        setSelectedBranch("");
        setSelectedYear("");
        setShowPapers(false);
    };

    const handleBranchClick = (branch: string) => {
        setSelectedBranch(branch);
        setSelectedYear("");
        setShowPapers(false);
    };

    const handleYearClick = (year: string) => {
        setSelectedYear(year);
        setShowPapers(false);
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-neutral-50 dark:bg-neutral-950 relative flex flex-col items-center pt-8 md:pt-12 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden z-0">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 dark:bg-blue-600/10 blur-[100px] rounded-full"></div>
                <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500/20 dark:bg-purple-600/10 blur-[100px] rounded-full"></div>
            </div>

            {/* Main Interactive Area */}
            <div className="w-full max-w-6xl space-y-12 relative z-10">
                {/* Header Section */}
                <div className="text-center space-y-6">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                        Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Previous Papers</span>
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-light">
                        Search universally by subject code or name, or use the organized filters below to find exactly what you need.
                    </p>
                </div>

                {/* Universal Search */}
                <div className="relative group max-w-3xl mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition duration-500 pointer-events-none"></div>
                    <div className="relative flex items-center w-full h-12 sm:h-16 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="pl-6 text-neutral-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="w-full h-full bg-transparent sm:text-2 sm:px-3 md:px-4 md:text-md text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none"
                            placeholder="Search by subject name, code, or year..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="pr-4 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors cursor-pointer"
                                aria-label="Clear search"
                                type="button"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                        <button type="button" className="h-full px-5 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 font-medium transition-colors cursor-pointer">
                            Search
                        </button>
                    </div>
                </div>

                {/* Organized Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 pt-4">
                    {/* University Selection */}
                    <div className="flex flex-col bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 relative z-40 pointer-events-auto">
                        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                            <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h3 className="text-base sm:text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                                1. Select University
                            </h3>
                        </div>

                        <div className="flex-1 relative">
                            {/* Search Input mimicking a dropdown */}
                            <div className="relative mb-3">
                                <input
                                    type="text"
                                    placeholder={selectedUniversity ? selectedUniversity : "Search university..."}
                                    value={uniSearch}
                                    onChange={(e) => {
                                        setUniSearch(e.target.value);
                                        setIsUniDropdownOpen(true);
                                        if (selectedUniversity) {
                                            // Reset selected uni if they start typing a new search
                                            setSelectedUniversity("");
                                            setSelectedCourse("");
                                            setSelectedBranch("");
                                            setSelectedYear("");
                                        }
                                    }}
                                    onFocus={() => setIsUniDropdownOpen(true)}
                                    className="w-full bg-neutral-100 dark:bg-neutral-800 border-none outline-none px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base text-neutral-900 dark:text-white placeholder-neutral-500 font-medium focus:ring-2 focus:ring-orange-500/50 transition-all"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Dropdown Menu List */}
                            {isUniDropdownOpen && (
                                <div className="absolute top-14 left-0 w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-xl z-50 overflow-hidden max-h-64 overflow-y-auto">
                                    {universities.filter(u => u.toLowerCase().includes(uniSearch.toLowerCase())).length > 0 ? (
                                        universities.filter(u => u.toLowerCase().includes(uniSearch.toLowerCase())).map((uni) => (
                                            <button
                                                key={uni}
                                                onClick={() => handleUniversityClick(uni)}
                                                type="button"
                                                className="w-full text-left px-5 py-3.5 font-semibold transition-all duration-200 cursor-pointer bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-orange-50 dark:hover:bg-neutral-800 hover:text-orange-700 dark:hover:text-orange-300 border-b border-neutral-100 dark:border-neutral-800 last:border-0"
                                            >
                                                {uni}
                                            </button>
                                        ))
                                    ) : (
                                        <div className="px-5 py-4 text-neutral-500 text-sm text-center">No universities found</div>
                                    )}
                                </div>
                            )}

                            {/* Show selected state gracefully underneath if closed */}
                            {selectedUniversity && !isUniDropdownOpen && (
                                <div className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold border bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-500/30">
                                    <div className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        {selectedUniversity}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Course Selection */}
                    <div className={`flex flex-col bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm transition-all duration-300 relative z-10 pointer-events-auto ${!selectedUniversity ? 'opacity-50' : 'hover:shadow-md'}`}>
                        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                            <div className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-colors ${selectedUniversity ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className={`text-base sm:text-lg font-semibold ${selectedUniversity ? 'text-neutral-800 dark:text-neutral-200' : 'text-neutral-400'}`}>
                                2. Select Course
                            </h3>
                        </div>
                        <div className="space-y-2 sm:space-y-3 flex-1 relative">
                            {!selectedUniversity && (
                                <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/50 dark:bg-neutral-900/50 rounded-2xl pointer-events-none">
                                    <span className="text-sm font-medium bg-neutral-100 dark:bg-neutral-800 px-4 py-2 rounded-full text-neutral-500 shadow-sm border border-neutral-200 dark:border-neutral-700">
                                        Select a university first
                                    </span>
                                </div>
                            )}
                            {courses.map((course) => (
                                <button
                                    key={course}
                                    onClick={() => handleCourseClick(course)}
                                    disabled={!selectedUniversity}
                                    type="button"
                                    className={`w-full text-left px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold transition-all duration-200 border cursor-pointer ${!selectedUniversity
                                        ? "bg-neutral-50 dark:bg-neutral-800/30 text-transparent border-transparent"
                                        : selectedCourse === course
                                            ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/30 scale-[1.02]"
                                            : "bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-transparent hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-neutral-700 hover:text-blue-700 dark:hover:text-blue-300"
                                        }`}
                                >
                                    {course}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Branch Selection */}
                    <div className={`flex flex-col bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm transition-all duration-300 relative z-10 pointer-events-auto ${!selectedCourse ? 'opacity-50' : 'hover:shadow-md'}`}>
                        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                            <div className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-colors ${selectedCourse ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h3 className={`text-base sm:text-lg font-semibold ${selectedCourse ? 'text-neutral-800 dark:text-neutral-200' : 'text-neutral-400'}`}>
                                3. Select Branch
                            </h3>
                        </div>
                        <div className="space-y-2 sm:space-y-3 flex-1 relative">
                            {!selectedCourse && (
                                <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/50 dark:bg-neutral-900/50 rounded-2xl pointer-events-none">
                                    <span className="text-sm font-medium bg-neutral-100 dark:bg-neutral-800 px-4 py-2 rounded-full text-neutral-500 shadow-sm border border-neutral-200 dark:border-neutral-700">
                                        Select a course first
                                    </span>
                                </div>
                            )}
                            {branches.map((branch) => (
                                <button
                                    key={branch}
                                    onClick={() => handleBranchClick(branch)}
                                    disabled={!selectedCourse}
                                    type="button"
                                    className={`w-full text-left px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold transition-all duration-200 border cursor-pointer ${!selectedCourse
                                        ? "bg-neutral-50 dark:bg-neutral-800/30 text-transparent border-transparent"
                                        : selectedBranch === branch
                                            ? "bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-500/30 scale-[1.02]"
                                            : "bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-transparent hover:border-purple-300 hover:bg-purple-50 dark:hover:bg-neutral-700 hover:text-purple-700 dark:hover:text-purple-300"
                                        }`}
                                >
                                    {branch}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Year Selection */}
                    <div className={`flex flex-col bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm transition-all duration-300 relative z-10 pointer-events-auto ${!selectedBranch ? 'opacity-50' : 'hover:shadow-md'}`}>
                        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                            <div className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-colors ${selectedBranch ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className={`text-base sm:text-lg font-semibold ${selectedBranch ? 'text-neutral-800 dark:text-neutral-200' : 'text-neutral-400'}`}>
                                4. Select Year
                            </h3>
                        </div>
                        <div className="space-y-2 sm:space-y-3 flex-1 relative">
                            {!selectedBranch && (
                                <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/50 dark:bg-neutral-900/50 rounded-2xl pointer-events-none">
                                    <span className="text-sm font-medium bg-neutral-100 dark:bg-neutral-800 px-4 py-2 rounded-full text-neutral-500 shadow-sm border border-neutral-200 dark:border-neutral-700">
                                        Select a branch first
                                    </span>
                                </div>
                            )}
                            {years.map((year) => (
                                <button
                                    key={year}
                                    onClick={() => handleYearClick(year)}
                                    disabled={!selectedBranch}
                                    type="button"
                                    className={`w-full text-left px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold transition-all duration-200 border cursor-pointer ${!selectedBranch
                                        ? "bg-neutral-50 dark:bg-neutral-800/30 text-transparent border-transparent"
                                        : selectedYear === year
                                            ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/30 scale-[1.02]"
                                            : "bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-transparent hover:border-indigo-300 hover:bg-indigo-50 dark:hover:bg-neutral-700 hover:text-indigo-700 dark:hover:text-indigo-300"
                                        }`}
                                >
                                    {year}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results / CTA Section */}
                {selectedUniversity && selectedCourse && selectedBranch && selectedYear && (
                    <div className="mt-12 transition-all duration-500 transform translate-y-0 opacity-100">
                        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 md:p-10 text-center shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>

                            <div className="relative z-10 flex flex-col items-center">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-6 shadow-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                                    Selection Complete
                                </h2>
                                <div className="flex flex-wrap justify-center gap-3 mb-8">
                                    <span className="px-4 py-1.5 bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium border border-orange-200 dark:border-orange-800">
                                        {selectedUniversity}
                                    </span>
                                    <span className="px-4 py-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-800">
                                        {selectedCourse}
                                    </span>
                                    <span className="px-4 py-1.5 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium border border-purple-200 dark:border-purple-800">
                                        {selectedBranch}
                                    </span>
                                    <span className="px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium border border-indigo-200 dark:border-indigo-800">
                                        {selectedYear}
                                    </span>
                                </div>
                                <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-lg mx-auto text-lg">
                                    We've found the previous year question papers matching your criteria. Ready to start preparing?
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setShowPapers(true)}
                                    className="px-10 py-4 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 text-lg font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-xl shadow-neutral-900/20 dark:shadow-white/10 flex items-center gap-2 cursor-pointer"
                                >
                                    View Papers
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Papers Listing Area */}
                        {showPapers && (
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {[
                                    {
                                        id: `${selectedUniversity}-${selectedCourse}-${selectedBranch}-${selectedYear}-1`.replace(/\s+/g, '-'),
                                        title: "Core Subject Previous Paper - Regular",
                                        university: selectedUniversity,
                                        course: selectedCourse,
                                        branch: selectedBranch,
                                        year: selectedYear,
                                        type: "pdf"
                                    },
                                    {
                                        id: `${selectedUniversity}-${selectedCourse}-${selectedBranch}-${selectedYear}-2`.replace(/\s+/g, '-'),
                                        title: "Advanced Subject - Supplementary",
                                        university: selectedUniversity,
                                        course: selectedCourse,
                                        branch: selectedBranch,
                                        year: selectedYear,
                                        type: "photo"
                                    }
                                ].map((paper) => {
                                    const isSaved = savedPapers.some(p => p.id === paper.id);
                                    return (
                                        <div key={paper.id} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 sm:p-5 flex items-center gap-4 hover:shadow-lg transition-shadow">
                                            {/* Type Icon */}
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

                                            {/* Paper Details */}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-neutral-900 dark:text-white truncate text-sm sm:text-base">{paper.title}</h4>
                                                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 truncate">
                                                    {paper.university} • {paper.year}
                                                </p>
                                            </div>

                                            {/* Save Button */}
                                            <button
                                                onClick={() => toggleSave(paper)}
                                                className={`p-2.5 rounded-full transition-colors flex-shrink-0 border ${isSaved
                                                    ? 'bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400'
                                                    : 'bg-white border-neutral-200 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-800'
                                                    }`}
                                                title={isSaved ? "Remove from Saved" : "Save Paper"}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                                                </svg>
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
                {/* Floating Action Button (FAB) for Paper Upload */}
                <div className="fixed bottom-24 right-6 z-[9999]">
                    <Link
                        href="/upload"
                        className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-full shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300 pointer-events-auto border border-blue-400/20 group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5.5 w-5.5 text-white group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="text-sm font-semibold tracking-wide pr-1">Contribute Paper</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
