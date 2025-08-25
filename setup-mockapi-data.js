console.log(`
========================================
   AUTO GARAGE MOCKAPI SETUP GUIDE
========================================

Follow these steps to set up your MockAPI:

1. Go to https://mockapi.io/
2. Create a new project called "auto-garage-management"
3. Create the following 4 resources with the sample data below
4. Update your .env.local file with the correct URL

========================================
`);


const setupData = {
  garages: [
    {
      "tenantId": 1,
      "name": "Gara Minh Tâm",
      "address": "123 Lý Thường Kiệt, Quận 10, TP Hồ Chí Minh",
      "phone": "905123456",
      "email": "minhtam@gmail.com",
      "owner_user_id": 25,
      "is_active": true
    },
    {
      "tenantId": 2,
      "name": "Gara An Phát",
      "address": "45 Nguyễn Văn Linh, Quận Hải Châu, Đà Nẵng",
      "phone": "987654321",
      "email": "anphat@yahoo.com",
      "owner_user_id": 29,
      "is_active": true
    },
    {
      "tenantId": 3,
      "name": "Gara Hoàng Gia",
      "address": "789 Trường Chinh, Quận Đống Đa, Hà Nội",
      "phone": "912345678",
      "email": "hoanggia@outlook.com",
      "owner_user_id": 33,
      "is_active": false
    }
  ],

  vehicles: [
    {
      "id": 90,
      "tenant_id": 101,
      "customer_id": 201,
      "make": "Toyota",
      "model": "Camry",
      "year": 2022,
      "plate_number": "30H-123.45",
      "vin": "1T1BF1FK7N4123456",
      "color": "Midnight Black Metallic",
      "mileage": 45890,
      "ownerName": "Nguyễn Văn An"
    },
    {
      "id": 102,
      "tenant_id": 102,
      "customer_id": 202,
      "make": "Ford",
      "model": "Ranger",
      "year": 2021,
      "plate_number": "29C-987.65",
      "vin": "1FTEX1E83MFA65432",
      "color": "Arctic White",
      "mileage": 32150,
      "ownerName": "Trần Thị Bích"
    },
    {
      "id": 103,
      "tenant_id": 103,
      "customer_id": 203,
      "make": "Honda",
      "model": "Civic",
      "year": 2023,
      "plate_number": "51G-456.78",
      "vin": "19XFC2F59NE123789",
      "color": "Pearl White",
      "mileage": 12500,
      "ownerName": "Lê Văn Cường"
    }
  ],

  "work-orders": [
    {
      "id": 1025,
      "tenant_id": 1,
      "work_order_code": "#RO-1025",
      "vehicle_id": 11,
      "customer_id": 201,
      "status": "pending",
      "initial_notes": "Kiểm tra hệ thống phanh, có tiếng kêu lạ.",
      "estimated_completion_date": "2025-08-04",
      "total_quote_price": null,
      "total_paid_amount": 0,
      "created_by_user_id": 7,
      "created_at": "2025-08-01T09:20:00+07:00",
      "updated_at": "2025-08-01T09:20:00+07:00",
      "completed_at": null,
      "final_check_by_user_id": null,
      "final_check_at": null
    },
    {
      "id": 1026,
      "tenant_id": 1,
      "work_order_code": "#RO-1026",
      "vehicle_id": 12,
      "customer_id": 202,
      "status": "in_progress",
      "initial_notes": "Bảo dưỡng định kỳ 20,000 km.",
      "estimated_completion_date": "2025-08-05",
      "total_quote_price": 2500000,
      "total_paid_amount": 0,
      "created_by_user_id": 7,
      "created_at": "2025-08-01T10:00:00+07:00",
      "updated_at": "2025-08-01T10:00:00+07:00",
      "completed_at": null,
      "final_check_by_user_id": null,
      "final_check_at": null
    },
    {
      "id": 1027,
      "tenant_id": 1,
      "work_order_code": "#RO-1027",
      "vehicle_id": 13,
      "customer_id": 203,
      "status": "waiting_for_approval",
      "initial_notes": "Thay thế động cơ, sửa chữa hệ thống điện.",
      "estimated_completion_date": "2025-08-10",
      "total_quote_price": 15000000,
      "total_paid_amount": 0,
      "created_by_user_id": 7,
      "created_at": "2025-08-01T14:30:00+07:00",
      "updated_at": "2025-08-01T14:30:00+07:00",
      "completed_at": null,
      "final_check_by_user_id": null,
      "final_check_at": null
    }
  ],

  customers: [
    {
      "id": 201,
      "tenant_id": 1,
      "full_name": "Nguyễn Văn An",
      "phone_number": "0901234567",
      "email": "nguyenvanan@gmail.com",
      "address": "123 Đường ABC, Quận 1, TP.HCM",
      "created_at": "2025-01-01T00:00:00Z",
      "updated_at": "2025-01-01T00:00:00Z"
    },
    {
      "id": 202,
      "tenant_id": 1,
      "full_name": "Trần Thị Bích",
      "phone_number": "0902345678",
      "email": "tranthbich@yahoo.com",
      "address": "456 Đường DEF, Quận 3, TP.HCM",
      "created_at": "2025-01-01T00:00:00Z",
      "updated_at": "2025-01-01T00:00:00Z"
    },
    {
      "id": 203,
      "tenant_id": 1,
      "full_name": "Lê Văn Cường",
      "phone_number": "0903456789",
      "email": "levancuong@outlook.com",
      "address": "789 Đường GHI, Quận 5, TP.HCM",
      "created_at": "2025-01-01T00:00:00Z",
      "updated_at": "2025-01-01T00:00:00Z"
    }
  ]
};


function displaySetupInstructions() {
  console.log(`
STEP-BY-STEP SETUP INSTRUCTIONS:
=================================

🔗 1. CREATE MOCKAPI PROJECT
   - Go to: https://mockapi.io/
   - Sign up/Login
   - Click "Create New Project"
   - Name: auto-garage-management

📋 2. CREATE RESOURCES
   Create these 4 resources in your project:
   
   Resource Name: garages
   Resource Name: vehicles
   Resource Name: work-orders
   Resource Name: customers

📝 3. ADD SAMPLE DATA
   For each resource, copy the data below and add as new items:
  `);


  Object.entries(setupData).forEach(([resourceName, data]) => {
    console.log(`\n📊 Resource: ${resourceName}`);
    console.log('=' .repeat(40));
    
    data.forEach((item, index) => {
      console.log(`\nItem ${index + 1}:`);
      console.log(JSON.stringify(item, null, 2));
    });
  });

  console.log(`
🔧 4. UPDATE ENVIRONMENT FILE
   After creating your project, you'll get a URL like:
   https://[YOUR_PROJECT_ID].mockapi.io/api/v1
   
   Update your .env.local file:
   NEXT_PUBLIC_API_URL=https://[YOUR_PROJECT_ID].mockapi.io/api/v1

🚀 5. TEST CONNECTION
   Restart your development server:
   npm run dev
   
   Visit: http://localhost:3000

✅ VERIFICATION CHECKLIST:
   □ MockAPI project created
   □ All 4 resources created (garages, vehicles, work-orders, customers)
   □ Sample data added to each resource
   □ .env.local updated with correct URL
   □ Development server restarted
   □ Application loads data from MockAPI

💡 TROUBLESHOOTING:
   - If you see "Not found" errors, check resource names (case-sensitive)
   - If no data loads, verify your MockAPI URL in .env.local
   - If CORS errors, MockAPI handles CORS automatically
   - Always restart dev server after changing .env.local

📞 NEED HELP?
   - MockAPI Docs: https://mockapi.io/docs
   - Check browser Network tab for API calls
   - Verify data exists in MockAPI dashboard
  `);
}


displaySetupInstructions();


if (typeof module !== 'undefined' && module.exports) {
  module.exports = setupData;
}