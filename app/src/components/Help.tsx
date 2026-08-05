import React from 'react';

export const Help: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Help & Support
        </h1>

        <div className="space-y-8">
          {/* FAQ Section */}
          <section className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border-b py-4">
                <h3 className="font-medium text-gray-700">How do I book a train ticket?</h3>
                <p className="mt-2 text-gray-600">
                  Simply enter your departure and arrival stations, select your travel date, and click "Search Trains".
                  Choose from the available trains, select your preferred class and number of passengers, then proceed to payment.
                </p>
              </div>

              <div className="border-b py-4">
                <h3 className="font-medium text-gray-700">What payment methods are accepted?</h3>
                <p className="mt-2 text-gray-600">
                  We accept all major credit/debit cards, net banking, UPI, and popular mobile wallets for secure transactions.
                </p>
              </div>

              <div className="border-b py-4">
                <h3 className="font-medium text-gray-700">How can I cancel or modify my booking?</h3>
                <p className="mt-2 text-gray-600">
                  You can cancel or modify your booking from the "My Bookings" section. Please note that cancellation charges
                  may apply as per the railway rules and the time of cancellation.
                </p>
              </div>

              <div className="border-b py-4">
                <h3 className="font-medium text-gray-700">Is my personal information secure?</h3>
                <p className="mt-2 text-gray-600">
                  Yes, we use industry-standard encryption and security measures to protect your personal and payment information.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">Customer Support</h3>
                <p className="text-gray-600">
                  <span className="font-medium">Phone:</span> 1800-111-321 (Toll Free)<br />
                  <span className="font-medium">Email:</span> support@irctc.example.com<br />
                  <span className="font-medium">Available:</span> 24x7
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">Feedback & Suggestions</h3>
                <p className="text-gray-600">
                  We value your feedback! Share your suggestions to help us improve our services.
                </p>
                <button
                  className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded"
                >
                  Send Feedback
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};