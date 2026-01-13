
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BoatCard from './components/BoatCard';
import BookingFlow from './components/BookingFlow';
import OwnerDashboard from './components/OwnerDashboard';
import { Boat, AppMode, Booking, Location } from './types';
import { apiService } from './services/apiService';
import { getLocalInsights } from './services/geminiService';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('user');
  const [locations, setLocations] = useState<Location[]>([]);
  const [boats, setBoats] = useState<Boat[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBoat, setSelectedBoat] = useState<Boat | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showMyBookings, setShowMyBookings] = useState(false);
  const [aiTip, setAiTip] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTip, setIsLoadingTip] = useState(false);

  // Initial Data Fetch
  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      try {
        const [locData, boatData, myBookings] = await Promise.all([
          apiService.getLocations(),
          apiService.getBoats({}),
          apiService.getMyBookings()
        ]);
        setLocations(locData);
        setBoats(boatData);
        setBookings(myBookings);
      } catch (err) {
        console.error("Failed to load initial data", err);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  // Filtered Boat Fetch (Simulates API Query)
  useEffect(() => {
    const fetchFiltered = async () => {
      const data = await apiService.getBoats({ 
        location: selectedLocation, 
        query: searchQuery 
      });
      setBoats(data);
    };
    fetchFiltered();
  }, [selectedLocation, searchQuery]);

  // AI Insights Fetch
  useEffect(() => {
    if (selectedLocation !== 'All Locations') {
      setIsLoadingTip(true);
      getLocalInsights(selectedLocation)
        .then(tip => setAiTip(tip))
        .finally(() => setIsLoadingTip(false));
    } else {
      setAiTip('');
    }
  }, [selectedLocation]);

  const handleBookingSuccess = async (bookingData: any) => {
    try {
      const newBooking = await apiService.createBooking(bookingData);
      setBookings(prev => [newBooking, ...prev]);
      setSelectedBoat(null);
      setShowMyBookings(true);
    } catch (err) {
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header 
        mode={mode} 
        setMode={setMode} 
        onOpenBookings={() => setShowMyBookings(true)} 
      />

      <main className="flex-grow">
        {mode === 'user' ? (
          <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
            {/* Search & Filter */}
            <section className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                  <input 
                    type="text" 
                    placeholder="Search speed boats, yachts..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-4 rounded-2xl border-none shadow-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                  />
                </div>
                <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                  <button 
                    onClick={() => setSelectedLocation('All Locations')}
                    className={`whitespace-nowrap px-6 py-3 rounded-2xl text-sm font-semibold transition-all ${selectedLocation === 'All Locations' ? 'bg-sky-500 text-white shadow-lg shadow-sky-100' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-sky-300'}`}
                  >
                    All India
                  </button>
                  {locations.map(loc => (
                    <button 
                      key={loc.id}
                      onClick={() => setSelectedLocation(loc.name)}
                      className={`whitespace-nowrap px-6 py-3 rounded-2xl text-sm font-semibold transition-all ${selectedLocation === loc.name ? 'bg-sky-500 text-white shadow-lg shadow-sky-100' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-sky-300'}`}
                    >
                      {loc.name}
                    </button>
                  ))}
                </div>
              </div>

              {aiTip && (
                <div className="bg-sky-50 border border-sky-100 p-5 rounded-3xl flex items-start space-x-4 animate-in fade-in zoom-in duration-500">
                  <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-sky-200">
                    <i className="fas fa-wand-magic-sparkles"></i>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-[10px] font-black text-sky-800 uppercase tracking-widest">Driftly AI Assistant</h4>
                      {isLoadingTip && <i className="fas fa-circle-notch animate-spin text-sky-300 text-xs"></i>}
                    </div>
                    <p className="text-sm text-sky-700 leading-relaxed whitespace-pre-line">
                      {aiTip}
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* Boat Listings */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                  {selectedLocation === 'All Locations' ? 'Top Rated Boats' : `Boats in ${selectedLocation}`}
                </h2>
                <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-1 rounded-full">{boats.length} Results</span>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1,2,3].map(i => (
                    <div key={i} className="bg-white rounded-2xl h-80 animate-pulse border border-slate-100"></div>
                  ))}
                </div>
              ) : boats.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {boats.map(boat => (
                    <BoatCard 
                      key={boat.id} 
                      boat={boat} 
                      onBook={setSelectedBoat} 
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm">
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                    <i className="fas fa-ship text-4xl opacity-20"></i>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">No boats available right now</h3>
                  <p className="text-slate-500 mt-2 max-w-xs mx-auto text-sm">We couldn't find any boats matching your criteria. Try widening your search.</p>
                </div>
              )}
            </section>
          </div>
        ) : (
          <OwnerDashboard />
        )}
      </main>

      {/* Overlays */}
      {selectedBoat && (
        <BookingFlow 
          boat={selectedBoat} 
          onClose={() => setSelectedBoat(null)} 
          onSuccess={handleBookingSuccess} 
        />
      )}

      {showMyBookings && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowMyBookings(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl animate-in slide-in-from-right duration-300 p-8 overflow-y-auto">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-black text-slate-800 tracking-tighter">Your Sea Log</h2>
              <button onClick={() => setShowMyBookings(false)} className="w-12 h-12 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-all">
                <i className="fas fa-times text-slate-600"></i>
              </button>
            </div>

            {bookings.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center">
                  <i className="fas fa-compass text-3xl text-sky-200 animate-pulse"></i>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Your anchor is down</h3>
                  <p className="text-sm text-slate-400 mt-1 px-10">You don't have any upcoming trips. Let's find you a boat!</p>
                </div>
                <button 
                  onClick={() => setShowMyBookings(false)}
                  className="bg-sky-500 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-sky-100"
                >
                  Browse Boats
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings.map(booking => (
                  <div key={booking.id} className="group border border-slate-100 rounded-3xl p-5 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-1">
                        <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">Trip Ready</span>
                        <h3 className="font-bold text-xl text-slate-800 group-hover:text-sky-600 transition-colors">{booking.boatName}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Rupees</p>
                        <p className="font-black text-2xl text-slate-800 tracking-tight">₹{booking.totalPrice}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-600 mb-5 bg-slate-50 p-3 rounded-2xl">
                      <i className="far fa-calendar-alt text-sky-500"></i>
                      <span className="font-medium">{booking.date}</span>
                      <span className="text-slate-300">•</span>
                      <i className="far fa-clock text-sky-500"></i>
                      <span className="font-medium">{booking.timeSlot}</span>
                    </div>
                    {booking.includeSeaToPlate && (
                      <div className="flex items-center text-xs text-emerald-600 font-bold mb-5 px-1">
                        <div className="w-6 h-6 bg-emerald-50 rounded-full flex items-center justify-center mr-2">
                          <i className="fas fa-utensils text-[10px]"></i>
                        </div>
                        Sea-to-Plate Dining Included
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                      <button className="bg-sky-500 text-white text-xs font-bold py-3 rounded-xl shadow-lg shadow-sky-100">
                        View Ticket
                      </button>
                      <button className="bg-slate-50 text-slate-600 text-xs font-bold py-3 rounded-xl border border-slate-100">
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-12 p-8 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-3xl text-white shadow-xl">
              <h4 className="font-bold text-lg mb-2">Need a local hand?</h4>
              <p className="text-xs text-sky-100 opacity-90 leading-relaxed mb-6">Our 24/7 support is ready to help you with your voyage across Indian waters.</p>
              <div className="flex space-x-3">
                <button className="flex-1 bg-white/20 backdrop-blur hover:bg-white/30 py-3 rounded-2xl flex items-center justify-center transition-all">
                  <i className="fab fa-whatsapp text-lg"></i>
                </button>
                <button className="flex-1 bg-white text-sky-600 py-3 rounded-2xl font-bold text-sm shadow-lg">
                  Call Support
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Support (Mobile) */}
      <div className="fixed bottom-8 right-8 z-30 md:hidden">
        <button className="w-16 h-16 bg-sky-500 text-white rounded-full shadow-2xl shadow-sky-300 flex items-center justify-center text-2xl animate-bounce">
          <i className="fab fa-whatsapp"></i>
        </button>
      </div>

      <footer className="bg-white border-t border-slate-100 py-16 px-6 mt-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <i className="fas fa-anchor"></i>
                </div>
                <span className="text-2xl font-black text-slate-800 tracking-tighter">Driftly</span>
              </div>
              <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                Empowering Indian boat owners and creating unforgettable sea experiences. 
                From the backwaters of Kerala to the shores of Andaman.
              </p>
            </div>
            <div className="space-y-4">
              <h5 className="font-bold text-slate-800 uppercase text-xs tracking-widest">Popular Hubs</h5>
              <ul className="text-slate-500 text-sm space-y-2">
                <li className="hover:text-sky-500 cursor-pointer">Goa Water Sports</li>
                <li className="hover:text-sky-500 cursor-pointer">Alleppey Houseboats</li>
                <li className="hover:text-sky-500 cursor-pointer">Mumbai Harbor Rides</li>
                <li className="hover:text-sky-500 cursor-pointer">Andaman Snorkeling</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="font-bold text-slate-800 uppercase text-xs tracking-widest">Partner</h5>
              <ul className="text-slate-500 text-sm space-y-2">
                <li className="hover:text-sky-500 cursor-pointer">List your Boat</li>
                <li className="hover:text-sky-500 cursor-pointer">Safety Guidelines</li>
                <li className="hover:text-sky-500 cursor-pointer">Partner Login</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="flex space-x-6">
                <i className="fab fa-instagram text-slate-300 hover:text-pink-500 text-xl cursor-pointer"></i>
                <i className="fab fa-facebook text-slate-300 hover:text-blue-600 text-xl cursor-pointer"></i>
                <i className="fab fa-twitter text-slate-300 hover:text-sky-400 text-xl cursor-pointer"></i>
             </div>
             <p className="text-slate-300 text-[10px] font-medium tracking-widest uppercase">
               © 2024 Driftly India Technologies Pvt Ltd.
             </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
