import React from 'react';

interface SeatMapProps {
    seats: number[][];
}

export const SeatMap: React.FC<SeatMapProps> = ({ seats }) => {
    return (
        <div className="space-y-2">
            {seats.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-2">
                    {row.map((seat, colIndex) => (
                            <div
                                key={colIndex}
                        title={seat === 0 ? 'Available' : 'Booked'}
                className={`w-9 h-9 flex items-center justify-center rounded text-xs font-semibold border
                                ${seat === 0
                    ? 'bg-green-100 text-green-700 border-green-400'
                    : 'bg-gray-300 text-gray-500 border-gray-400'}`}
            >
            {rowIndex}-{colIndex}
            </div>
    ))}
    </div>
))}
    <div className="flex gap-4 text-xs text-gray-500 mt-2">
    <span className="flex items-center gap-1">
    <span className="w-3 h-3 bg-green-100 border border-green-400 rounded inline-block"></span> Available
        </span>
        <span className="flex items-center gap-1">
    <span className="w-3 h-3 bg-gray-300 border border-gray-400 rounded inline-block"></span> Booked
        </span>
        </div>
        </div>
);
};