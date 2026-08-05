import React, { useState, useRef, useEffect } from "react";

interface StationAutocompleteProps {
    value: string;
    onChange: (value: string) => void;
    stations: string[];
    placeholder?: string;
    icon?:React.ReactNode;
}

export const StationAutocomplete: React.FC<StationAutocompleteProps> = ({
    value, onChange, stations, placeholder, icon
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const filtered = value.trim()
        ? stations.filter(s => s.toLowerCase().startsWith(value.trim().toLowerCase()))
        : stations;

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if(containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return(
        <div ref={containerRef} className='relative'>
            <div className='flex items-center gap-2 bg-[#f4f2ff] border border-[#e5e0ff] rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-purple-400 transition-all'>
                {icon}
                <input
                    type='text'
                    value={value}
                    onChange={(e) => { onChange(e.target.value); setIsOpen(true); }}
                    onFocus={() => setIsOpen(true)}
                    className='w-full focus:outline-none text-gray-800 text-sm bg-transparent font-medium'
                    placeholder={placeholder}
                    autoComplete="off"
                />
            </div>

            {isOpen && filtered.length > 0 && (
                <ul className='absolute z-20 mt-1 w-full max-h-56 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg'>
                    {filtered.map((station)=>(
                        <li
                            key={station}
                            onClick={() => {onChange(station); setIsOpen(false)}}
                            className = 'px-3 py-2 text-sm text-gray-700 hover:bg-[#f4f2ff] cursor-pointer'
                        >
                            {station}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
