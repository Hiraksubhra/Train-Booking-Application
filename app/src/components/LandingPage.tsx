import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useQuery } from '@tanstack/react-query';
import { fetchStations } from "../api/trainApi";
import { Navbar } from "./Navbar.tsx";
import {StationAutocomplete} from "./StationAutocomplete.tsx";

export const LandingPage: React.FC = () => {
    const [source, setSource] = useState('Delhi');
    const [destination, setDestination] = useState('Agra');
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date('2026-08-03'));
    const [passengers, setPassengers] = useState('1 Adult');

    const navigate = useNavigate();

    const handleSearch = () => {
        if (source && destination) {
            const dateParam = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
            navigate(`/search?source=${encodeURIComponent(source)}&destination=${encodeURIComponent(destination)}&date=${encodeURIComponent(dateParam)}`);
        }
    }

    const { data: stations = [] } = useQuery({
        queryKey: ['stations'],
        queryFn: fetchStations,
        staleTime: Infinity,
    });

    return (
        <div className="min-h-screen bg-[#fcfaf4] font-sans relative overflow-hidden">

            <div
                className="absolute top-[-5%] left-0 w-full h-[800px] bg-no-repeat bg-cover lg:bg-contain bg-top opacity-60 pointer-events-none mix-blend-multiply z-0"
                style={{ backgroundImage: "url('/assets/background_img.webp')" }}
            ></div>

            <div className="relative z-10">
                <Navbar />

                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">

                    {/* Header Text */}
                    <h1 className="text-4xl md:text-[40px] font-bold text-gray-900 mb-2 max-w-4xl tracking-tight drop-shadow-sm">
                        INDIAN RAILWAYS: Simple, Fast , Secure Train Travel.
                    </h1>
                    <p className="text-lg text-gray-800 mb-8 font-medium">
                        Plan your hassle-free journey across India.
                    </p>

                    <div className="flex flex-col lg:flex-row gap-8 items-start relative">

                        {/* Floating Search Card */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6 w-full lg:w-[60%] z-10 border border-gray-100">
                            <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>

                                {/* Top Row: Stations & Date */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    {/* From Station */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">From Station</label>
                                        <StationAutocomplete
                                            value={source}
                                            onChange={setSource}
                                            stations={stations}
                                            placeholder="Delhi"
                                            icon={<svg className="w-4 h-4 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                                        />
                                    </div>

                                    {/* To Station */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">To Station</label>
                                        <StationAutocomplete
                                            value={destination}
                                            onChange={setDestination}
                                            stations={stations}
                                            placeholder="Delhi"
                                            icon={<svg className="w-4 h-4 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                                        />
                                    </div>

                                    {/* Travel Date */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Travel Date</label>
                                        <div
                                            className="flex items-center gap-2 bg-[#f4f2ff] border border-[#e5e0ff] rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-purple-400 transition-all cursor-pointer"
                                            onClick={(e) => {
                                                // This forces the calendar to open when clicking anywhere in the wrapper
                                                const input = e.currentTarget.querySelector('input');
                                                if (input && 'showPicker' in input) {
                                                    input.showPicker();
                                                }
                                            }}
                                        >
                                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            <input
                                                type="date"
                                                value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
                                                onChange={(e) => setSelectedDate(e.target.value ? new Date(e.target.value) : null)}
                                                className="w-full focus:outline-none text-gray-800 text-sm bg-transparent font-medium cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Row: Passengers */}
                                <div className="mb-6 w-full md:w-[32%]">
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Passengers</label>
                                    <div className="relative flex items-center bg-[#f4f2ff] border border-[#e5e0ff] rounded-lg py-2.5 focus-within:ring-2 focus-within:ring-purple-400 transition-all cursor-pointer">
                                        {/* Left Icon - Positioned absolute and pointer-events-none */}
                                        <svg className="w-4 h-4 text-gray-500 absolute left-3 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>

                                        {/* Select Element - Expanded to fill space using padding */}
                                        <select
                                            className="w-full pl-9 pr-9 focus:outline-none text-gray-800 text-sm bg-transparent appearance-none cursor-pointer font-medium"
                                            value={passengers}
                                            onChange={(e) => setPassengers(e.target.value)}
                                        >
                                            <option>1 Adult</option>
                                            <option>2 Adults</option>
                                            <option>3 Adults</option>
                                            <option>4 Adults</option>
                                        </select>

                                        {/* Right Angle Bracket - Positioned absolute and pointer-events-none */}
                                        <svg className="w-4 h-4 text-gray-400 absolute right-3 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>

                                {/* Find Trains Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-[#7a20c9] hover:bg-[#6819b0] text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                                    Find Trains
                                </button>
                            </form>
                        </div>

                        {/* Right Side Background Image */}
                        <div className="hidden lg:block w-[40%] h-[320px] z-10 -ml-4 mt-2 relative">
                            <div className="absolute inset-0 bg-white rounded-2xl blur-md opacity-40"></div>
                            <img
                                src="https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?q=80&w=2070&auto=format&fit=crop"
                                alt="Train journey"
                                className="relative rounded-2xl shadow-lg w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Features Banner */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                    <div className="bg-[#edeefd]/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-indigo-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Feature 1 */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#1e3a8a] flex items-center justify-center shrink-0 shadow-sm">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-.165-.004-.329-.011-.493z" /></svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm">Safety Protocols</h3>
                                    <p className="text-xs text-gray-700 leading-tight mt-0.5 font-medium">Enhanced sanitation, contactless travel.</p>
                                </div>
                            </div>
                            {/* Feature 2 */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#22c55e] flex items-center justify-center shrink-0 shadow-sm">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm">24/7 Monitoring</h3>
                                    <p className="text-xs text-gray-700 leading-tight mt-0.5 font-medium">CCTV surveillance and armed personnel.</p>
                                </div>
                            </div>
                            {/* Feature 3 */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#d97706] flex items-center justify-center shrink-0 shadow-sm">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm">On-Time Performance</h3>
                                    <p className="text-xs text-gray-700 leading-tight mt-0.5 font-medium">Advanced scheduling and punctuality.</p>
                                </div>
                            </div>
                            {/* Feature 4 */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#f59e0b] flex items-center justify-center shrink-0 shadow-sm">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm">Multi-channel Support</h3>
                                    <p className="text-xs text-gray-700 leading-tight mt-0.5 font-medium">Helpline and chat support for you.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AskDISHA Banner */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pb-16">
                    <div className="bg-[#fcedda]/90 backdrop-blur-sm border border-orange-100 rounded-2xl shadow-sm p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-visible">
                        <div className="flex-1">
                            <h2 className="text-lg font-bold text-gray-900 mb-1">AskDISHA: Your Digital Assistant for Booking & Enquiries.</h2>
                            <p className="text-gray-800 font-medium text-sm leading-relaxed max-w-4xl">
                                AskDISHA is our dedicated platform for smooth and simplified ticket bookings. Enjoy a faster, user-friendly experience and plan journey with ease
                            </p>
                        </div>
                        <div className="flex items-center gap-6 shrink-0 z-10">
                            <button className="bg-[#d97706] hover:bg-[#b45309] text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm">
                                Chat with AskDISHA
                            </button>
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-2 border-orange-100 shadow-md">
                                <svg className="w-10 h-10 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1v4h-1a7 7 0 01-7 7H9a7 7 0 01-7-7H1v-4h1a7 7 0 017-7h1V5.73A2 2 0 0112 2zm3 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-6 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};