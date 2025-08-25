import { FormField } from './form';

export interface Vehicle {
  vehicle_id?: number;
  tenant_id: number;
  plate_number: string;
  customer_id: number;
  make?: string;
  model?: string;
  year?: number;
  color?: string;
  vin_number?: string;
  last_mileage?: number;
  createdAt?: Date;
  updated_at?: Date;
}

export interface VehicleDisplayRow {
  id: number;
  plateNumber: string;
  makeModel: string;
  ownerName: string;
  entryDate: Date;
}

export interface VehicleListResponse {
  data: Vehicle[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface VehicleDetail extends Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  plate_number: string;
  vin: string;
  color: string;
  engineType: string;
  mileage: string;
  notes: string;
  ownerName: string;
  entryDate: Date;
  status: {
    label: string;
    style: string;
  };
  images: {
    main: string;
  };
  repairHistory: RepairHistoryItem[];
}

export interface RepairHistoryItem {
  date: string;
  service: string;
  cost: number;
  technician: string;
}

export const vehicleFormFields: FormField[] = [
  {
    name: 'licensePlate',
    label: 'License Plate',
    type: 'text',
    placeholder: 'e.g., 29A-123.45',
    required: true,
    section: 'vehicle',
  },
  {
    name: 'vin',
    label: 'VIN (Vehicle Identification Number)',
    type: 'text',
    placeholder: '17-digit VIN',
    section: 'vehicle',
  },
  {
    name: 'make',
    label: 'Make',
    type: 'text',
    placeholder: 'e.g., Toyota',
    required: true,
    section: 'vehicle',
  },
  {
    name: 'model',
    label: 'Model',
    type: 'text',
    placeholder: 'e.g., Camry 2.5Q',
    required: true,
    section: 'vehicle',
  },
  {
    name: 'year',
    label: 'Year',
    type: 'number',
    placeholder: 'e.g., 2022',
    section: 'vehicle',
  },
  {
    name: 'color',
    label: 'Color',
    type: 'text',
    placeholder: 'e.g., Black',
    section: 'vehicle',
  },
  {
    name: 'lastMileage',
    label: 'Last Mileage',
    type: 'number',
    placeholder: 'e.g., 12345',
    section: 'vehicle',
  },
  {
    name: 'ownerName',
    label: 'Owner Name',
    type: 'text',
    placeholder: 'Full name',
    required: true,
    section: 'owner',
  },
  {
    name: 'tenant',
    label: 'Tenant',
    type: 'text',
    required: true,
    section: 'owner',
  },
];


export const mockVehicleDetails: VehicleDetail[] = [
  {
    id: 90,
    tenant_id: 101,
    customer_id: 201,
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    plate_number: '30H-123.45',
    vin: '1T1BF1FK7N4123456',
    color: 'Midnight Black Metallic',
    engineType: '2.5L 4-Cylinder',
    mileage: '45,890 km',
    notes: 'Customer reports a slight vibration at high speeds. Check tire balance and alignment. Minor scratch on the rear bumper.',
    ownerName: 'Nguyễn Văn An',
    entryDate: new Date('2025-08-10T08:30:00'),
    status: { label: 'In Service', style: 'warning' },
    images: {
      main: 'https://placehold.co/600x400/000000/FFFFFF/png?text=Toyota+Camry',
    },
    repairHistory: [
      { date: '2024-09-15', service: 'Regular 30,000 km Maintenance', cost: 3500000, technician: 'Lê Minh Tuấn' },
      { date: '2023-10-02', service: 'Oil Change and Tire Rotation', cost: 850000, technician: 'Lê Minh Tuấn' }
    ]
  },
  {
    id: 102,
    tenant_id: 102,
    customer_id: 202,
    make: 'Ford',
    model: 'Ranger',
    year: 2021,
    plate_number: '29C-987.65',
    vin: '1FTEX1E83MFA65432',
    color: 'Arctic White',
    engineType: '2.0L Bi-Turbo Diesel',
    mileage: '67,200 km',
    notes: 'Awaiting new brake pads. Part ordered, expected arrival on Aug 14.',
    ownerName: 'Trần Thị Bích',
    entryDate: new Date('2025-08-11T14:00:00'),
    status: { label: 'Awaiting Parts', style: 'info' },
    images: {
      main: 'https://placehold.co/600x400/FFFFFF/000000/png?text=Ford+Ranger',
    },
    repairHistory: [
      { date: '2024-02-20', service: 'Replaced air filter', cost: 600000, technician: 'Phạm Văn Cường' }
    ]
  }
];