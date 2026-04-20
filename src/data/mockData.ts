import { 
  Vehicle, Driver, Booking, Trip, Invoice, Customer, OperationalStats 
} from '../types';

export const stats: OperationalStats = {
  readyVehicles: 45,
  activeVehicles: 112,
  driversCount: 108,
  maintenanceCount: 12,
  todayTrips: 156,
  onTimeRate: 94.5,
  fuelCost: 12400000,
  safetyAlerts: 3
};

export const vehicles: Vehicle[] = [
  { id: '1', plate: '51A-123.45', type: 'Truck', driver: 'Nguyễn Văn A', status: 'Active', inspectionDate: '2026-10-12', mileage: 14500 },
  { id: '2', plate: '51C-678.90', type: 'Van', driver: 'Trần Văn B', status: 'Ready', inspectionDate: '2026-08-20', mileage: 8200 },
  { id: '3', plate: '51F-555.22', type: 'SUV', driver: 'Lê Văn C', status: 'Maintenance', inspectionDate: '2026-04-15', mileage: 22000 },
  { id: '4', plate: '51G-111.88', type: 'Sedan', driver: 'Phạm Minh D', status: 'Active', inspectionDate: '2026-12-01', mileage: 11000 },
  { id: '5', plate: '51H-999.00', type: 'Truck', driver: 'Hoàng Văn E', status: 'Active', inspectionDate: '2026-09-18', mileage: 16700 },
];

export const drivers: Driver[] = [
  { id: 'd1', name: 'Nguyễn Văn A', phone: '0901234567', email: 'vana@fleetflow.com', license: 'B2', licenseNumber: 'G1234567', status: 'Active', currentVehicle: '51A-123.45', rating: 4.8 },
  { id: 'd2', name: 'Trần Văn B', phone: '0907654321', email: 'vanb@fleetflow.com', license: 'C', licenseNumber: 'G7654321', status: 'Ready', currentVehicle: null, rating: 4.5 },
  { id: 'd3', name: 'Lê Văn C', phone: '0912123123', email: 'vanc@fleetflow.com', license: 'FC', licenseNumber: 'G1122334', status: 'Off', currentVehicle: null, rating: 4.9 },
  { id: 'd4', name: 'Phạm Minh D', phone: '0988888888', email: 'minhd@fleetflow.com', license: 'B2', licenseNumber: 'G8888888', status: 'Active', currentVehicle: '51G-111.88', rating: 4.2 },
];

export const bookings: Booking[] = [
  { id: 'b1', bookingCode: 'BK-2026-001', customerName: 'FPT Software', vehiclePlate: '51A-123.45', startDate: '2026-04-20', endDate: '2026-04-25', status: 'In Progress', totalPrice: 15000000 },
  { id: 'b2', bookingCode: 'BK-2026-002', customerName: 'VinFast', vehiclePlate: '51G-111.88', startDate: '2026-04-18', endDate: '2026-04-22', status: 'Confirmed', totalPrice: 8000000 },
  { id: 'b3', bookingCode: 'BK-2026-003', customerName: 'Logistics VN', vehiclePlate: '51H-999.00', startDate: '2026-04-10', endDate: '2026-04-12', status: 'Completed', totalPrice: 12500000 },
  { id: 'b4', bookingCode: 'BK-2026-004', customerName: 'Giao Hàng Nhanh', vehiclePlate: '51C-678.90', startDate: '2026-04-25', endDate: '2026-04-30', status: 'Pending Payment', totalPrice: 22000000 },
];

export const trips: Trip[] = [
  { id: 't1', tripCode: 'TR-1001', bookingCode: 'BK-2026-001', driverName: 'Nguyễn Văn A', route: 'Quận 1 - Thủ Đức', departureTime: '2026-04-20 08:00', status: 'Moving', incidents: 0 },
  { id: 't2', tripCode: 'TR-1002', bookingCode: 'BK-2026-003', driverName: 'Hoàng Văn E', route: 'Quận 7 - Bình Dương', departureTime: '2026-04-10 14:00', status: 'Completed', incidents: 1 },
  { id: 't3', tripCode: 'TR-1003', bookingCode: 'BK-2026-002', driverName: 'Phạm Minh D', route: 'Tân Bình - Quận 9', departureTime: '2026-04-18 09:30', status: 'Idle', incidents: 0 },
];

export const invoices: Invoice[] = [
  { id: 'inv1', invoiceCode: 'INV-2026-001', bookingCode: 'BK-2026-003', customerName: 'Logistics VN', amount: 12500000, issueDate: '2026-04-13', dueDate: '2026-04-27', status: 'Paid' },
  { id: 'inv2', invoiceCode: 'INV-2026-002', bookingCode: 'BK-2026-001', customerName: 'FPT Software', amount: 15000000, issueDate: '2026-04-20', dueDate: '2026-05-04', status: 'Pending' },
  { id: 'inv3', invoiceCode: 'INV-2026-003', bookingCode: 'BK-2026-004', customerName: 'Giao Hàng Nhanh', amount: 22000000, issueDate: '2026-04-15', dueDate: '2026-04-30', status: 'Deposit Paid' },
];

export const customers: Customer[] = [
  { id: 'c1', customerCode: 'CUS-001', name: 'FPT Software', type: 'Business', tripsCount: 45, totalSpend: 850000000, tier: 'VIP' },
  { id: 'c2', customerCode: 'CUS-002', name: 'VinFast', type: 'Business', tripsCount: 12, totalSpend: 230000000, tier: 'Gold' },
  { id: 'c3', customerCode: 'CUS-003', name: 'Nguyễn Minh Quân', type: 'Personal', tripsCount: 2, totalSpend: 15000000, tier: 'Standard' },
];

export const revenueData = [
  { name: 'Thứ 2', revenue: 45000000, cost: 32000000 },
  { name: 'Thứ 3', revenue: 52000000, cost: 38000000 },
  { name: 'Thứ 4', revenue: 48000000, cost: 35000000 },
  { name: 'Thứ 5', revenue: 61000000, cost: 42000000 },
  { name: 'Thứ 6', revenue: 55000000, cost: 39000000 },
  { name: 'Thứ 7', revenue: 67000000, cost: 45000000 },
  { name: 'Chủ Nhật', revenue: 59000000, cost: 41000000 },
];

export const fleetStatusData = [
  { name: 'Sẵn sàng', value: 45 },
  { name: 'Đang chạy', value: 112 },
  { name: 'Bảo dưỡng', value: 12 },
];
