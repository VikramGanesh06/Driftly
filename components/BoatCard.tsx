
import React from 'react';
import { Boat } from '../types';

interface BoatCardProps {
  boat: Boat;
  onBook: (boat: Boat) => void;
}

const BoatCard: React.FC<BoatCardProps> = ({ boat, onBook }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col">
      <div className="relative h-48">
        <img src={boat.image} alt={boat.name} className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold flex items-center shadow-sm">
          <i className="fas fa-star text-amber-400 mr-1"></i>
          {boat.rating}
        </div>
        {boat.seaToPlateAvailable && (
          <div className="absolute bottom-3 left-3 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
            Sea-to-Plate Available
          </div>
        )}
      </div>
      
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-lg text-slate-800">{boat.name}</h3>
          <span className="text-sky-600 font-bold">₹{boat.pricePerHour}<span className="text-xs font-normal text-slate-400">/hr</span></span>
        </div>
        
        <p className="text-slate-500 text-sm mb-3">
          <i className="fas fa-location-dot mr-1"></i> {boat.location} • {boat.type}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="bg-sky-50 text-sky-600 px-2 py-1 rounded text-xs">
            <i className="fas fa-users mr-1"></i> Max {boat.capacity}
          </div>
          {boat.captainIncluded && (
            <div className="bg-sky-50 text-sky-600 px-2 py-1 rounded text-xs">
              <i className="fas fa-user-tie mr-1"></i> Captain included
            </div>
          )}
        </div>
      </div>

      <div className="p-4 pt-0">
        <button 
          onClick={() => onBook(boat)}
          className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-sky-100"
        >
          <span>Book Now</span>
          <i className="fas fa-chevron-right text-xs"></i>
        </button>
      </div>
    </div>
  );
};

export default BoatCard;
