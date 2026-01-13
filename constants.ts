
import { Boat, BoatType, Location } from './types';

export const LOCATIONS: Location[] = [
  { id: 'goa', name: 'Goa', state: 'North/South' },
  { id: 'alleppey', name: 'Alleppey', state: 'Kerala' },
  { id: 'mumbai', name: 'Gateway of India', state: 'Mumbai' },
  { id: 'andaman', name: 'Havelock Island', state: 'Andaman' },
  { id: 'vizag', name: 'Visakhapatnam', state: 'Andhra' },
];

export const MOCK_BOATS: Boat[] = [
  {
    id: '1',
    name: 'Blue Pearl',
    type: BoatType.SPEED_BOAT,
    location: 'Goa',
    pricePerHour: 2500,
    capacity: 6,
    image: 'https://picsum.photos/seed/boat1/600/400',
    captainIncluded: true,
    features: ['Life Jackets', 'Music System', 'Safety Kit'],
    seaToPlateAvailable: false,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Kerala Queen',
    type: BoatType.HOUSEBOAT,
    location: 'Alleppey',
    pricePerHour: 4500,
    capacity: 12,
    image: 'https://picsum.photos/seed/boat2/600/400',
    captainIncluded: true,
    features: ['Bedroom', 'Chef Onboard', 'AC', 'Fresh Lunch'],
    seaToPlateAvailable: true,
    rating: 4.9
  },
  {
    id: '3',
    name: 'Wave Rider',
    type: BoatType.FISHING_BOAT,
    location: 'Andaman',
    pricePerHour: 1800,
    capacity: 4,
    image: 'https://picsum.photos/seed/boat3/600/400',
    captainIncluded: true,
    features: ['Fishing Gear', 'Safety Vest', 'Local Guide'],
    seaToPlateAvailable: true,
    rating: 4.5
  },
  {
    id: '4',
    name: 'Royal Harbor',
    type: BoatType.YACHT,
    location: 'Mumbai',
    pricePerHour: 8000,
    capacity: 10,
    image: 'https://picsum.photos/seed/boat4/600/400',
    captainIncluded: true,
    features: ['Luxury Seating', 'Refreshments', 'Photography'],
    seaToPlateAvailable: false,
    rating: 5.0
  },
  {
    id: '5',
    name: 'Sunset Voyager',
    type: BoatType.MOTOR_BOAT,
    location: 'Goa',
    pricePerHour: 1500,
    capacity: 8,
    image: 'https://picsum.photos/seed/boat5/600/400',
    captainIncluded: true,
    features: ['Cool Box', 'Life Jackets'],
    seaToPlateAvailable: true,
    rating: 4.2
  }
];

export const GST_RATE = 0.18;
export const SEA_TO_PLATE_COST = 1200; // Per person or per session depending on boat
