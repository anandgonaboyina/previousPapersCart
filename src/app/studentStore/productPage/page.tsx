"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MOCK_PRODUCTS } from "@/data/products";

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${star <= Math.floor(rating) ? "text-amber-400" : star - 0.5 <= rating ? "text-amber-300" : "text-neutral-300 dark:text-neutral-600"}`} viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
            <span className="ml-1 text-sm font-medium text-neutral-600 dark:text-neutral-400">{rating}</span>
        </div>
    );
}

export default function ProductPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center"><div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div></div>}>
            <ProductPageContent />
        </Suspense>
    );
}

function ProductPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const productId = Number(searchParams.get("id") || "1");

    const product = MOCK_PRODUCTS.find((p) => p.id === productId) || MOCK_PRODUCTS[0];
    const [currentSlide, setCurrentSlide] = useState(0);

    const relatedProducts = useMemo(() => {
        return MOCK_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);
    }, [product.id]);

    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
    const nextSlide = () => setCurrentSlide((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));

    const messageSeller = () => {
        router.push(`/studentStore/chatScreen?productId=${product.id}&seller=${encodeURIComponent(product.seller)}&productName=${encodeURIComponent(product.name)}&image=${encodeURIComponent(product.images[0])}`);
    };

    const conditionColor: Record<string, string> = {
        "Like New": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
        "Good": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
        "Fair": "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    };

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 relative pb-16 overflow-x-hidden z-0">
            {/* Background Blurs */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
                <div className="absolute top-20 right-1/4 w-96 h-96 bg-emerald-500/15 dark:bg-emerald-600/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-teal-500/15 dark:bg-teal-600/10 blur-[120px] rounded-full"></div>
            </div>

            {/* Back Button Bar — Fixed */}
            <div className="fixed top-0 left-0 right-0 z-30 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
                    <button onClick={() => router.back()} className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        Back
                    </button>
                    <span className="text-neutral-300 dark:text-neutral-700">|</span>
                    <span className="text-sm text-neutral-500 dark:text-neutral-500 truncate">{product.category} / {product.name}</span>
                </div>
            </div>

            {/* Spacer for fixed bar */}
            <div className="h-12"></div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 space-y-10">
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">

                    {/* LEFT: Image Slider */}
                    <div className="space-y-4">
                        <div className="relative rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 aspect-[4/3] border border-neutral-200 dark:border-neutral-800 shadow-lg">
                            <img src={product.images[currentSlide]} alt={product.name} className="w-full h-full object-cover transition-opacity duration-300" />
                            {/* Prev / Next Arrows */}
                            {product.images.length > 1 && (
                                <>
                                    <button onClick={prevSlide} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white dark:hover:bg-neutral-800 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-700 dark:text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                    </button>
                                    <button onClick={nextSlide} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white dark:hover:bg-neutral-800 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-700 dark:text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </button>
                                </>
                            )}
                            {/* Slide Counter */}
                            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                                {currentSlide + 1} / {product.images.length}
                            </div>
                        </div>
                        {/* Thumbnail Strip */}
                        <div className="flex gap-2 overflow-x-auto pb-1">
                            {product.images.map((img, idx) => (
                                <button key={idx} onClick={() => setCurrentSlide(idx)} className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${idx === currentSlide ? "border-emerald-500 shadow-md shadow-emerald-500/20" : "border-transparent opacity-60 hover:opacity-100"}`}>
                                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Product Info */}
                    <div className="space-y-6">
                        {/* Title & Price */}
                        <div>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${conditionColor[product.condition] || "bg-neutral-100 text-neutral-600"}`}>{product.condition}</span>
                                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full">{product.category}</span>
                                <span className="text-xs text-neutral-400 dark:text-neutral-500 ml-auto">Posted {product.postedDate}</span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">{product.name}</h1>
                            <p className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500 mt-2">{product.price}</p>
                        </div>

                        {/* Quick Details */}
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "Used For", value: product.age },
                                { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z", label: "Location", value: product.location },
                            ].map((item, i) => (
                                <div key={i} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3">
                                    <p className="text-xs text-neutral-500 dark:text-neutral-500 mb-1">{item.label}</p>
                                    <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">{item.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5">
                            <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                Product Description
                            </h2>
                            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{product.description}</p>
                        </div>

                        {/* About the Seller */}
                        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5">
                            <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                About the Seller
                            </h2>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                    {product.seller.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-neutral-900 dark:text-white">{product.seller}</p>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{product.sellerYear}</p>
                                    <StarRating rating={product.sellerRating} />
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{product.sellerSales} items sold</p>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">{product.sellerBio}</p>
                                </div>
                            </div>
                        </div>

                        {/* Message Seller Button */}
                        <button onClick={messageSeller} className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-base rounded-2xl transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 flex items-center justify-center gap-3 active:scale-[0.98]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                            Message Seller
                        </button>
                    </div>
                </div>

                {/* more Products from other students */}
                <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-white mb-6">More from the Other Students</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
                        {relatedProducts.map((rp) => (
                            <div key={rp.id} onClick={() => { setCurrentSlide(0); router.push(`/studentStore/productPage?id=${rp.id}`); window.scrollTo(0, 0); }} className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group">
                                <div className="relative h-28 sm:h-40 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                                    <img src={rp.images[0]} alt={rp.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">{rp.price}</div>
                                </div>
                                <div className="p-3 sm:p-4">
                                    <h3 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white line-clamp-2 leading-tight">{rp.name}</h3>
                                    <p className="text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-1">{rp.location} · {rp.age}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
