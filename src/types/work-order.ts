import { FormSection } from './form';

export type WorkOrderStatus =
  | 'pending'
  | 'waiting_for_approval'
  | 'in_progress'
  | 'ready_for_final_check'
  | 'completed'
  | 'paid'
  | 'rejected_by_customer'
  | 'paused';

export interface WorkOrder {
  id: number;
  tenant_id: number;
  work_order_code: string;
  customer_id: number;
  vehicle_id: number;
  status: WorkOrderStatus;
  initial_notes?: string | null;
  estimated_completion_date?: string | null;
  total_quote_price?: number | null;
  total_paid_amount?: number | null;
  created_by_user_id?: number | null;
  created_at?: string;
  updated_at?: string;
  completed_at?: string | null;
  final_check_by_user_id?: number | null;
  final_check_at?: string | null;
}

export interface WorkOrderWithDetails extends WorkOrder {
  customerName?: string;
  vehicleInfo?: string;
  createdByName?: string;
  finalCheckByName?: string;
}

export const KANBAN_COLUMNS: WorkOrderStatus[] = [
  'pending',
  'waiting_for_approval',
  'in_progress',
  'ready_for_final_check',
];

export const ORDER_STATUS_MAP: { value: WorkOrderStatus; label: string; class: string }[] = [
  { value: 'pending', label: 'pending', class: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' },
  { value: 'waiting_for_approval', label: 'waiting for approval', class: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
  { value: 'in_progress', label: 'in progress', class: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' },
  { value: 'ready_for_final_check', label: 'Final check', class: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
  { value: 'completed', label: 'completed', class: 'bg-green-200 text-green-900 dark:bg-green-800 dark:text-green-200' },
  { value: 'paid', label: 'paid', class: 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-200' },
  { value: 'paused', label: 'paused', class: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' }
];

export const orderFormSections: FormSection[] = [
  {
    title: 'Order Info',
    fields: [
      { name: 'tenant_id', label: 'Garage', type: 'text', required: true, placeholder: 'Select garage', section: 'owner' },
      { name: 'work_order_code', label: 'Work Order Code', type: 'text', required: true, placeholder: 'Enter code', section: 'status' },
      { name: 'vehicle_id', label: 'Vehicle', type: 'text', required: true, placeholder: 'Select vehicle', section: 'vehicle' },
      { name: 'customer_id', label: 'Customer', type: 'text', required: true, placeholder: 'Select customer', section: 'owner' },
      {
        name: 'status',
        label: 'Status',
        type: 'select',
        required: true,
        options: ORDER_STATUS_MAP.map(status => ({ value: status.value, label: status.label, class: status.class })),
        placeholder: 'Select status',
        section: 'status'
      },
    ]
  },
  {
    title: 'Details',
    fields: [
      { name: 'initial_notes', label: 'Initial Notes', type: 'textarea', required: false, placeholder: 'Notes from customer', section: 'owner' },
      { name: 'estimated_completion_date', label: 'Estimated Completion Date', type: 'date', required: false, placeholder: 'mm/dd/yyyy', section: 'status' },
      { name: 'total_quote_price', label: 'Total Quote Price', type: 'number', required: false, placeholder: 'Total quote price', section: 'status' },
      { name: 'total_paid_amount', label: 'Total Paid Amount', type: 'number', required: false, placeholder: 'Total paid amount', section: 'status' },
    ]
  },
  {
    title: 'Finalization',
    fields: [
      { name: 'created_by_user_id', label: 'Created By', type: 'text', required: true, placeholder: 'Select user', section: 'owner' },
      { name: 'completed_at', label: 'Completed At', type: 'date', required: false, placeholder: 'Completed at', section: 'status' },
      { name: 'final_check_by_user_id', label: 'Final Check By', type: 'text', required: false, placeholder: 'Select user', section: 'owner' },
      { name: 'final_check_at', label: 'Final Check At', type: 'date', required: false, placeholder: 'Final check at', section: 'status' },
    ]
  }
];


export const mockWorkOrders: WorkOrder[] = [
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
    final_check_at: null,
  },
  {
    id: 1026,
    tenant_id: 1,
    work_order_code: '#RO-1026',
    vehicle_id: 12,
    customer_id: 202,
    status: 'pending',
    initial_notes: 'Bảo dưỡng định kỳ 20,000 km.',
    estimated_completion_date: '2025-08-05',
    total_quote_price: null,
    total_paid_amount: 0,
    created_by_user_id: 7,
    created_at: '2025-08-01T10:00:00+07:00',
    updated_at: '2025-08-01T10:00:00+07:00',
    completed_at: null,
    final_check_by_user_id: null,
    final_check_at: null,
  },
  {
    id: 1024,
    tenant_id: 1,
    work_order_code: '#RO-1024',
    vehicle_id: 13,
    customer_id: 203,
    status: 'in_progress',
    initial_notes: 'Thay thế động cơ, làm lại hệ thống điện.',
    estimated_completion_date: '2025-08-03',
    total_quote_price: null,
    total_paid_amount: 0,
    created_by_user_id: 7,
    created_at: '2025-07-31T15:35:00+07:00',
    updated_at: '2025-08-01T11:00:00+07:00',
    completed_at: null,
    final_check_by_user_id: null,
    final_check_at: null,
  },
  {
    id: 1022,
    tenant_id: 1,
    work_order_code: '#RO-1022',
    vehicle_id: 14,
    customer_id: 204,
    status: 'waiting_for_approval',
    initial_notes: 'Sơn lại cản trước, thay dầu.',
    estimated_completion_date: null,
    total_quote_price: 15500000,
    total_paid_amount: 0,
    created_by_user_id: 7,
    created_at: '2025-07-30T10:10:00+07:00',
    updated_at: '2025-08-01T11:40:00+07:00',
    completed_at: null,
    final_check_by_user_id: null,
    final_check_at: null,
  }
];