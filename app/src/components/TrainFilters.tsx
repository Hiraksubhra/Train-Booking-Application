import React from 'react';

export interface TrainFiltersProps {
    selectedClasses?: string[];
    onToggleClass?: (cls: string) => void;
    selectedQuotas?: string[];
    onToggleQuota?: (quota: string) => void;
    selectedTimes?: string[];
    onToggleTime?: (time: string) => void;
}

export const TrainFilters: React.FC<TrainFiltersProps> = ({
    selectedClasses = [],
    onToggleClass = ()=>{},
    selectedQuotas = [],
    onToggleQuota = () => {},
    selectedTimes = [],
    onToggleTime = () => {}
})=>{
    const classes = ['1A', '2A', '3A', 'SL'];
    const quotas = ['General', 'Tatkal'];
    const departureTimes = ['Morning', 'Afternoon', 'Evening'];

    return (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-5">Filters</h3>

            {/* Class Filter */}
            <div className="mb-6">
                <h4 className="text-sm font-bold text-gray-800 mb-3">Class</h4>
                <div className="space-y-2.5">
                    {classes.map((cls) => (
                        <label key={cls} className="flex items-center text-sm text-gray-700 cursor-pointer hover:text-gray-900">
                            <input
                                type="checkbox"
                                checked={selectedClasses.includes(cls)}
                                onChange={() => onToggleClass(cls)}
                                className="mr-3 h-4 w-4 text-[#3b82f6] rounded border-gray-300 focus:ring-[#3b82f6] cursor-pointer"
                            />
                            {cls}
                        </label>
                    ))}
                </div>
            </div>

            <hr className="border-gray-100 mb-6" />

            {/* Quota Filter */}
            <div className='mb-6'>
                <h4 className='text-sm font-bold text-gray-800 mb-3'>Quota</h4>
                <div className="space-y-2.5">
                    {quotas.map((quota) => (
                        <label key={quota} className="flex items-center text-sm text-gray-700 cursor-pointer hover:text-gray-900">
                            <input
                                type="checkbox"
                                checked={selectedQuotas.includes(quota)}
                                onChange={() => onToggleQuota(quota)}
                                className="mr-3 h-4 w-4 text-[#3b82f6] rounded border-gray-300 focus:ring-[#3b82f6] cursor-pointer"
                            />
                            {quota}
                        </label>
                    ))}
                </div>
            </div>

            <hr className="border-gray-100 mb-6" />

            {/* Departure Time Filter */}
            <div className="mb-6">
                <h4 className="text-sm font-bold text-gray-800 mb-3">Departure Time</h4>
                <div className="space-y-2.5">
                    {departureTimes.map((time) => (
                        <label key={time} className="flex items-center text-sm text-gray-700 cursor-pointer hover:text-gray-900">
                            <input
                                type="checkbox"
                                checked={selectedTimes.includes(time)}
                                onChange={() => onToggleTime(time)}
                                className="mr-3 h-4 w-4 text-[#3b82f6] rounded border-gray-300 focus:ring-[#3b82f6] cursor-pointer"
                            />
                            {time}
                        </label>
                    ))}
                </div>
            </div>

            <hr className="border-gray-100 mb-6" />

            {/* Duration Filter */}
            <div className="mb-2">
                <h4 className="text-sm font-bold text-gray-800 mb-3">Duration</h4>
                <select className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] cursor-pointer">
                    <option value="">Any Duration</option>
                    <option value="under_4">Under 4 Hours</option>
                    <option value="4_to_8">4 - 8 Hours</option>
                    <option value="over_8">Over 8 Hours</option>
                </select>
            </div>
        </div>
    )
}