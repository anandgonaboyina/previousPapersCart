"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Mock Data
const COLLEGES = ["All Locations", "JNTUH", "Osmania University", "Kakatiya University", "Andhra University"];

const MOCK_PRODUCTS = [
    {
        id: 1,
        name: "Engineering Drawing Set",
        price: "₹450",
        age: "1 year old",
        location: "JNTUH",
        seller: "Rahul M.",
        image: "https://m.media-amazon.com/images/I/51drEYZBKML._SY300_SX300_QL70_FMwebp_.jpg",
        category: "Instruments"
    },
    {
        id: 2,
        name: "Data Structures Textbook (C++)",
        price: "₹300",
        age: "2 years old",
        location: "Osmania University",
        seller: "Priya S.",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400&h=300",
        category: "Books"
    },
    {
        id: 3,
        name: "Scientific Calculator (Casio FX-991EX)",
        price: "₹850",
        age: "6 months old",
        location: "JNTUH",
        seller: "Arjun K.",
        image: "https://rukminim2.flixcart.com/image/480/640/xif0q/calculator/6/n/f/advanced-scientific-calculator-with-2-line-display-science-original-imahdae5drwg5bv3.jpeg?q=90",
        category: "Electronics"
    },
    {
        id: 4,
        name: "First Year B.Tech Complete Books",
        price: "₹1200",
        age: "1.5 years old",
        location: "Kakatiya University",
        seller: "Neha V.",
        image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=400&h=300",
        category: "Books"
    },
    {
        id: 5,
        name: "Mini Drafter",
        price: "₹200",
        age: "2 years old",
        location: "Andhra University",
        seller: "Karthik R.",
        image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRCEpIUAfd2Lb_xj85YICx3v_3P9LRBbZ7of1TWzQXQM1hDf95VvujyHV2bM9K1mNmUbD5GauPBqEw4duAz1Fe9i1V_mcSF_bFr12zmEo-lu5iADwYD7Y0cTQ",
        category: "Instruments"
    },
    {
        id: 6,
        name: "Arduino Uno Kit",
        price: "₹1500",
        age: "3 months old",
        location: "Osmania University",
        seller: "Sandeep B.",
        image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=400&h=300",
        category: "Electronics"
    }
];

export default function StudentStorePage() {
    const router = useRouter();
    const [selectedLocation, setSelectedLocation] = useState("All Locations");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProducts = MOCK_PRODUCTS.filter(product => {
        const matchesLocation = selectedLocation === "All Locations" || product.location === selectedLocation;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesLocation && matchesSearch;
    });

    const openChat = (product: any) => {
        // Navigate to the chat screen and auto-open this specific seller's chat
        router.push(`/studentStore/chatScreen?productId=${product.id}&seller=${encodeURIComponent(product.seller)}&productName=${encodeURIComponent(product.name)}&image=${encodeURIComponent(product.image)}`);
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-neutral-50 dark:bg-neutral-950 relative pt-8 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden z-0">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/20 dark:bg-emerald-600/10 blur-[100px] rounded-full"></div>
                <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-teal-500/20 dark:bg-teal-600/10 blur-[100px] rounded-full"></div>
            </div>

            <div className="w-full max-w-7xl mx-auto space-y-10 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white dark:bg-neutral-900 p-6 md:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-2">
                            Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Store</span>
                        </h1>
                        <p className="text-neutral-600 dark:text-neutral-400">
                            Buy and sell used books, instruments, and electronics within your college.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
                        {/* Search Bar */}
                        <div className="relative flex items-center bg-neutral-100 dark:bg-neutral-800 rounded-xl px-4 py-3 min-w-[250px]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="bg-transparent border-none outline-none w-full text-neutral-800 dark:text-white placeholder-neutral-500 text-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Location Filter */}
                        <div className="relative">
                            <select
                                className="appearance-none w-full sm:w-auto bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50 rounded-xl px-4 py-3 pr-10 font-semibold cursor-pointer outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm"
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                            >
                                {COLLEGES.map(college => (
                                    <option key={college} value={college} className="text-neutral-900 bg-white">
                                        📍 {college}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-emerald-600 dark:text-emerald-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="bg-white dark:bg-neutral-900 rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                                {/* Image Area */}
                                <div className="relative h-32 sm:h-48 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold text-neutral-800 dark:text-neutral-200 shadow-sm">
                                        {product.category}
                                    </div>
                                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-emerald-500 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold shadow-md">
                                        {product.price}
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-3 sm:p-5 flex-1 flex flex-col">
                                    <h3 className="text-sm sm:text-lg font-bold text-neutral-900 dark:text-white leading-tight mb-2 line-clamp-2">
                                        {product.name}
                                    </h3>

                                    <div className="flex flex-col gap-1.5 sm:gap-2 mb-3 sm:mb-4 mt-auto">
                                        <div className="flex items-center text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Used for: <span className="font-medium text-neutral-800 dark:text-neutral-300 ml-1">{product.age}</span>
                                        </div>
                                        <div className="flex items-center text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {product.location}
                                        </div>
                                        <div className="flex items-center text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Seller: <span className="font-medium text-neutral-800 dark:text-neutral-300 ml-1">{product.seller}</span>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <button
                                        onClick={() => openChat(product)}
                                        className="w-full mt-auto py-2 sm:py-3 bg-neutral-100 hover:bg-emerald-50 dark:bg-neutral-800 dark:hover:bg-emerald-900/30 text-neutral-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold text-xs sm:text-sm rounded-lg sm:rounded-xl transition-colors duration-300 flex justify-center items-center gap-1 sm:gap-2 border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800/50"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        Message Seller
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800">
                        <div className="w-24 h-24 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">No products found</h3>
                        <p className="text-neutral-500 max-w-md">
                            We couldn't find any items matching your search or location criteria. Try adjusting your filters.
                        </p>
                        <button
                            onClick={() => { setSearchQuery(""); setSelectedLocation("All Locations"); }}
                            className="mt-6 px-6 py-2.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 font-medium rounded-full hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
}
