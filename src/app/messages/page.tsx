"use client";

import React, { useState } from "react";
import Link from "next/link";

// Fake Data for Boilerplate
const INITIAL_CHATS = [
    {
        id: "1",
        sellerName: "Rahul M.",
        productName: "Engineering Drawing Set",
        lastMessage: "Okay, sounds good! Are you free to meet near the campus library tomorrow?",
        time: "10:45 AM",
        unread: 2,
    },
    {
        id: "2",
        sellerName: "Priya S.",
        productName: "Data Structures Textbook (C++)",
        lastMessage: "Yes, it's still available.",
        time: "Yesterday",
        unread: 0,
    },
    {
        id: "3",
        sellerName: "Arjun K.",
        productName: "Scientific Calculator",
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

export default function MessagesPage() {
    const [chats, setChats] = useState(INITIAL_CHATS);
    const [activeChat, setActiveChat] = useState<string | null>(null);
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState(MOCK_MESSAGES);

    // Get the current active chat details
    const currentChatDetails = chats.find(c => c.id === activeChat);

    const handleDeleteChat = (e: React.MouseEvent, id: string) => {
        e.stopPropagation(); // Prevent clicking the chat row when clicking delete
        setChats(prev => prev.filter(chat => chat.id !== id));
        if (activeChat === id) {
            setActiveChat(null);
        }
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        setMessages([...messages, { id: Date.now(), sender: "user", text: newMessage }]);
        setNewMessage("");
    };

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col">

            {/* If no chat is active, show the list of all messages */}
            {!activeChat ? (
                <div className="flex-1 w-full max-w-3xl mx-auto pt-24 pb-12 px-4 sm:px-6">
                    <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6">Messages</h1>

                    {chats.length === 0 ? (
                        <div className="text-center py-20 text-neutral-500">
                            No messages yet. Start a chat from the Student Store!
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                            {chats.map((chat) => (
                                <div
                                    key={chat.id}
                                    onClick={() => setActiveChat(chat.id)}
                                    className="flex items-center gap-4 p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 border-b border-neutral-100 dark:border-neutral-800 cursor-pointer transition-colors last:border-0"
                                >
                                    {/* Avatar */}
                                    <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex-shrink-0 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-lg">
                                        {chat.sellerName.charAt(0)}
                                    </div>

                                    {/* Chat Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <h3 className="font-semibold text-neutral-900 dark:text-white truncate">
                                                {chat.sellerName}
                                            </h3>
                                            <span className="text-xs text-neutral-500 flex-shrink-0 ml-2">
                                                {chat.time}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm text-neutral-500 dark:text-neutral-400 truncate pr-4">
                                                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-500 mr-2 border border-emerald-200 dark:border-emerald-800 px-1.5 py-0.5 rounded">
                                                    {chat.productName}
                                                </span>
                                                {chat.lastMessage}
                                            </p>
                                            {chat.unread > 0 && (
                                                <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center flex-shrink-0">
                                                    {chat.unread}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Delete Button */}
                                    <button
                                        onClick={(e) => handleDeleteChat(e, chat.id)}
                                        className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors ml-2"
                                        title="Delete Chat"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                /* Chat Screen - Takes up full height */
                <div className="flex-1 flex flex-col w-full max-w-3xl mx-auto h-[calc(100vh)] bg-white dark:bg-neutral-950">

                    {/* Chat Header with Back Button */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm z-10 pt-20">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setActiveChat(null)}
                                className="p-2 -ml-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
                                {currentChatDetails?.sellerName.charAt(0)}
                            </div>

                            <div>
                                <h3 className="font-bold text-neutral-900 dark:text-white leading-none mb-1">
                                    {currentChatDetails?.sellerName}
                                </h3>
                                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                                    Inquiring about: {currentChatDetails?.productName}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50 dark:bg-neutral-950">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${msg.sender === 'user'
                                    ? 'bg-emerald-600 text-white rounded-br-sm'
                                    : 'bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-bl-sm border border-neutral-200 dark:border-neutral-700 shadow-sm'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 pb-8 sm:pb-4">
                        <form onSubmit={handleSendMessage} className="flex items-center gap-2 relative">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 bg-neutral-100 dark:bg-neutral-800 border-none rounded-full px-5 py-3.5 pr-12 text-sm text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                            />
                            <button
                                type="submit"
                                disabled={!newMessage.trim()}
                                className="absolute right-1.5 p-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
