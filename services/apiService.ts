
import { Boat, Booking, Location } from '../types';
import { MOCK_BOATS, LOCATIONS } from '../constants';

// In production, this would be your actual API base URL
const API_BASE_URL = '/api/v1';

/**
 * Note: These methods currently use the constants as a fallback 
 * but are structured to use fetch() once the backend is ready.
 */
export const apiService = {
  // Discovery
  async getLocations(): Promise<Location[]> {
    // const response = await fetch(`${API_BASE_URL}/locations`);
    // return response.json();
    return Promise.resolve(LOCATIONS);
  },

  async getBoats(params: { location?: string; query?: string }): Promise<Boat[]> {
    // const searchParams = new URLSearchParams(params);
    // const response = await fetch(`${API_BASE_URL}/boats?${searchParams}`);
    // return response.json();
    let results = MOCK_BOATS;
    if (params.location && params.location !== 'All Locations') {
      results = results.filter(b => b.location === params.location);
    }
    if (params.query) {
      const q = params.query.toLowerCase();
      results = results.filter(b => b.name.toLowerCase().includes(q) || b.type.toLowerCase().includes(q));
    }
    return Promise.resolve(results);
  },

  // Bookings
  async createBooking(bookingData: Partial<Booking>): Promise<Booking> {
    // const response = await fetch(`${API_BASE_URL}/bookings`, {
    //   method: 'POST',
    //   body: JSON.stringify(bookingData)
    // });
    // return response.json();
    return Promise.resolve({
      ...bookingData,
      id: Math.random().toString(36).substring(2, 11),
      status: 'confirmed'
    } as Booking);
  },

  async getMyBookings(): Promise<Booking[]> {
    // const response = await fetch(`${API_BASE_URL}/bookings/me`);
    // return response.json();
    return Promise.resolve([]); // Initial empty state
  },

  // Owner
  async getOwnerStats() {
    return Promise.resolve({
      earnings: 42500,
      activeBookings: 14,
      growth: 12
    });
  }
};
