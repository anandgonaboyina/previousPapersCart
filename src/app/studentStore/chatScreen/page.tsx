"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Show, SignInButton } from "@clerk/nextjs"
// Dummy Data that will later be replaced by Backend API calls
const INITIAL_CHATS = [
    {
        id: "1",
        sellerName: "Rahul M.",
        productName: "Engineering Drawing Set",
        productImage: "https://m.media-amazon.com/images/I/51drEYZBKML._SY300_SX300_QL70_FMwebp_.jpg",
        lastMessage: "Okay, sounds good! Are you free to meet near the campus library tomorrow?",
        time: "10:45 AM",
        unread: 2,
    },
    {
        id: "2",
        sellerName: "Priya S.",
        productName: "Data Structures Textbook (C++)",
        productImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400&h=300",
        lastMessage: "Yes, it's still available.",
        time: "Yesterday",
        unread: 0,
    },
    {
        id: "3",
        sellerName: "Arjun K.",
        productName: "Scientific Calculator",
        productImage: "https://rukminim2.flixcart.com/image/480/640/xif0q/calculator/6/n/f/advanced-scientific-calculator-with-2-line-display-science-original-imahdae5drwg5bv3.jpeg?q=90",
        lastMessage: "Can you do ₹800?",
        time: "Tuesday",
        unread: 0,
    }
];

const MOCK_MESSAGES = [
    { id: 1, sender: "user", text: "Hi, is this still available?" },
    { id: 2, sender: "seller", text: "Yes it is! Are you interested?" },
    { id: 3, sender: "user", text: "Would you take 400 for it?" },
];

function ChatScreenContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    // In the future, fetch these from your backend:
    // const { data: chats } = useSWR('/api/chats', fetcher)
    const [chats, setChats] = useState(INITIAL_CHATS);
    const [activeChat, setActiveChat] = useState<string | null>(null);

    useEffect(() => {
        const productId = searchParams.get('productId');
        if (productId && !activeChat) {
            const existingChat = chats.find(c => c.id === productId);
            if (existingChat) {
                setActiveChat(existingChat.id);
            } else {
                const newChat = {
                    id: productId,
                    sellerName: searchParams.get('seller') || 'Seller',
                    productName: searchParams.get('productName') || 'Product',
                    productImage: searchParams.get('image') || '',
                    lastMessage: 'Start a conversation...',
                    time: 'Just now',
                    unread: 0,
                };
                setChats(prev => [newChat, ...prev]);
                setActiveChat(productId);
            }
        }
    }, [searchParams]);

    // Selection State for Delete
    const [selectedChats, setSelectedChats] = useState<string[]>([]);
    const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);

    // Message State
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState(MOCK_MESSAGES);

    const currentChatDetails = chats.find(c => c.id === activeChat);

    // --- Long Press & Selection Logic ---
    const handlePointerDown = (id: string) => {
        const timer = setTimeout(() => {
            // Activate selection mode on long press
            if (!selectedChats.includes(id)) {
                setSelectedChats(prev => [...prev, id]);
            }
        }, 500); // 500ms for long press
        setLongPressTimer(timer);
    };

    const handlePointerUp = () => {
        if (longPressTimer) {
            clearTimeout(longPressTimer);
            setLongPressTimer(null);
        }
    };

    const handleChatClick = (id: string) => {
        if (selectedChats.length > 0) {
            // If in selection mode, toggle selection
            setSelectedChats(prev =>
                prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
            );
        } else {
            // Otherwise, open chat
            setActiveChat(id);
        }
    };

    const handleDeleteSelected = () => {
        setChats(prev => prev.filter(chat => !selectedChats.includes(chat.id)));
        setSelectedChats([]);
    };
    // ------------------------------------

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        // API Call here later: await axios.post(`/api/messages`, { text: newMessage, chatId: activeChat })
        setMessages([...messages, { id: Date.now(), sender: "user", text: newMessage }]);
        setNewMessage("");
    };

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col pt-16 sm:pt-20">
            {/* If no chat is active, show the list of all messages */}
            {!activeChat ? (
                <div className="flex-1 w-full max-w-3xl mx-auto py-4 sm:py-8 px-2 sm:px-6">
                    <div className="flex items-center justify-between mb-4 sm:mb-6 px-2 sm:px-0">
                        {selectedChats.length > 0 ? (
                            <div className="flex items-center gap-3">
                                <button onClick={() => setSelectedChats([])} className="p-1 sm:p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full transition-colors text-neutral-600 dark:text-neutral-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <span className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                                    {selectedChats.length} Selected
                                </span>
                            </div>
                        ) : (
                            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">Your Chats</h1>
                        )}

                        {selectedChats.length > 0 ? (
                            <button
                                onClick={handleDeleteSelected}
                                className="p-2 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-full hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors shadow-sm"
                                title="Delete Selected"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        ) : (
                            <Link
                                href="/studentStore"
                                className="text-emerald-600 hover:text-emerald-500 font-medium text-xs sm:text-sm bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full"
                            >
                                Back to Store
                            </Link>
                        )}
                    </div>

                    {chats.length === 0 ? (
                        <div className="text-center py-20 text-neutral-500 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800">
                            No messages yet. Start a chat from the Student Store!
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-neutral-900 sm:rounded-3xl shadow-sm sm:border border-neutral-200 dark:border-neutral-800 overflow-hidden divide-y divide-neutral-100 dark:divide-neutral-800">
                            {chats.map((chat) => {
                                const isSelected = selectedChats.includes(chat.id);
                                return (
                                    <div
                                        key={chat.id}
                                        onPointerDown={() => handlePointerDown(chat.id)}
                                        onPointerUp={handlePointerUp}
                                        onPointerLeave={handlePointerUp}
                                        onClick={() => handleChatClick(chat.id)}
                                        className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 cursor-pointer transition-colors select-none ${isSelected
                                            ? "bg-emerald-50 dark:bg-emerald-900/20"
                                            : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                                            }`}
                                    >
                                        {/* Selection Checkmark / Product Photo */}
                                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden flex-shrink-0 shadow-sm border border-neutral-200 dark:border-neutral-700">
                                            <img
                                                src={chat.productImage}
                                                alt={chat.productName}
                                                className={`w-full h-full object-cover transition-opacity ${isSelected ? 'opacity-40' : 'opacity-100'}`}
                                            />
                                            {isSelected && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-emerald-500/20">
                                                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-sm">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Chat Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center mb-0.5">
                                                <h3 className="font-bold text-neutral-900 dark:text-white truncate text-sm sm:text-base">
                                                    {chat.sellerName}
                                                </h3>
                                                <span className={`text-[10px] sm:text-xs font-medium flex-shrink-0 ml-2 ${chat.unread > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-500'}`}>
                                                    {chat.time}
                                                </span>
                                            </div>
                                            <div className="mb-0.5 sm:mb-1">
                                                <p className="text-[10px] sm:text-xs font-semibold text-emerald-600 dark:text-emerald-500 truncate">
                                                    {chat.productName}
                                                </p>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 truncate pr-2 sm:pr-4">
                                                    {chat.lastMessage}
                                                </p>
                                                {chat.unread > 0 && !isSelected && (
                                                    <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-500 text-white text-[10px] sm:text-xs font-bold flex items-center justify-center flex-shrink-0 shadow-sm shadow-emerald-500/30">
                                                        {chat.unread}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            ) : (
                /* Active Chat Screen - Fixed overlay to cover navbar */
                <div className="fixed inset-0 z-[100] flex flex-col bg-white dark:bg-neutral-950 shadow-xl">

                    {/* Chat Header with Back Button */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 z-10 sticky top-0">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => {
                                    if (searchParams.has('productId')) {
                                        // Came directly from the store's "Message Seller"
                                        router.back();
                                    } else {
                                        // Opened from the chats list
                                        setActiveChat(null);
                                    }
                                }}
                                className="p-2 -ml-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden flex-shrink-0 border border-neutral-200 dark:border-neutral-700">
                                <img
                                    src={currentChatDetails?.productImage}
                                    alt={currentChatDetails?.productName}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white leading-none mb-0.5 truncate">
                                    {currentChatDetails?.sellerName}
                                </h3>
                                <p className="text-[10px] sm:text-xs text-emerald-600 dark:text-emerald-400 font-medium truncate">
                                    {currentChatDetails?.productName}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Messages Area - Takes remaining space and scrolls */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50 dark:bg-neutral-950">
                        <div className="w-full max-w-3xl mx-auto flex flex-col space-y-4">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${msg.sender === 'user'
                                        ? 'bg-emerald-600 text-white rounded-br-sm shadow-sm'
                                        : 'bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-bl-sm border border-neutral-200 dark:border-neutral-700 shadow-sm'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Input Area - Fixed at the bottom */}
                    <div className="w-full bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 pb-4 sm:pb-0">
                        <div className="max-w-3xl mx-auto p-3 sm:p-4">
                            <form onSubmit={handleSendMessage} className="flex items-center gap-2 relative">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-neutral-100 dark:bg-neutral-800 border-none rounded-full px-5 py-3.5 pr-12 text-sm text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={!newMessage.trim()}
                                    className="absolute right-1.5 p-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}




export default function ChatScreenPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">Loading chats...</div>}>
            <Show when="signed-out">
                <div className="min-h-[78vh] bg-neutral-50 dark:bg-neutral-950 relative flex flex-col items-center justify-center pt-8 md:pt-12 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
                    {/* Background Elements */}
                    <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
                        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-600/5 blur-[100px] rounded-full"></div>
                        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-teal-500/10 dark:bg-teal-600/5 blur-[100px] rounded-full"></div>
                    </div>

                    <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-300">
                        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 md:p-12 text-center shadow-xl space-y-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                                Authentication Required
                            </h2>
                            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                                You need to be signed in to access your chats. Log in to message sellers, discuss item details, and coordinate pickups.
                            </p>
                            <div className="pt-2">
                                <Link href="/sign-in"
                                    className="inline-block w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-full hover:scale-105 hover:cursor-pointer transition-all duration-300 shadow-lg shadow-emerald-600/20 text-center"
                                >
                                    Sign In to Chat
                                </Link>
                            </div>
                            <div className="text-center pt-2">
                                <Link href="/studentStore" className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
                                    Back to Student Store
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Show>

            <Show when="signed-in">
                <ChatScreenContent />
            </Show>
        </Suspense>
    );
}
