import React, { useState } from "react";
import {Navbar} from "./Navbar.tsx";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format, addDays, getDate} from "date-fns";

export const LandingPage: React.FC = ()=>{
    const [source, setSource] = useState('NSLS - Delhi');
    const [destination, setDestination ] = useState('MMCT - Agra');

    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    const nextDay1 = selectedDate ? addDays(selectedDate, 1) : null;
    const nextDay2 = selectedDate ? addDays(selectedDate, 2) : null;

    return(
        <div className="min-h-screen bg-[#f4f7f6] font-sans pb-20">
            <Navbar />

            <div className="text-center mt-12 mb-8">
                <h1 className="text-4xl font-black text-gray-900 tracking-wide flex justify-center items-center gap-3">
                    INDIAN RAILWAYS
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-4.5-6H8V7h4v4zm2-4h2v4h-2V7z" /></svg>
                </h1>
                <div className="flex justify-center items-center space-x-4 mt-3 text-gray-600 font-medium text-sm">
                    <span>Safety</span>
                    <span className="text-gray-300">|</span>
                    <span>Security</span>
                    <span className="text-gray-300">|</span>
                    <span>Punctuality</span>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 relative">
                <div className="relative">
                    <div
                        className="relative h-[450px] w-full bg-cover bg-center rounded-[2.5rem] overflow-hidden"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?q=80&w=2070&auto=format&fit=crop')" }}
                    >
                        <div className="absolute inset-0 bg-black/10"></div>
                    </div>
                </div>

                <div className="absolute bottom-10 left-10 right-10 z-10">
                    <div className="bg-white rounded-[2rem] p-8 shadow-2xl relative flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-md px-2 py-2 flex items-center space-x-2 text-sm font-semibold text-gray-600 border border-gray-100">
                            <button className="px-6 py-2 bg-blue-50 text-blue-700 rounded-full">Train</button>
                            <span className="text-gray-300">|</span>
                            <button className="px-4 py-2 hover:text-blue-600">Flights</button>
                            <span className="text-gray-300">|</span>
                            <button className="px-4 py-2 hover:text-blue-600">Hotels</button>
                            <span className="text-gray-300">|</span>
                            <button className="px-4 py-2 hover:text-blue-600">More..</button>
                        </div>
                        <div className="flex w-full items-center justify-between pt-4">
                            <span className="text-xs text-gray-500 font-semibold mb-1 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                From
                            </span>
                            <input
                                type='text'
                                value={source}
                                onChange={(e)=>setSource((e.target.value))}
                                className='text-xl font-bold text-gray-800 outline-none bg-transparent'
                            />
                        </div>

                        <div className='h-10 w-px bg-gray-300 mx-2'></div>

                        <div className='flex flex-col flex-1 px-4'>
                            <span className="text-xs text-gray-500 font-semibold mb-1 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                To
                            </span>

                            <input
                                type='text'
                                value={destination}
                                onChange={(e)=>setDestination((e.target.value))}
                                className='text-xl font-bold text-gray-800 outline-none bg-transparent'
                            />
                        </div>

                        <div className='h-10 w-px bg-gray-300 mx-2'></div>

                        <div className='flex flex-col flex-1 px-4'>
                            <span className='text-xs text-gray-500 font-semibold mb-1 flex items-center gap-1'>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                Departure Date
                            </span>
                            <div className='flex items-center gap-2'>
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={(date: Date | null) => setSelectedDate(date)}
                                    minDate={new Date()}
                                    customInput={
                                        <button
                                            className="text-xl font-bold text-gray-800 min-w-[125px] text-left hover:text-blue-600 transition-colors">
                                            {selectedDate ? format(selectedDate, "dd MMMM, EEE") : null}
                                        </button>
                                    }
                                />

                                <button onClick={() => setSelectedDate(nextDay1)} className="px-1.5 py-0.5 border border-gray-600 rounded text-sm font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-900 transition-colors">
                                    {nextDay1 ? getDate(nextDay1) : null}
                                </button>

                                <button onClick={() => setSelectedDate(nextDay2)} className="px-1.5 py-0.5 border border-gray-600 rounded text-sm font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-900 transition-colors">
                                    {nextDay2 ? getDate(nextDay2) : null}
                                </button>
                            </div>
                        </div>
                        <button className="bg-[#3b82f6] hover:bg-blue-600 text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg transition-transform transform hover:scale-105">
                            Search Trains
                        </button>
                    </div>
                </div>
            </div>
            <div className="max-w-5xl mx-auto mt-24 flex justify-between items-center px-4">
                <div className='max-w-2xl'>
                    <h2 className='text-2xl font-semibold text-gray-800 mb-2'>
                        Book your tickets easily with AskDISHA - fast, simple and hassle-free.
                    </h2>
                    <p className='text-gray-500 text-sm italic'>
                        AskDISHA is our dedicated platform for smooth and simplified ticket bookings. Enjoy a faster, user-friendly experience and plan your journey with ease
                    </p>
                </div>
                <button className='bg-[#e48c2c] hover:bg-[#d67d1d] text-white font-bold text-lg py-4 px-10 rounded-xl shadow-lg transition-transform transform hover:scale-105'>
                    AskDISHA
                </button>
            </div>
        </div>

    )
}