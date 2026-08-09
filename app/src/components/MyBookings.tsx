import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from "../context/AuthContext.tsx";
import { fetchBookings, cancelBooking } from "../api/userApi.ts";
import { Navbar } from "./Navbar.tsx";
import { format, parseISO } from "date-fns";

export const MyBookings: React.FC = () => {
  const { userId, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [cancelingTicketId, setCancelingTicketId] = useState<string | null>(null);

  const { data: bookings = [], isLoading, isError } = useQuery({
    queryKey: ['bookings', userId],
    queryFn: () => fetchBookings(userId!),
    enabled: !!userId,
  });

  const cancelMutation = useMutation({
    mutationFn: (ticketId: string) => cancelBooking(ticketId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings', userId] });
      setCancelingTicketId(null);
    },
    onError: (error: any) => {
      console.error('Cancel booking failed:', error);
      setCancelingTicketId(null);
    },
  });

  const handleCancel = (ticketId: string) => {
    setCancelingTicketId(ticketId);
    cancelMutation.mutate(ticketId);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-12">

        <div
            className="absolute top-[-5%] left-0 w-full h-[800px] bg-no-repeat bg-cover lg:bg-contain bg-top opacity-40 pointer-events-none mix-blend-multiply z-0"
            style={{ backgroundImage: "url('/assets/my_bookings_background.png')" }}
        ></div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Log In</h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in to view your bookings.
          </p>
          <button
            onClick={() => window.location.href = '/login'}
            className="bg-[#7a20c9] hover:bg-[#6819b0] text-white px-6 py-3 rounded-lg font-medium transition-shadow hover:shadow-md"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7a20c9]"></div>
        <p className="mt-4 text-gray-600">Loading your bookings...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Bookings</h2>
          <p className="text-gray-600 mb-6">
            We couldn't load your bookings. Please try again later.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-[#7a20c9] hover:bg-[#6819b0] text-white px-6 py-3 rounded-lg font-medium transition-shadow hover:shadow-md"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Bookings Yet</h2>
          <p className="text-gray-600 mb-6">
            You haven't booked any tickets yet. Start planning your journey!
          </p>
          <button
            onClick={() => window.location.href = '/search'}
            className="bg-[#7a20c9] hover:bg-[#6819b0] text-white px-6 py-3 rounded-lg font-medium transition-shadow hover:shadow-md"
          >
            Find Trains
          </button>
        </div>
      </div>
    );
  }

  return (
      <div className="min-h-screen bg-[#fcfaf4] relative">
        <div
            className="absolute top-[-5%] left-0 w-full h-[800px] bg-no-repeat bg-cover lg:bg-contain bg-top opacity-40 pointer-events-none mix-blend-multiply z-0"
            style={{ backgroundImage: "url('/assets/my_bookings_background.webp')" }}
        ></div>

        <Navbar />

        <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            My Bookings
          </h1>

        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking.ticketId} className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100">
              <div className="flex flex-col md:flex-row p-6">
                {/* Train Info */}
                <div className="md:w-1/3 mb-4 md:mb-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-[#7a20c9]/10 flex items-center justify-center">
                      <span className="text-[#7a20c9] font-bold">{booking.trainNo?.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Train {booking.trainNo}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {booking.trainId}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex">
                      <span className="font-medium text-gray-600 w-[80px]">From:</span>
                      <span className="text-gray-800">{booking.source}</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium text-gray-600 w-[80px]">To:</span>
                      <span className="text-gray-800">{booking.destination}</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium text-gray-600 w-[80px]">Date:</span>
                      <span className="text-gray-800">
                        {format(parseISO(booking.dateOfTravel), 'dd MMM, yyyy')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="md:w-2/3 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Passengers</p>
                      <p className="font-medium text-gray-800">1 Passenger</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Ticket ID</p>
                      <p className="font-mono text-gray-800">{booking.ticketId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Confirmed
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fare</p>
                      <p className="font-medium text-gray-800">₹{booking.totalFare}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3">
                    {cancelingTicketId === booking.ticketId ? (
                      <button
                        disabled
                        className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg"
                      >
                        Cancelling...
                      </button>
                    ) : (
                      <button
                        onClick={() => handleCancel(booking.ticketId)}
                        className="px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        Cancel Ticket
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};