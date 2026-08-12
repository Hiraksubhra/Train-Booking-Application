import React from 'react';
import { Navbar } from './Navbar';

export const Deals: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fcfaf4]">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Special Deals & Offers
        </h1>

        <div className="space-y-8">
          {/* Current Promotions */}
          <section className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Current Promotions</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-gradient-to-r from-pink-500 to-rose-600">
                  <div className="absolute inset-0 bg-black/20 flex items-end pl-4 pb-4">
                    <h2 className="text-2xl font-bold text-white">Summer Special</h2>
                    <p className="text-sm text-white/90">Up to 30% off</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-800">Delhi to Mumbai</h3>
                  <p className="mt-2 text-gray-600">
                    Enjoy discounted fares on Rajdhani and Shatabdi trains for travel between June-August.
                  </p>
                  <button
                    className="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded"
                  >
                    Book Now
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600">
                  <div className="absolute inset-0 bg-black/20 flex items-end pl-4 pb-4">
                    <h2 className="text-2xl font-bold text-white">Monsoon Offer</h2>
                    <p className="text-sm text-white/90">Flat 25% off</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-800">Bangalore to Goa</h3>
                  <p className="mt-2 text-gray-600">
                    Special monsoon fares to enjoy the scenic Konrail route during the rainy season.
                  </p>
                  <button
                    className="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded"
                  >
                    Book Now
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-gradient-to-r from-emerald-500 to-green-600">
                  <div className="absolute inset-0 bg-black/20 flex items-end pl-4 pb-4">
                    <h2 className="text-2xl font-bold text-white">Student Discount</h2>
                    <p className="text-sm text-white/90">Extra 15% off</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-800">All Routes</h3>
                  <p className="mt-2 text-gray-600">
                    Valid student ID holders get additional discount on all train bookings.
                  </p>
                  <button
                    className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded"
                  >
                    Verify & Book
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Loyalty Program */}
          <section className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">IRCTC Loyalty Program</h2>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-indigo-600 rounded-flex items-center justify-center">
                    <span className="text-white font-bold">LP</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Earn Points on Every Booking</h3>
                  <p className="mt-2 text-gray-600">
                    Join our loyalty program and earn points for every booking. Redeem points for discounts,
                    free meals, and exclusive access to premium lounges.
                  </p>
                  <div className="mt-4 space-x-3">
                    <button
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded"
                    >
                      Join Now
                    </button>
                    <button
                      className="border border-indigo-300 hover:border-indigo-400 text-indigo-600 hover:text-indigo-700 py-2 px-4 rounded"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};