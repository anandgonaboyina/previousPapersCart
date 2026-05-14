import React from "react";
import Link from "next/link";
import Image from "next/image";

// Array for scrolling images - simply add or change the URLs here!
const scrollingImages = [
  "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800", // Study group
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800", // Notebooks
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800", // Library
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800", // Study planning
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-sky-50 pb-20 overflow-x-hidden">

      {/* Spacer for fixed navbars */}
      <div className="h-36 md:h-44"></div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-16 pb-12">
        <div className="text-center space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-sky-900/40 border border-sky-700/50 text-sky-300 text-sm font-medium mb-4 backdrop-blur-sm">
            🚀 The Ultimate B.Tech Hub
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
            Centralized Platform for <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              NIT & IIT Papers
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-sky-200/80 leading-relaxed">
            A one-stop site where anyone can browse, search, and manage PYQs.
            Access past papers by College, Department, and Year with absolute ease.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link
              href="/previous-papers"
              className="px-8 py-4 rounded-2xl bg-sky-600 text-white font-bold text-lg hover:bg-sky-500 shadow-lg shadow-sky-600/30 hover:shadow-sky-500/50 transition-all duration-300 w-full sm:w-auto"
            >
              Browse Papers
            </Link>
            <Link
              href="/store"
              className="px-8 py-4 rounded-2xl bg-sky-900/40 border border-sky-700/50 text-sky-100 font-bold text-lg hover:bg-sky-800/60 transition-all duration-300 backdrop-blur-sm w-full sm:w-auto"
            >
              Marketplace
            </Link>
          </div>
        </div>
      </section>

      {/* Infinite Scrolling Images Marquee */}
      <section className="py-12 relative flex overflow-x-hidden">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10"></div>

        {/* We map the array twice to create a seamless infinite loop effect */}
        <div className="flex animate-marquee gap-6 whitespace-nowrap">
          {[...scrollingImages, ...scrollingImages].map((imgUrl, index) => (
            <div
              key={index}
              className="relative w-72 h-48 md:w-96 md:h-64 rounded-3xl overflow-hidden shadow-xl shadow-sky-900/20 border border-sky-800/30 flex-shrink-0"
            >
              <img
                src={imgUrl}
                alt={`App showcase ${index}`}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-sky-950/20 hover:bg-transparent transition-colors duration-500"></div>
            </div>
          ))}
        </div>
      </section>

      {/* App Information / Vision Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Feature 1 */}
          <div className="bg-sky-900/20 border border-sky-800/40 rounded-3xl p-8 backdrop-blur-sm hover:bg-sky-900/30 transition-colors">
            <div className="w-14 h-14 bg-sky-600/20 rounded-2xl flex items-center justify-center mb-6 border border-sky-500/30">
              <svg className="w-8 h-8 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Seamless Search</h3>
            <p className="text-sky-200/80 leading-relaxed">
              Find exactly what you need in seconds. Filter and browse Previous Year Questions (PYQs)
              specifically tailored by <span className="text-sky-300 font-semibold">College &rarr; Dept &rarr; Year</span>.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-sky-900/20 border border-sky-800/40 rounded-3xl p-8 backdrop-blur-sm hover:bg-sky-900/30 transition-colors">
            <div className="w-14 h-14 bg-indigo-600/20 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/30">
              <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Secure Access</h3>
            <p className="text-sky-200/80 leading-relaxed">
              Log in securely using <span className="text-indigo-300 font-semibold">College OTP verification</span>.
              Only authenticated students can upload papers or sell their old stuff.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-sky-900/20 border border-sky-800/40 rounded-3xl p-8 backdrop-blur-sm hover:bg-sky-900/30 transition-colors">
            <div className="w-14 h-14 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/30">
              <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Marketplace</h3>
            <p className="text-sky-200/80 leading-relaxed">
              Buy and sell engineering equipment, books, and tools easily. Manage your
              <span className="text-blue-300 font-semibold"> favorites</span> and keep track of materials you need.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
