export interface Customer {
  id: number;
  tenant_id: number;
  full_name: string;
  phone_number: string;
  email?: string;
  address?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Garage {
  tenantId: number;
  name: string;
  address: string;
  phone: number;
  email: string;
  owner_user_id: number;
  is_active: boolean;
}

export interface GarageDetail {
  tenantId: number;
  name: string;
  address: string;
  phone: number;
  email: string;
  ownerUser: string;
  isActive: boolean;
}


export const mockGarageDetail: GarageDetail = {
  tenantId: 1,
  name: 'auto gara Cầu Giấy',
  address: 'Giải Phóng',
  email: 'dungtvhe163661@gmail.com',
  isActive: true,
  ownerUser: 'Dũngdz',
  phone: 9881896554
};

export const mockGarages: Garage[] = [
  {
    tenantId: 1,
    name: 'Gara Minh Tâm',
    address: '123 Lý Thường Kiệt, Quận 10, TP Hồ Chí Minh',
    phone: 905123456,
    email: 'minhtam@gmail.com',
    owner_user_id: 25,
    is_active: false
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
    name: 'Gara Hồng Phúc',
    address: '78 Lê Lợi, TP Vinh, Nghệ An',
    phone: 978123456,
    email: 'hongphuc@gmail.com',
    owner_user_id: 80,
    is_active: false
  },
  {
    tenantId: 4,
    name: 'Gara Thành Công',
    address: '56 Trần Hưng Đạo, Quận Hoàn Kiếm, Hà Nội',
    phone: 934567890,
    email: 'thanhcong@gmail.com',
    owner_user_id: 86,
    is_active: true
  },
  {
    tenantId: 5,
    name: 'Gara Hoàng Long',
    address: '22 Phạm Văn Đồng, Quận Cầu Giấy, Hà Nội',
    phone: 912345678,
    email: 'hoanglong@gmail.com',
    owner_user_id: 11,
    is_active: false
  }
];