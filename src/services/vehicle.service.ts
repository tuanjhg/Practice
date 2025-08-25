import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BaseApiService } from './base.service';
import { Vehicle, VehicleDetail, VehicleListResponse } from '@/types/vehicle';

class VehicleApiService extends BaseApiService {
  constructor() {
    super('/vehicles');
  }

  async getVehicles(params?: {
    page?: number;
    limit?: number;
    search?: string;
    tenant_id?: number;
  }): Promise<VehicleListResponse> {
    const queryParams: any = {};
    if (params?.page) queryParams.page = params.page;
    if (params?.limit) queryParams.limit = params.limit;
    if (params?.search) queryParams.search = params.search;
    if (params?.tenant_id) queryParams.tenant_id = params.tenant_id;

    const response = await this.get<VehicleDetail[]>('', { params: queryParams });
    
    return {
      data: response,
      pagination: {
        currentPage: params?.page || 1,
        totalPages: Math.ceil(response.length / (params?.limit || 10)),
        totalItems: response.length,
        itemsPerPage: params?.limit || 10,
      },
    };
  }

  async getVehicle(id: number): Promise<VehicleDetail> {
    return this.get<VehicleDetail>(`/${id}`);
  }

  async createVehicle(vehicle: Omit<Vehicle, 'vehicle_id'>): Promise<Vehicle> {
    return this.post<Vehicle>('', vehicle);
  }

  async updateVehicle(id: number, vehicle: Partial<Vehicle>): Promise<Vehicle> {
    return this.put<Vehicle>(`/${id}`, vehicle);
  }

  async deleteVehicle(id: number): Promise<void> {
    return this.delete<void>(`/${id}`);
  }
}


const vehicleService = new VehicleApiService();


export const useVehicles = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  tenant_id?: number;
}) => {
  return useQuery({
    queryKey: ['vehicles', params],
    queryFn: () => vehicleService.getVehicles(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useVehicle = (id: number) => {
  return useQuery({
    queryKey: ['vehicle', id],
    queryFn: () => vehicleService.getVehicle(id),
    enabled: !!id,
  });
};

export const useCreateVehicle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (vehicle: Omit<Vehicle, 'vehicle_id'>) => vehicleService.createVehicle(vehicle),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
  });
};

export const useUpdateVehicle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, vehicle }: { id: number; vehicle: Partial<Vehicle> }) => 
      vehicleService.updateVehicle(id, vehicle),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      queryClient.invalidateQueries({ queryKey: ['vehicle'] });
    },
  });
};

export const useDeleteVehicle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => vehicleService.deleteVehicle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
  });
};