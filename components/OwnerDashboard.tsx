
import React, { useState } from 'react';
import { Boat, BoatType } from '../types';

const OwnerDashboard: React.FC = () => {
  const [boats, setBoats] = useState<Boat[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Owner Dashboard</h1>
          <p className="text-sm text-slate-500">Manage your boats and bookings</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-sky-500 text-white px-4 py-2 rounded-xl font-bold text-sm"
        >
          + Add Boat
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="text-slate-500 text-sm font-medium">Monthly Earnings</div>
          <div className="text-3xl font-black text-slate-800 mt-1">₹42,500</div>
          <div className="text-green-500 text-xs mt-1">+12% from last month</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="text-slate-500 text-sm font-medium">Active Bookings</div>
          <div className="text-3xl font-black text-slate-800 mt-1">14</div>
          <div className="text-sky-500 text-xs mt-1">3 happening today</div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-bold text-lg">Your Boat Listings</h2>
        {boats.length === 0 ? (
          <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-3xl p-12 text-center text-slate-400">
            <i className="fas fa-ship text-4xl mb-4 opacity-20"></i>
            <p>You haven't listed any boats yet.</p>
            <button 
              onClick={() => setShowAddForm(true)}
              className="mt-4 text-sky-500 font-bold hover:underline"
            >
              Get started now
            </button>
          </div>
        ) : (
          <div className="space-y-3">
             {/* List boats here */}
          </div>
        )}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60" onClick={() => setShowAddForm(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-3xl p-6">
            <h2 className="text-xl font-bold mb-4">Add Your Boat</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Boat Name (e.g. Goa Queen)" className="w-full border p-3 rounded-xl" />
              <select className="w-full border p-3 rounded-xl">
                <option>Select Boat Type</option>
                {Object.values(BoatType).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="Price / Hr (₹)" className="w-full border p-3 rounded-xl" />
                <input type="number" placeholder="Capacity" className="w-full border p-3 rounded-xl" />
              </div>
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="w-4 h-4" />
                <span>Offer Sea-to-Plate Experience?</span>
              </label>
              <button className="w-full bg-sky-500 text-white font-bold py-3 rounded-xl mt-4">
                List My Boat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
