const MOCKAPI_BASE_URL = 'https://[YOUR_PROJECT_ID].mockapi.io/api/v1';


const sampleGarages = [
  {
    tenantId: 1,
    name: 'Gara Minh Tâm',
    address: '123 Lý Thường Kiệt, Quận 10, TP Hồ Chí Minh',
    phone: 905123456,
    email: 'minhtam@gmail.com',
    owner_user_id: 25,
    is_active: true
  },
  {
    tenantId: 2,
    name: 'Gara An Phát',
    address: '45 Nguyễn Văn Linh, Quận Hải Châu, Đà Nẵng',
    phone: 987654321,
    email: 'anphat@yahoo.com',
    owner_user_id: 29,
    is_active: true
  },
  {
    tenantId: 3,
    name: 'Gara Hoàng Gia',
    address: '789 Trường Chinh, Quận Đống Đa, Hà Nội',
    phone: 912345678,
    email: 'hoanggia@outlook.com',
    owner_user_id: 33,
    is_active: false
  }
];


const sampleVehicles = [
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
    mileage: 45890,
    ownerName: 'Nguyễn Văn An'
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
    mileage: 32150,
    ownerName: 'Trần Thị Bích'
  }
];


const sampleWorkOrders = [
  {
    id: 1025,
    tenant_id: 1,
    work_order_code: '#RO-1025',
    vehicle_id: 11,
    customer_id: 201,
    status: 'pending',
    initial_notes: 'Kiểm tra hệ thống phanh, có tiếng kêu lạ.',
    estimated_completion_date: '2025-08-04',
    total_quote_price: null,
    total_paid_amount: 0,
    created_by_user_id: 7,
    created_at: '2025-08-01T09:20:00+07:00',
    updated_at: '2025-08-01T09:20:00+07:00',
    completed_at: null,
    final_check_by_user_id: null,
    final_check_at: null
  },
  {
    id: 1026,
    tenant_id: 1,
    work_order_code: '#RO-1026',
    vehicle_id: 12,
    customer_id: 202,
    status: 'in_progress',
    initial_notes: 'Bảo dưỡng định kỳ 20,000 km.',
    estimated_completion_date: '2025-08-05',
    total_quote_price: 2500000,
    total_paid_amount: 0,
    created_by_user_id: 7,
    created_at: '2025-08-01T10:00:00+07:00',
    updated_at: '2025-08-01T10:00:00+07:00',
    completed_at: null,
    final_check_by_user_id: null,
    final_check_at: null
  }
];


const sampleCustomers = [
  {
    id: 201,
    tenant_id: 1,
    full_name: 'Nguyễn Văn An',
    phone_number: '0901234567',
    email: 'nguyenvanan@gmail.com',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 202,
    tenant_id: 1,
    full_name: 'Trần Thị Bích',
    phone_number: '0902345678',
    email: 'tranthbich@yahoo.com',
    address: '456 Đường DEF, Quận 3, TP.HCM',
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z'
  }
];


async function populateMockAPI() {
  console.log('Use this data to populate your MockAPI resources:');
  console.log('\n=== GARAGES ===');
  console.log(JSON.stringify(sampleGarages, null, 2));
  
  console.log('\n=== VEHICLES ===');
  console.log(JSON.stringify(sampleVehicles, null, 2));
  
  console.log('\n=== WORK ORDERS ===');
  console.log(JSON.stringify(sampleWorkOrders, null, 2));
  
  console.log('\n=== CUSTOMERS ===');
  console.log(JSON.stringify(sampleCustomers, null, 2));
}


console.log(`
=== MOCKAPI SETUP INSTRUCTIONS ===

1. Go to https://mockapi.io/ and create an account
2. Create a new project called "auto-garage-management"
3. Create the following resources with their respective sample data:

Resources to create:
- garages
- vehicles  
- work-orders
- customers

4. Copy your MockAPI project URL (e.g., https://65abc123def456789.mockapi.io/api/v1)
5. Update the .env.local file with your actual MockAPI URL
6. Use the sample data below to populate each resource

Note: You can copy-paste each sample data object as a new entry in MockAPI's interface.
`);

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    sampleGarages,
    sampleVehicles,
    sampleWorkOrders,
    sampleCustomers,
    populateMockAPI
  };
}