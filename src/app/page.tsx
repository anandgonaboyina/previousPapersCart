"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// Custom hook for scroll animation
function useScrollReveal() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// Fade in component wrapper
const RevealOnScroll = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
    >
      {children}
    </div>
  );
};

const sliderImages = [
  "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200",
];

const teamMembers = [
  {
    name: "Anand Kumar",
    roles: ["Lead full stack Developer", "UI/UX Designer", "System Architect"],
    avatar: "/avatars/Anand%20Kumar.jpeg",
  },
  {
    name: "Sathish Kumar",
    roles: ["Database Engineer", "User Research"],
    avatar: "https://ui-avatars.com/api/?name=Sathish+Kumar&background=2563eb&color=fff",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-sky-50 pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-16 pb-12">
        <RevealOnScroll>
          <div className="text-center space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-sky-900/40 border border-sky-700/50 text-sky-300 text-xs sm:text-sm font-medium mb-2 sm:mb-4 backdrop-blur-sm">
              🚀 The Ultimate B.Tech Hub
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
              Centralized Platform for <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                NIT & IIT Papers
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-sky-200/80 leading-relaxed px-2">
              A one-stop site where anyone can browse, search, and manage PYQs.
              Access past papers by College, Department, and Year with absolute ease.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 sm:pt-6">
              <Link
                href="/previousPapers"
                className="px-6 py-3 sm:px-8 sm:py-4 rounded-2xl bg-sky-600 text-white font-bold text-base sm:text-lg hover:bg-sky-500 shadow-lg shadow-sky-600/30 hover:shadow-sky-500/50 transition-all duration-300 w-full sm:w-auto"
              >
                Browse Papers
              </Link>
              <Link
                href="/studentStore"
                className="px-6 py-3 sm:px-8 sm:py-4 rounded-2xl bg-sky-900/40 border border-sky-700/50 text-sky-100 font-bold text-base sm:text-lg hover:bg-sky-800/60 transition-all duration-300 backdrop-blur-sm w-full sm:w-auto"
              >
                Marketplace
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Auto-Sliding Image Carousel */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <RevealOnScroll delay={200}>
          <div className="relative w-full aspect-video sm:h-[400px] md:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-sky-900/20 border border-sky-800/30">
            {sliderImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Showcase ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
              />
            ))}
            <div className="absolute inset-0 bg-sky-950/20 z-20 pointer-events-none"></div>

            {/* Carousel Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
              {sliderImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-sky-400 w-6" : "bg-sky-400/40 hover:bg-sky-400/70"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* App Information / Vision Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
        <RevealOnScroll>
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">Why Choose PrepPapers?</h2>
            <p className="text-sky-200/70 max-w-2xl mx-auto text-sm sm:text-base">Everything you need to excel in your academics, organized in one powerful platform.</p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8">

          {/* Feature 1 */}
          <RevealOnScroll delay={100}>
            <div className="bg-sky-900/20 border border-sky-800/40 rounded-xl sm:rounded-3xl p-3 sm:p-8 backdrop-blur-sm hover:bg-sky-900/30 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="w-8 h-8 sm:w-14 sm:h-14 bg-sky-600/20 rounded-lg sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-6 border border-sky-500/30">
                <svg className="w-4 h-4 sm:w-8 sm:h-8 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-sm sm:text-2xl font-bold text-white mb-2 sm:mb-3">Seamless Search</h3>
              <p className="text-[15px] sm:text-base text-sky-200/80 leading-relaxed mt-auto">
                Find exactly what you need in seconds. Filter and browse Previous Year Questions (PYQs)
                specifically tailored by <span className="text-sky-300 font-semibold">College &rarr; Dept &rarr; Year</span>.
              </p>
            </div>
          </RevealOnScroll>

          {/* Feature 2 */}
          <RevealOnScroll delay={200}>
            <div className="bg-sky-900/20 border border-sky-800/40 rounded-xl sm:rounded-3xl p-3 sm:p-8 backdrop-blur-sm hover:bg-sky-900/30 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="w-8 h-8 sm:w-14 sm:h-14 bg-indigo-600/20 rounded-lg sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-6 border border-indigo-500/30">
                <svg className="w-4 h-4 sm:w-8 sm:h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-sm sm:text-2xl font-bold text-white mb-2 sm:mb-3">Secure Access</h3>
              <p className="text-[15px] sm:text-base text-sky-200/80 leading-relaxed mt-auto">
                Log in securely using <span className="text-indigo-300 font-semibold">College OTP verification</span>.
                Only authenticated students can upload papers or sell their old stuff.
              </p>
            </div>
          </RevealOnScroll>

          {/* Feature 3 */}
          <RevealOnScroll delay={300}>
            <div className="bg-sky-900/20 border border-sky-800/40 rounded-xl sm:rounded-3xl p-3 sm:p-8 backdrop-blur-sm hover:bg-sky-900/30 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="w-8 h-8 sm:w-14 sm:h-14 bg-blue-600/20 rounded-lg sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-6 border border-blue-500/30">
                <svg className="w-4 h-4 sm:w-8 sm:h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-sm sm:text-2xl font-bold text-white mb-2 sm:mb-3">Marketplace</h3>
              <p className="text-[15px] sm:text-base text-sky-200/80 leading-relaxed mt-auto">
                Buy and sell engineering equipment, books, and tools easily. Trade safely with verified
                peers on our integrated <span className="text-blue-300 font-semibold">Student Store</span>.
              </p>
            </div>
          </RevealOnScroll>

          {/* Feature 4 (New) */}
          <RevealOnScroll delay={400}>
            <div className="bg-sky-900/20 border border-sky-800/40 rounded-xl sm:rounded-3xl p-3 sm:p-8 backdrop-blur-sm hover:bg-sky-900/30 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="w-8 h-8 sm:w-14 sm:h-14 bg-emerald-600/20 rounded-lg sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-6 border border-emerald-500/30">
                <svg className="w-4 h-4 sm:w-8 sm:h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <h3 className="text-sm sm:text-2xl font-bold text-white mb-2 sm:mb-3">Personalized Bookmarks</h3>
              <p className="text-[15px] sm:text-base text-sky-200/80 leading-relaxed mt-auto">
                Never lose track of important materials again. <span className="text-emerald-300 font-semibold">Save papers</span> and organize them instantly in your private dashboard.
              </p>
            </div>
          </RevealOnScroll>

        </div>
      </section>

      {/* Meet The Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
        {/* Soft background gradient for the team section */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-sky-950/10 to-slate-950 pointer-events-none"></div>

        <div className="relative z-10">
          <RevealOnScroll>
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">Meet The Team</h2>
              <p className="text-sky-200/70 max-w-2xl mx-auto text-sm sm:text-base">The passionate minds behind building the ultimate platform for B.Tech students.</p>
            </div>
          </RevealOnScroll>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <RevealOnScroll key={member.name} delay={index * 150}>
                <div className="w-[165px] sm:w-[280px] bg-sky-950/40 border border-sky-800/40 rounded-2xl p-4 sm:p-6 flex flex-col items-center text-center hover:bg-sky-900/40 hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-sky-900/10 h-full">
                  <div className="w-18 h-18 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-3 sm:mb-5 border-2 border-sky-500/50 shadow-lg shadow-sky-900/50">
                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-sm sm:text-xl font-bold text-white mb-2 sm:mb-3">{member.name}</h4>
                  <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-1.5 mt-auto w-full">
                    {member.roles.map((role) => (
                      <span key={role} className="text-[12px] sm:text-[11px] font-medium text-sky-300 bg-sky-900/50 px-2 py-1 rounded-md sm:rounded-full border border-sky-800/50 leading-tight">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
