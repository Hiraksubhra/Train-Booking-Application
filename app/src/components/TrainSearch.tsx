import React, { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchSchedule, searchTrains } from "../api/trainApi";
import { useAuth } from "../context/AuthContext.tsx";
import { BookingRequest } from "../types";
import { bookTicket } from "../api/userApi.ts";
import { fetchStations } from "../api/trainApi";
import { SeatMap } from "./SeatMap.tsx";
import { Navbar } from "./Navbar.tsx";
import { format, parseISO } from "date-fns";
import { Pencil, ArrowRight, Utensils, Wifi, SearchX } from 'lucide-react';
import { toast } from 'sonner';
import {StationAutocomplete} from "./StationAutocomplete.tsx";

export const TrainSearch: React.FC = () => {
    const [searchParams] = useSearchParams();
    const urlSource = searchParams.get('source') || '';
    const urlDestination = searchParams.get('destination') || '';
    const urlDate = searchParams.get('date') || '';

    const [source, setSource] = useState(urlSource);
    const [destination, setDestination] = useState(urlDestination);
    const [travelDate, setTravelDate] = useState(urlDate);
    const [triggerSearch, setTriggerSearch] = useState(!!(urlSource && urlDestination));
    const [isEditingSearch, setIsEditingSearch] = useState(!(urlSource && urlDestination));

    const [selectedTrainId, setSelectedTrainId] = useState<string | null>(null);
    const [seatCount, setSeatCount] = useState(1);

    const { userId, isAuthenticated } = useAuth();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (urlSource && urlDestination) {
            setTriggerSearch(true);
            setIsEditingSearch(false);
        }
    }, [urlSource, urlDestination]);

    const { data: trains, isLoading, isError } = useQuery({
        queryKey: ['trains', source, destination],
        queryFn: () => searchTrains(source, destination),
        enabled: triggerSearch && !!source && !!destination,
    });

    const { data: schedule, isLoading: scheduleLoading, isError: scheduleError } = useQuery({
        queryKey: ['schedule', selectedTrainId, travelDate],
        queryFn: () => fetchSchedule(selectedTrainId!, travelDate),
        enabled: !!selectedTrainId && !!travelDate,
    });

    const bookingMutation = useMutation({
        mutationFn: (request: BookingRequest) => bookTicket(userId!, request),
        onSuccess: (ticket) => {
            toast.success(`Booked! Ticket ${ticket.ticketId} - total fare ₹${ticket.totalFare}`);
            queryClient.invalidateQueries({ queryKey: ['schedule', selectedTrainId, travelDate] });
        },
        onError: (error: any) => {
            const message = error?.response?.data || "Booking failed. Please try again.";
            toast.error(message);
        },
    });

    const { data: stations = [] } = useQuery({
        queryKey: ['stations'],
        queryFn: fetchStations,
        staleTime: Infinity,
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setTriggerSearch(true);
        setIsEditingSearch(false);
        setSelectedTrainId(null);
    };

    const handleSelectTrain = (trainId: string) => {
        setSelectedTrainId(trainId === selectedTrainId ? null : trainId);
    };

    const handleBook = (trainId: string) => {
        if (!isAuthenticated || !userId) {
            toast.error('Please log in to book a ticket.');
            return;
        }
        bookingMutation.mutate({ trainId, source, destination, dateOfTravel: travelDate, seatCount });
    };

    const displayDate = travelDate ? format(parseISO(travelDate), "dd MMMM, EEEE") : "";

    return (
        <div className="min-h-screen bg-[#fcfaf4] font-sans">

            <div
                className="absolute top-[-5%] left-0 w-full h-[800px] bg-no-repeat bg-cover lg:bg-contain bg-top opacity-40 pointer-events-none mix-blend-multiply z-0"
                style={{ backgroundImage: "url('/assets/train_search_background.png')" }}
            ></div>

            <Navbar />

            <div className="max-w-6xl mx-auto mt-6 px-4 pb-12">
                {/* Top Purple Summary Bar */}
                {!isEditingSearch && triggerSearch && (
                    <div className="bg-gradient-to-r from-[#7a20c9] to-[#5b1796] text-white p-4 rounded-t-xl shadow flex justify-between items-center mb-4">
                        <div className="text-lg font-medium flex items-center gap-3">
                            {source} <ArrowRight className="w-5 h-5 opacity-70" /> {destination} <span className="opacity-50">|</span> {displayDate}
                        </div>
                        <button
                            onClick={() => setIsEditingSearch(true)}
                            className="p-2 hover:bg-white/20 rounded-full transition"
                            title="Edit Search"
                        >
                            <Pencil className="w-5 h-5 text-white" />
                        </button>
                    </div>
                )}

                {/* Edit Search Form */}
                {isEditingSearch && (
                    <div className="relative z-20 mb-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6 border border-gray-100">
                        <form onSubmit={handleSearch} className="flex gap-4 items-end">
                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">From</label>
                                <StationAutocomplete
                                    value={source}
                                    onChange={setSource}
                                    stations={stations}
                                    placeholder="Delhi"
                                    icon={<svg className="w-4 h-4 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">To</label>
                                <StationAutocomplete
                                    value={destination}
                                    onChange={setDestination}
                                    stations={stations}
                                    placeholder="Agra"
                                    icon={<svg className="w-4 h-4 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date</label>
                                <div className="flex items-center gap-2 bg-[#f4f2ff] border border-[#e5e0ff] rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-purple-400 transition-all">
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    <input
                                        type="date"
                                        value={travelDate}
                                        onChange={(e) => setTravelDate(e.target.value)}
                                        className="w-full focus:outline-none text-gray-800 text-sm bg-transparent font-medium"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="px-8 bg-[#7a20c9] hover:bg-[#6819b0] text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md shrink-0"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                                Modify Search
                            </button>
                        </form>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Sidebar Filters */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-5">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Filters</h3>
                            <div className="mb-6">
                                <h4 className="text-sm font-semibold text-gray-700 mb-3">Class</h4>
                                <div className="space-y-2">
                                    {['1A', '2A', '3A', 'SL'].map((cls) => (
                                        <label key={cls} className="flex items-center text-sm text-gray-600 cursor-pointer">
                                            <input type="checkbox" className="mr-3 h-4 w-4 text-[#7a20c9] rounded border-gray-300 focus:ring-[#7a20c9]" />
                                            {cls}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Train Results */}
                    <div className="md:col-span-3">
                        {isLoading && <div className="text-center py-10 text-gray-500 font-medium">Searching for trains...</div>}
                        {isError && <div className="text-center py-10 text-red-500 font-medium">Failed to fetch trains. Please try again.</div>}

                        {trains && trains.length > 0 && (
                            <>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold text-gray-800">{trains.length} Available Trains</h2>
                                </div>

                                <div className="space-y-4">
                                    {trains.map((train) => (
                                        <div key={train.trainId} className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 overflow-hidden">
                                            <div className="p-6">
                                                <div className="flex justify-between items-start mb-4">
                                                    <h3 className="text-xl font-bold text-[#5b1796] tracking-wide">
                                                        {train.trainNo} | EXPRESS
                                                    </h3>
                                                    <div className="flex gap-3 text-gray-400">
                                                        <Utensils className="w-5 h-5" />
                                                        <Wifi className="w-5 h-5" />
                                                    </div>
                                                </div>

                                                <div className="flex items-center text-sm text-gray-700 mb-6 font-medium">
                                                    <span className="text-gray-900">Departs:</span> <span className="ml-1 mr-4 text-[#7a20c9]">{source}</span>
                                                    <span className="text-gray-300 mr-4">|</span>
                                                    <span className="text-gray-500 mr-4">Route: {train.stations.join(' ➔ ')}</span>
                                                    <span className="text-gray-300 mr-4">|</span>
                                                    <span className="text-gray-900">Arrives:</span> <span className="ml-1 text-[#7a20c9]">{destination}</span>
                                                </div>

                                                <div className="flex justify-between items-end">
                                                    <div className="flex gap-3">
                                                        <div className="px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-md text-sm font-bold shadow-sm">
                                                            [CC] Avail: Check Map
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={() => handleSelectTrain(train.trainId)}
                                                        disabled={!travelDate}
                                                        className="px-6 py-2.5 bg-[#7a20c9] text-white font-semibold rounded-lg hover:bg-[#6819b0] transition shadow-md disabled:opacity-50"
                                                    >
                                                        {selectedTrainId === train.trainId ? 'Hide Details' : 'Select & Continue'}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Booking Section Expansion */}
                                            {selectedTrainId === train.trainId && travelDate && (
                                                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-6">
                                                    {schedule ? (
                                                        <div className="animate-fade-in-down">
                                                            <div className="flex justify-between items-center mb-4">
                                                                <h4 className="font-bold text-gray-800">Select Your Seats</h4>
                                                                <span className="bg-[#edeefd] text-[#7a20c9] px-4 py-1.5 rounded-full text-sm font-bold border border-indigo-100">
                                                                    Fare: ₹{schedule.price} / seat
                                                                </span>
                                                            </div>

                                                            <div className="bg-white p-4 rounded-xl border border-gray-200 mb-5 overflow-x-auto shadow-sm">
                                                                <SeatMap seats={schedule.seats} />
                                                            </div>

                                                            <div className="flex items-center justify-between bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                                                                <label className="text-sm font-bold text-gray-700 flex items-center gap-3">
                                                                    Passengers:
                                                                    <input
                                                                        type="number"
                                                                        min={1}
                                                                        value={seatCount}
                                                                        onChange={(e) => setSeatCount(Math.max(1, parseInt(e.target.value) || 1))}
                                                                        className="w-20 p-2.5 bg-[#f4f2ff] border border-[#e5e0ff] rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                                                                    />
                                                                </label>
                                                                <div className="flex items-center gap-6">
                                                                    <div className="text-right">
                                                                        <div className="text-xs text-gray-500 font-medium">Total Amount</div>
                                                                        <div className="text-xl font-black text-[#5b1796]">₹{schedule.price * seatCount}</div>
                                                                    </div>
                                                                    <button
                                                                        onClick={() => handleBook(train.trainId)}
                                                                        disabled={bookingMutation.isPending}
                                                                        className="px-8 py-3 bg-[#d97706] text-white font-bold rounded-lg shadow-md hover:bg-[#b45309] transition disabled:opacity-50"
                                                                    >
                                                                        {bookingMutation.isPending ? 'Processing...' : 'Book Now'}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        scheduleLoading ? (
                                                            <div className="text-center py-10">Loading schedule...</div>
                                                        ) : scheduleError ? (
                                                            <div className="text-center py-10 text-red-500">Failed to load schedule.</div>
                                                        ) : null
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {trains && trains.length === 0 && (
                            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-12 text-center mt-6">
                                <SearchX className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No Trains Found</h3>
                                <p className="text-gray-500 font-medium">We couldn't find any trains running on this route for the selected date.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};