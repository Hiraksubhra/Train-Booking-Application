import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchTrains } from "../api/trainApi";

export const TrainSearch: React.FC = () =>{
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [triggerSearch, setTriggerSearch] = useState(false);

    const { data : trains, isLoading, isError } = useQuery({
        queryKey: ['trains', source, destination],
        queryFn: () => searchTrains(source, destination),
        enabled: triggerSearch && !!source && !!destination,
    });

    const handleSearch = (e : React.SubmitEvent)=>{
        e.preventDefault();
        setTriggerSearch(true);
    };

    return(
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Search Trains</h2>

            <form onSubmit={handleSearch} className="flex gap-4 mb-8">
                <input
                type="text"
                placeholder="Source Station"
                className="flex-1 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={source}
                onChange={(e)=>{setSource(e.target.value); setTriggerSearch(false);}}
                />
                <input
                type="text"
                placeholder="Destination Station"
                className="flex-1 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={destination}
                onChange={(e)=>{setDestination(e.target.value); setTriggerSearch(false);}}
                />
                <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
                >
                    Search
                </button>
            </form>

            {isLoading && <p className="text-gray-500">Searching for trains...</p>}
            {isError && <p className="text-red-500">Failed to fetch trains. </p>}

            {trains && trains.length > 0 && (
                <div className="space-y-4">
                    {trains.map((train)=>(
                        <div key={train.trainId} className="p-4 border rounded shadow-sm hover:shadow-md transition">
                        <h3 className="text-xl font-bold text-gray-800">{train.trainNo}</h3>
                        <p className="text-gray-600">Route: {train.stations.join(' ➔ ')}</p>
                        </div>
                    ))}
                </div>
            )}
            {trains && trains.length === 0 && (
                <p className="text-gray-500">No trains found for this route</p>
            )}
        </div>
    );
};