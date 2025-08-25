# MockAPI Integration Guide

## Overview
This guide helps you migrate from mock data to real API calls using MockAPI.io for the Auto Garage Management System.

## Prerequisites
- MockAPI.io account (free)
- Basic understanding of REST APIs

## Step-by-Step Setup

### 1. Create MockAPI Account
1. Visit [MockAPI.io](https://mockapi.io/)
2. Sign up for a free account
3. Create a new project named `auto-garage-management`

### 2. Create API Resources
Create the following resources in your MockAPI project:

#### Resource: `garages`
**Endpoint:** `/garages`
**Sample Schema:**
```json
{
  "tenantId": "number",
  "name": "string", 
  "address": "string",
  "phone": "number",
  "email": "string",
  "owner_user_id": "number",
  "is_active": "boolean"
}
```

#### Resource: `vehicles`
**Endpoint:** `/vehicles`
**Sample Schema:**
```json
{
  "id": "number",
  "tenant_id": "number", 
  "customer_id": "number",
  "make": "string",
  "model": "string",
  "year": "number",
  "plate_number": "string",
  "vin": "string",
  "color": "string",
  "mileage": "number",
  "ownerName": "string"
}
```

#### Resource: `work-orders`
**Endpoint:** `/work-orders`
**Sample Schema:**
```json
{
  "id": "number",
  "tenant_id": "number",
  "work_order_code": "string",
  "vehicle_id": "number", 
  "customer_id": "number",
  "status": "string",
  "initial_notes": "string",
  "estimated_completion_date": "string",
  "total_quote_price": "number",
  "total_paid_amount": "number",
  "created_by_user_id": "number",
  "created_at": "string",
  "updated_at": "string",
  "completed_at": "string",
  "final_check_by_user_id": "number",
  "final_check_at": "string"
}
```

#### Resource: `customers`
**Endpoint:** `/customers`
**Sample Schema:**
```json
{
  "id": "number",
  "tenant_id": "number",
  "full_name": "string",
  "phone_number": "string", 
  "email": "string",
  "address": "string",
  "created_at": "string",
  "updated_at": "string"
}
```

### 3. Populate Sample Data
Use the data from `mockapi-setup.js` to populate your resources. For each resource:

1. In MockAPI dashboard, click on the resource name
2. Click "Add Item" 
3. Copy the sample data from the setup file
4. Paste and save
5. Repeat for all items

### 4. Configure Environment
1. Copy your MockAPI project URL (format: `https://[project-id].mockapi.io/api/v1`)
2. Update `.env.local` file:
```bash
NEXT_PUBLIC_API_URL=https://your-project-id.mockapi.io/api/v1
```

### 5. Test the Integration
1. Start your development server:
```bash
npm run dev
```

2. Navigate to different pages to verify data loads from MockAPI:
   - `/garages` - Should show garages from MockAPI
   - `/vehicles` - Should show vehicles from MockAPI  
   - `/orders` - Should show work orders from MockAPI

## API Endpoints Summary

| Resource | Endpoint | Methods |
|----------|----------|---------|
| Garages | `/garages` | GET, POST, PUT, DELETE |
| Vehicles | `/vehicles` | GET, POST, PUT, DELETE |
| Work Orders | `/work-orders` | GET, POST, PUT, PATCH, DELETE |
| Customers | `/customers` | GET, POST, PUT, DELETE |

## Code Changes Made

### Services Updated
- `work-order.service.ts` - Now uses real API calls
- `vehicle.service.ts` - Now uses real API calls  
- `garage.service.ts` - Now uses real API calls
- `base.service.ts` - Updated base URL to use MockAPI

### Key Changes
1. Removed mock data imports
2. Replaced `setTimeout` promises with actual HTTP calls
3. Added proper error handling
4. Maintained existing interfaces and response formats

## Troubleshooting

### Common Issues

**Issue: CORS Errors**
- MockAPI automatically handles CORS, but if you see CORS errors, check your browser's network tab for the actual error

**Issue: 404 Not Found**
- Verify your MockAPI URL is correct in `.env.local`
- Ensure resource names match exactly (case-sensitive)
- Check that resources are created in MockAPI dashboard

**Issue: Data Not Loading**
- Verify you have sample data in your MockAPI resources
- Check browser network tab to see if API calls are being made
- Ensure `.env.local` is in your project root

**Issue: Environment Variables Not Working**
- Restart your development server after changing `.env.local`
- Ensure the file is named exactly `.env.local` (not `.env.local.txt`)
- Verify the variable name starts with `NEXT_PUBLIC_`

### Development Tips

1. **MockAPI Dashboard**: Use the MockAPI web interface to manually add/edit/delete items for testing

2. **Network Tab**: Use browser DevTools Network tab to monitor API calls and responses

3. **Console Logs**: Check browser console for any JavaScript errors

4. **Postman/Thunder Client**: Test your MockAPI endpoints directly before integrating

## Next Steps

1. **Authentication**: MockAPI doesn't require auth, but your production API might. The current code includes auth token handling in the request interceptor.

2. **Pagination**: MockAPI supports pagination through query parameters (`page`, `limit`). The current code sends these parameters.

3. **Search/Filtering**: MockAPI supports basic filtering. You can extend the query parameters as needed.

4. **Production Migration**: When ready for production, simply update `NEXT_PUBLIC_API_URL` to point to your real backend API.

## Support

- MockAPI Documentation: https://mockapi.io/docs
- GitHub Issues: Create an issue in the project repository
- Development Team: Contact your development team for project-specific questions