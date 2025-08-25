import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BaseApiService } from './base.service';
import { WorkOrder, WorkOrderWithDetails, WorkOrderStatus } from '@/types/work-order';

class WorkOrderApiService extends BaseApiService {
  constructor() {
    super('/work-orders');
  }

  async getWorkOrders(params?: {
    page?: number;
    limit?: number;
    status?: WorkOrderStatus;
    tenant_id?: number;
  }): Promise<{ data: WorkOrderWithDetails[]; total: number }> {
    const queryParams: any = {};
    if (params?.page) queryParams.page = params.page;
    if (params?.limit) queryParams.limit = params.limit;
    if (params?.status) queryParams.status = params.status;
    if (params?.tenant_id) queryParams.tenant_id = params.tenant_id;

    const response = await this.get<WorkOrder[]>('', { params: queryParams });
    
    const workOrdersWithDetails: WorkOrderWithDetails[] = response.map(order => ({
      ...order,
      customerName: `Customer ${order.customer_id}`,
      vehicleInfo: `Vehicle ${order.vehicle_id}`,
      createdByName: `User ${order.created_by_user_id}`,
      finalCheckByName: order.final_check_by_user_id ? `User ${order.final_check_by_user_id}` : undefined,
    }));

    return {
      data: workOrdersWithDetails,
      total: workOrdersWithDetails.length,
    };
  }

  async getWorkOrder(id: number): Promise<WorkOrderWithDetails> {
    const order = await this.get<WorkOrder>(`/${id}`);
    
    const orderWithDetails: WorkOrderWithDetails = {
      ...order,
      customerName: `Customer ${order.customer_id}`,
      vehicleInfo: `Vehicle ${order.vehicle_id}`,
      createdByName: `User ${order.created_by_user_id}`,
      finalCheckByName: order.final_check_by_user_id ? `User ${order.final_check_by_user_id}` : undefined,
    };
    
    return orderWithDetails;
  }

  async createWorkOrder(workOrder: Omit<WorkOrder, 'id' | 'created_at' | 'updated_at'>): Promise<WorkOrder> {
    return this.post<WorkOrder>('', workOrder);
  }

  async updateWorkOrder(id: number, workOrder: Partial<WorkOrder>): Promise<WorkOrder> {
    return this.put<WorkOrder>(`/${id}`, workOrder);
  }

  async updateWorkOrderStatus(id: number, status: WorkOrderStatus): Promise<WorkOrder> {
    return this.patch<WorkOrder>(`/${id}/status`, { status });
  }

  async deleteWorkOrder(id: number): Promise<void> {
    return this.delete<void>(`/${id}`);
  }


  async getKanbanData(tenant_id?: number): Promise<Record<WorkOrderStatus, WorkOrderWithDetails[]>> {
    const { data } = await this.getWorkOrders({ tenant_id, limit: 100 });
    
    const kanbanData: Record<WorkOrderStatus, WorkOrderWithDetails[]> = {
      pending: [],
      waiting_for_approval: [],
      in_progress: [],
      ready_for_final_check: [],
      completed: [],
      paid: [],
      rejected_by_customer: [],
      paused: [],
    };

    data.forEach(order => {
      kanbanData[order.status].push(order);
    });

    return kanbanData;
  }
}


const workOrderService = new WorkOrderApiService();


export const useWorkOrders = (params?: {
  page?: number;
  limit?: number;
  status?: WorkOrderStatus;
  tenant_id?: number;
}) => {
  return useQuery({
    queryKey: ['work-orders', params],
    queryFn: () => workOrderService.getWorkOrders(params),
    staleTime: 2 * 60 * 1000,
  });
};

export const useWorkOrder = (id: number) => {
  return useQuery({
    queryKey: ['work-order', id],
    queryFn: () => workOrderService.getWorkOrder(id),
    enabled: !!id,
  });
};

export const useKanbanData = (tenant_id?: number) => {
  return useQuery({
    queryKey: ['kanban-data', tenant_id],
    queryFn: () => workOrderService.getKanbanData(tenant_id),
    staleTime: 60 * 1000,
    refetchInterval: 30 * 1000,
  });
};

export const useCreateWorkOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (workOrder: Omit<WorkOrder, 'id' | 'created_at' | 'updated_at'>) => 
      workOrderService.createWorkOrder(workOrder),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work-orders'] });
      queryClient.invalidateQueries({ queryKey: ['kanban-data'] });
    },
  });
};

export const useUpdateWorkOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, workOrder }: { id: number; workOrder: Partial<WorkOrder> }) => 
      workOrderService.updateWorkOrder(id, workOrder),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work-orders'] });
      queryClient.invalidateQueries({ queryKey: ['work-order'] });
      queryClient.invalidateQueries({ queryKey: ['kanban-data'] });
    },
  });
};

export const useUpdateWorkOrderStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: WorkOrderStatus }) => 
      workOrderService.updateWorkOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work-orders'] });
      queryClient.invalidateQueries({ queryKey: ['work-order'] });
      queryClient.invalidateQueries({ queryKey: ['kanban-data'] });
    },
  });
};

export const useDeleteWorkOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => workOrderService.deleteWorkOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work-orders'] });
      queryClient.invalidateQueries({ queryKey: ['kanban-data'] });
    },
  });
};