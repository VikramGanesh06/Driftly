
export enum BoatType {
  SPEED_BOAT = 'Speed Boat',
  FIBRE_BOAT = 'Fibre Boat',
  HOUSEBOAT = 'Houseboat',
  FISHING_BOAT = 'Fishing Boat',
  YACHT = 'Small Yacht',
  MOTOR_BOAT = 'Motor Boat'
}

export interface Boat {
  id: string;
  name: string;
  type: BoatType;
  location: string;
  pricePerHour: number;
  capacity: number;
  image: string;
  captainIncluded: boolean;
  features: string[];
  seaToPlateAvailable: boolean;
  rating: number;
}

export interface Booking {
  id: string;
  boatId: string;
  boatName: string;
  date: string;
  timeSlot: string;
  durationHours: number;
  includeSeaToPlate: boolean;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export type AppMode = 'user' | 'owner';

export interface Location {
  id: string;
  name: string;
  state: string;
}
