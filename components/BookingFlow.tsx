
import React, { useState } from 'react';
import { Boat } from '../types';
// Fix: Import constants from constants.ts instead of types.ts
import { GST_RATE, SEA_TO_PLATE_COST } from '../constants';

interface BookingFlowProps {
  boat: Boat;
  onClose: () => void;
  onSuccess: (booking: any) => void;
}

type Step = 'details' | 'addons' | 'payment' | 'confirming';

const BookingFlow: React.FC<BookingFlowProps> = ({ boat, onClose, onSuccess }) => {
  const [step, setStep] = useState<Step>('details');
  const [duration, setDuration] = useState(2);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [seaToPlate, setSeaToPlate] = useState(false);

  const baseTotal = boat.pricePerHour * duration;
  const addonTotal = seaToPlate ? SEA_TO_PLATE_COST : 0;
  const gst = Math.round((baseTotal + addonTotal) * GST_RATE);
  const grandTotal = baseTotal + addonTotal + gst;

  const handlePayment = () => {
    setStep('confirming');
    setTimeout(() => {
      onSuccess({
        boatId: boat.id,
        boatName: boat.name,
        date,
        timeSlot: time,
        durationHours: duration,
        includeSeaToPlate: seaToPlate,
        totalPrice: grandTotal
      });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col md:items-center md:justify-center p-0 md:p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full md:max-w-md bg-white h-full md:h-auto md:rounded-3xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Booking {boat.name}</h2>
            <p className="text-xs text-slate-500">{boat.location} • {boat.type}</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center">
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-4 space-y-6">
          {step === 'details' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div>
                <label className="block text-sm font-semibold mb-2">Select Date</label>
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-sky-500 outline-none" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Preferred Time Slot</label>
                <div className="grid grid-cols-3 gap-2">
                  {['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '05:30 PM'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTime(t)}
                      className={`p-2 rounded-lg text-xs font-medium border transition-colors ${time === t ? 'bg-sky-500 border-sky-500 text-white' : 'border-slate-200 text-slate-600 hover:border-sky-300'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Duration (Hours)</label>
                <div className="flex items-center space-x-4">
                  <button onClick={() => setDuration(Math.max(1, duration - 1))} className="w-10 h-10 border rounded-full flex items-center justify-center">-</button>
                  <span className="text-xl font-bold">{duration} hrs</span>
                  <button onClick={() => setDuration(duration + 1)} className="w-10 h-10 border rounded-full flex items-center justify-center">+</button>
                </div>
              </div>
            </div>
          )}

          {step === 'addons' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="bg-sky-50 border border-sky-100 p-4 rounded-2xl">
                <div className="flex items-start justify-between">
                  <div className="flex-grow pr-4">
                    <h3 className="font-bold text-sky-800 flex items-center">
                      <i className="fas fa-fish-fins mr-2"></i> Sea-to-Plate Experience
                    </h3>
                    <p className="text-xs text-sky-600 mt-1">
                      Includes fresh catch experience, onboard cooking by our crew, and local Kerala/Goan style seafood meal.
                    </p>
                    <p className="text-[10px] text-sky-500 mt-2 italic">
                      * Catch depends on sea conditions. Veg options available.
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-bold text-sky-700">₹{SEA_TO_PLATE_COST}</span>
                    <button 
                      onClick={() => setSeaToPlate(!seaToPlate)}
                      className={`mt-2 px-3 py-1 rounded-full text-xs font-bold transition-all ${seaToPlate ? 'bg-sky-600 text-white' : 'bg-white text-sky-600 border border-sky-200'}`}
                    >
                      {seaToPlate ? 'Added' : 'Add'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 text-sm">Rules & Safety</h4>
                <ul className="text-xs text-slate-500 space-y-1">
                  <li><i className="fas fa-check text-green-500 mr-2"></i> Life jackets mandatory for all</li>
                  <li><i className="fas fa-check text-green-500 mr-2"></i> Max capacity {boat.capacity} strictly followed</li>
                  <li><i className="fas fa-xmark text-rose-500 mr-2"></i> No alcohol/smoking on board</li>
                </ul>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="bg-slate-50 p-4 rounded-2xl space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Base Price ({duration} hrs)</span>
                  <span className="font-medium text-slate-800">₹{baseTotal}</span>
                </div>
                {seaToPlate && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Sea-to-Plate Addon</span>
                    <span className="font-medium text-slate-800">₹{SEA_TO_PLATE_COST}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">GST (18%)</span>
                  <span className="font-medium text-slate-800">₹{gst}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-lg">
                  <span className="text-slate-800">Total Payable</span>
                  <span className="text-sky-600">₹{grandTotal}</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold block">Pay with UPI</label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="border border-slate-200 rounded-xl p-3 flex flex-col items-center hover:border-sky-500 transition-all">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Pay_Logo_%282020%29.svg/512px-Google_Pay_Logo_%282020%29.svg.png" alt="GPay" className="h-6 object-contain mb-1" />
                    <span className="text-[10px] font-bold text-slate-400">Google Pay</span>
                  </button>
                  <button className="border border-slate-200 rounded-xl p-3 flex flex-col items-center hover:border-sky-500 transition-all">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/PhonePe_Logo.svg/512px-PhonePe_Logo.svg.png" alt="PhonePe" className="h-6 object-contain mb-1" />
                    <span className="text-[10px] font-bold text-slate-400">PhonePe</span>
                  </button>
                </div>
                <div className="text-center">
                  <span className="text-xs text-slate-400">Or use other UPI apps</span>
                  <div className="mt-2 flex justify-center space-x-4">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/Paytm_logo.png" className="h-4" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo.png" className="h-4" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 'confirming' && (
            <div className="h-64 flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 border-4 border-sky-100 border-t-sky-500 rounded-full animate-spin"></div>
              <div className="text-center">
                <h3 className="font-bold text-lg">Confirming Payment...</h3>
                <p className="text-sm text-slate-500">Talking to your UPI app</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          {step === 'details' && (
            <button 
              disabled={!date || !time}
              onClick={() => setStep('addons')}
              className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-slate-300 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-sky-100"
            >
              Continue to Experience
            </button>
          )}
          {step === 'addons' && (
            <div className="flex space-x-3">
              <button onClick={() => setStep('details')} className="w-1/3 bg-white border border-slate-200 text-slate-600 font-bold py-4 rounded-2xl">Back</button>
              <button onClick={() => setStep('payment')} className="w-2/3 bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-sky-100">Review & Pay</button>
            </div>
          )}
          {step === 'payment' && (
            <button onClick={handlePayment} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-100 flex items-center justify-center space-x-2">
              <i className="fas fa-lock text-sm"></i>
              <span>Pay ₹{grandTotal} Now</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingFlow;
