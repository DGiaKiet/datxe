export type VehicleStatus = 'Ready' | 'Active' | 'Maintenance';
export type DriverStatus = 'Active' | 'Ready' | 'Off';
export type BookingStatus = 'In Progress' | 'Confirmed' | 'Completed' | 'Pending Payment';
export type TripStatus = 'Moving' | 'Completed' | 'Idle';
export type InvoiceStatus = 'Paid' | 'Pending' | 'Deposit Paid';
export type CustomerType = 'Business' | 'Personal';
export type MembershipTier = 'VIP' | 'Gold' | 'Standard';

export interface Vehicle {
  id: string;
  plate: string;
  type: 'Truck' | 'Van' | 'Sedan' | 'SUV';
  driver: string;
  status: VehicleStatus;
  inspectionDate: string;
  mileage: number;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  email: string;
  license: string;
  licenseNumber: string;
  status: DriverStatus;
  currentVehicle: string | null;
  rating: number;
}

export interface Booking {
  id: string;
  bookingCode: string;
  customerName: string;
  vehiclePlate: string;
  startDate: string;
  endDate: string;
  status: BookingStatus;
  totalPrice: number;
}

export interface Trip {
  id: string;
  tripCode: string;
  bookingCode: string;
  driverName: string;
  route: string;
  departureTime: string;
  status: TripStatus;
  incidents: number;
}

export interface Invoice {
  id: string;
  invoiceCode: string;
  bookingCode: string;
  customerName: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
}

export interface Customer {
  id: string;
  customerCode: string;
  name: string;
  type: CustomerType;
  tripsCount: number;
  totalSpend: number;
  tier: MembershipTier;
}

export interface OperationalStats {
  readyVehicles: number;
  activeVehicles: number;
  driversCount: number;
  maintenanceCount: number;
  todayTrips: number;
  onTimeRate: number;
  fuelCost: number;
  safetyAlerts: number;
}
