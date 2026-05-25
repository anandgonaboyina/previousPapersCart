"use client";

import React, { useState } from "react";
import { Show, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export default function UploadPaperPage() {
  // --- Form State ---
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSem, setSelectedSem] = useState("");
  const [selectedPaperYear, setSelectedPaperYear] = useState("");
  const [subject, setSubject] = useState("");

  // Multiple files state
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // --- Static Data Lists ---
  const universities = ["JNTUH", "Osmania University", "Kakatiya University", "Andhra University"];
  const branches = ["CSE", "ECE", "EEE", "Mechanical", "Civil"];

  // List of actual years of papers
  const paperYears = ["2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018"];

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

  // --- Derived Lists ---
  const courses = selectedUniversity ? universityCoursesMapping[selectedUniversity] || [] : [];
  const yearsOfStudy = selectedCourse ? courseYearsMapping[selectedCourse] || [] : [];

  // Dynamic Semesters based on selected Course & Year
  const semesters = React.useMemo(() => {
    if (!selectedCourse || !selectedYear) return [];

    if (selectedCourse === "B.Tech") {
      if (selectedYear === "1st Year") return ["1st Sem", "2nd Sem"];
      if (selectedYear === "2nd Year") return ["3rd Sem", "4th Sem"];
      if (selectedYear === "3rd Year") return ["5th Sem", "6th Sem"];
      if (selectedYear === "4th Year") return ["7th Sem", "8th Sem"];
    } else {
      // M.Tech, MBA, MCA (2 years - 4 semesters total)
      if (selectedYear === "1st Year") return ["1st Sem", "2nd Sem"];
      if (selectedYear === "2nd Year") return ["3rd Sem", "4th Sem"];
    }
    return [];
  }, [selectedCourse, selectedYear]);

  // --- File Upload Handlers ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError("");
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const validFiles: File[] = [];
      let hasError = false;

      newFiles.forEach((file) => {
        // 5MB validation (5 * 1024 * 1024 bytes)
        if (file.size > 5 * 1024 * 1024) {
          hasError = true;
        } else {
          validFiles.push(file);
        }
      });

      if (hasError) {
        setFileError("One or more files exceed the 5MB size limit and were skipped!");
      }

      setFiles((prev) => [...prev, ...validFiles]);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Helper to format file sizes nicely
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = 2;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  // --- Submit Handler ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFileError("");

    // Form validations
    if (
      !selectedUniversity ||
      !selectedCourse ||
      !selectedBranch ||
      !selectedYear ||
      !selectedSem ||
      !selectedPaperYear ||
      !subject ||
      files.length === 0
    ) {
      setFileError("Please fill out all fields and upload at least one question paper image!");
      return;
    }

    setIsSubmitting(true);

    // Mock upload delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 2000);
  };

  const resetForm = () => {
    setSelectedUniversity("");
    setSelectedCourse("");
    setSelectedBranch("");
    setSelectedYear("");
    setSelectedSem("");
    setSelectedPaperYear("");
    setSubject("");
    setFiles([]);
    setFileError("");
    setSubmitSuccess(false);
  };

  return (
    <div className="min-h-[85vh] bg-neutral-50 dark:bg-neutral-950 relative flex flex-col items-center pt-8 md:pt-12 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="w-full max-w-2xl relative z-10">

        {/* ================= CASE 1: USER IS SIGNED OUT ================= */}
        <Show when="signed-out">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 md:p-12 text-center shadow-xl max-w-md mx-auto space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
              Authentication Required
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
              You need to be signed in to upload previous year question papers. Join the community to contribute and access all study materials.
            </p>
            <div className="pt-2">
              <Link href="/sign-in"
                className="inline-block w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full hover:scale-105 hover:cursor-pointer transition-all duration-300 shadow-lg shadow-blue-600/20 text-center"
              >
                Sign In to Contribute
              </Link>
            </div>
            <div className="text-center pt-2">
              <Link href="/previousPapers"
                className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
              >
                search Previous Papers
              </Link>
            </div>
          </div>
        </Show>

        {/* ================= CASE 2: USER IS SIGNED IN ================= */}
        <Show when="signed-in">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">

            {/* Header Area */}
            <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4 flex justify-between items-start">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
                  Contribute a Paper
                </h1>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1.5">
                  Share previous year question papers to help your fellow students prepare.
                </p>
              </div>
              <Link href="/" className="text-xs text-blue-600 dark:text-blue-400 hover:underline pt-2 font-medium">
                Back Home
              </Link>
            </div>

            {submitSuccess ? (
              /* Success Message Screen */
              <div className="py-8 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 shadow-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Upload Successful!</h2>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm max-w-sm mx-auto leading-relaxed">
                    Thank you for contributing! Your uploaded pages will be merged into a PDF document for users to download.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
                  <button
                    onClick={resetForm}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full hover:cursor-pointer transition duration-300 text-sm shadow-md"
                  >
                    Upload Another Paper
                  </button>
                  <Link
                    href="/previousPapers"
                    className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 font-semibold rounded-full text-sm transition duration-300 flex items-center justify-center"
                  >
                    Go to Papers List
                  </Link>
                </div>
              </div>
            ) : (
              /* Form Component Screen */
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Row 1: University, Course & Branch Dropdowns */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* University Selection */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider pl-1">
                      University
                    </label>
                    <select
                      value={selectedUniversity}
                      onChange={(e) => {
                        setSelectedUniversity(e.target.value);
                        setSelectedCourse("");
                        setSelectedBranch("");
                        setSelectedYear("");
                        setSelectedSem("");
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium text-sm"
                    >
                      <option value="">Select University</option>
                      {universities.map(uni => (
                        <option key={uni} value={uni}>{uni}</option>
                      ))}
                    </select>
                  </div>

                  {/* Course Selection */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider pl-1">
                      Course
                    </label>
                    <select
                      disabled={!selectedUniversity}
                      value={selectedCourse}
                      onChange={(e) => {
                        setSelectedCourse(e.target.value);
                        setSelectedBranch("");
                        setSelectedYear("");
                        setSelectedSem("");
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Select Course</option>
                      {courses.map(course => (
                        <option key={course} value={course}>{course}</option>
                      ))}
                    </select>
                  </div>

                  {/* Branch Selection */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider pl-1">
                      Branch
                    </label>
                    <select
                      disabled={!selectedCourse}
                      value={selectedBranch}
                      onChange={(e) => setSelectedBranch(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Select Branch</option>
                      {branches.map(branch => (
                        <option key={branch} value={branch}>{branch}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 2: Year of Study, Semester & Paper Year Dropdowns */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Year of Study */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider pl-1">
                      Year of Study
                    </label>
                    <select
                      disabled={!selectedCourse}
                      value={selectedYear}
                      onChange={(e) => {
                        setSelectedYear(e.target.value);
                        setSelectedSem("");
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Select Year</option>
                      {yearsOfStudy.map(yr => (
                        <option key={yr} value={yr}>{yr}</option>
                      ))}
                    </select>
                  </div>

                  {/* Semester selection */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider pl-1">
                      Semester
                    </label>
                    <select
                      disabled={!selectedYear}
                      value={selectedSem}
                      onChange={(e) => setSelectedSem(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Select Sem</option>
                      {semesters.map(sem => (
                        <option key={sem} value={sem}>{sem}</option>
                      ))}
                    </select>
                  </div>

                  {/* Year of Paper Selection */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider pl-1">
                      Year of Paper
                    </label>
                    <select
                      value={selectedPaperYear}
                      onChange={(e) => setSelectedPaperYear(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium text-sm"
                    >
                      <option value="">Select Year</option>
                      {paperYears.map(yr => (
                        <option key={yr} value={yr}>{yr}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 3: Subject / Paper Title */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider pl-1">
                    Subject Name / Paper Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mathematics-II, Engineering Physics, Data Structures..."
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium text-sm placeholder-neutral-400"
                  />
                </div>

                {/* Row 4: Multiple Image Upload Dropzone */}
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider pl-1">
                    Upload Paper Pages (Multiple Photos)
                  </label>

                  {/* Dropzone Container */}
                  <label className="group flex flex-col items-center justify-center w-full min-h-[160px] border-2 border-dashed border-neutral-300 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-blue-500/80 rounded-2xl bg-neutral-50/50 dark:bg-neutral-800/20 hover:bg-blue-50/10 dark:hover:bg-blue-950/10 transition-all duration-300 cursor-pointer relative p-6 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-neutral-400 group-hover:text-blue-500 transition-colors duration-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 group-hover:text-blue-500 transition-colors duration-300">
                      Click to upload or drag photos here
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      PNG, JPEG, WebP (Max 5MB per file)
                    </span>
                  </label>

                  {/* File Upload Error Alert */}
                  {fileError && (
                    <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      {fileError}
                    </div>
                  )}

                  {/* Uploaded File Previews Grid */}
                  {files.length > 0 && (
                    <div className="pt-3 space-y-3">
                      <div className="flex justify-between items-center px-1">
                        <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                          Selected Pages ({files.length})
                        </span>
                        <button
                          type="button"
                          onClick={() => setFiles([])}
                          className="text-xs text-red-500 hover:text-red-600 hover:underline font-semibold cursor-pointer"
                        >
                          Clear All
                        </button>
                      </div>

                      {/* File Grid list */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {files.map((file, idx) => (
                          <div
                            key={idx}
                            className="bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800/80 rounded-xl p-3 flex items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              {/* Page counter badge */}
                              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center justify-center flex-shrink-0">
                                P{idx + 1}
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200 truncate">
                                  {file.name}
                                </p>
                                <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium mt-0.5">
                                  {formatFileSize(file.size)}
                                </p>
                              </div>
                            </div>

                            {/* Remove button */}
                            <button
                              type="button"
                              onClick={() => removeFile(idx)}
                              className="text-neutral-400 hover:text-red-500 p-1.5 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-full transition-colors cursor-pointer"
                              title="Delete Page"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Action Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-300 dark:disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-semibold rounded-xl transition duration-300 hover:scale-[1.01] hover:cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading and Converting Pages...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Upload and Submit Paper
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}
          </div>
        </Show>

      </div >
    </div >
  );
}
