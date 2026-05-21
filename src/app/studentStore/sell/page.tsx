"use client";

import React, { useState } from "react";
import { Show } from "@clerk/nextjs";
import Link from "next/link";
import { COLLEGES } from "@/data/products";

export default function SellProductPage() {
  // --- Form State ---
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [productAge, setProductAge] = useState("");
  const [description, setDescription] = useState("");

  // Multiple files state
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // --- Static Data Lists ---
  const categories = ["Books", "Electronics", "Instruments", "Lab Gear", "Sports", "Others"];

  // --- File Upload Handlers ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError("");
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const validFiles: File[] = [];
      let hasError = false;

      newFiles.forEach((file) => {
        // 5MB validation
        if (file.size > 5 * 1024 * 1024) {
          hasError = true;
        } else {
          validFiles.push(file);
        }
      });

      if (hasError) {
        setFileError("One or more photos exceed the 5MB size limit and were skipped!");
      }

      setFiles((prev) => [...prev, ...validFiles]);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

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
      !productName ||
      !category ||
      !price ||
      !selectedLocation ||
      !pickupLocation ||
      !productAge ||
      !description ||
      files.length === 0
    ) {
      setFileError("Please fill out all fields and upload at least one product photo!");
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
    setProductName("");
    setCategory("");
    setPrice("");
    setSelectedLocation("");
    setPickupLocation("");
    setProductAge("");
    setDescription("");
    setFiles([]);
    setFileError("");
    setSubmitSuccess(false);
  };

  return (
    <div className="min-h-[85vh] bg-neutral-50 dark:bg-neutral-950 relative flex flex-col items-center pt-8 md:pt-12 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-600/5 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-teal-500/10 dark:bg-teal-600/5 blur-[100px] rounded-full"></div>
      </div>

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
              You need to be signed in to sell items on the Student Store. Log in to list your used books, instruments, or gadgets.
            </p>
            <div className="pt-2">
              <Link href="/sign-in" className="inline-block w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-full hover:scale-105 hover:cursor-pointer transition-all duration-300 shadow-lg shadow-emerald-600/20 text-center">
                Sign In to Sell
              </Link>
            </div>
            <div className="text-center pt-2">
              <Link href="/studentStore" className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
                Back to Student Store
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
                  Sell a Product
                </h1>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1.5">
                  List your used items for sale to college mates.
                </p>
              </div>
              <Link href="/studentStore" className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline pt-2 font-medium">
                Back to Store
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
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Listing Active!</h2>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm max-w-sm mx-auto leading-relaxed">
                    Awesome! Your item is listed for sale in the Student Store. Other students can now find your listing and message you directly!
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
                  <button
                    onClick={resetForm}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-full hover:cursor-pointer transition duration-300 text-sm shadow-md"
                  >
                    Sell Another Item
                  </button>
                  <Link
                    href="/studentStore"
                    className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 font-semibold rounded-full text-sm transition duration-300 flex items-center justify-center"
                  >
                    Go to Store Catalog
                  </Link>
                </div>
              </div>
            ) : (
              /* Form Component Screen */
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Row 1: Product Title & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Product Title */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider pl-1">
                      Product Name / Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. RS Aggarwal Mathematics, Casio FX-991EX..."
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium text-sm placeholder-neutral-400"
                    />
                  </div>

                  {/* Category Selection */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider pl-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium text-sm cursor-pointer"
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 2: Price & Age/Used For */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Price */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider pl-1">
                      Asking Price (₹)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 500, 1500"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium text-sm placeholder-neutral-400"
                    />
                  </div>

                  {/* Product Age */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider pl-1">
                      Used For (Age)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 1 Semester, 1 Year"
                      value={productAge}
                      onChange={(e) => setProductAge(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium text-sm placeholder-neutral-400"
                    />
                  </div>
                </div>

                {/* Row 3: College Location & Specific Pickup Landmark */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* College Location Selector */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider pl-1">
                      Your College Location
                    </label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium text-sm cursor-pointer"
                    >
                      <option value="">Select College</option>
                      {COLLEGES.filter(col => col !== "All Locations").map(uni => (
                        <option key={uni} value={uni}>{uni}</option>
                      ))}
                    </select>
                  </div>

                  {/* Specific Pickup Landmark */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider pl-1">
                      Specific Pickup Location / Landmark
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hostel Block B Room 302, Library Canteen, CSE Dept..."
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium text-sm placeholder-neutral-400"
                    />
                  </div>
                </div>

                {/* Row 3: Product Description */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider pl-1">
                    Product Description
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe the condition, edition, or any specific details about the product..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium text-sm placeholder-neutral-400 resize-none"
                  />
                </div>

                {/* Row 4: Multiple Image Upload Dropzone */}
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider pl-1">
                    Upload Product Photos
                  </label>

                  {/* Dropzone Container */}
                  <label className="group flex flex-col items-center justify-center w-full min-h-[160px] border-2 border-dashed border-neutral-300 dark:border-neutral-800 hover:border-emerald-500 dark:hover:border-emerald-500/80 rounded-2xl bg-neutral-50/50 dark:bg-neutral-800/20 hover:bg-emerald-50/10 dark:hover:bg-emerald-950/10 transition-all duration-300 cursor-pointer relative p-6 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-neutral-400 group-hover:text-emerald-500 transition-colors duration-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 group-hover:text-emerald-500 transition-colors duration-300">
                      Click to upload or drag photos here
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      PNG, JPEG, WebP (Max 5MB per photo)
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
                          Selected Photos ({files.length})
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
                              {/* Photo index counter badge */}
                              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-center flex-shrink-0">
                                #{idx + 1}
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
                              title="Delete Photo"
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
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-neutral-300 dark:disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-semibold rounded-xl transition duration-300 hover:scale-[1.01] hover:cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Listing Product on Store...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        List Product for Sale
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}
          </div>
        </Show>

      </div>
    </div>
  );
}
