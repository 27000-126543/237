import { apiClient } from './client';

export interface CreateOrderParams {
  type: 'design' | 'material' | 'construction' | 'full';
  items: any[];
  totalAmount: number;
  designerId?: string;
  address?: any;
  houseInfo?: any;
  remark?: string;
}

export const orderAPI = {
  createOrder: (params: CreateOrderParams) => 
    apiClient.post<any>('/orders', params),

  getOrders: (params?: any) => 
    apiClient.get<any>('/orders', params),

  getOrderById: (id: string) => 
    apiClient.get<any>(`/orders/${id}`),

  payOrder: (id: string, data?: any) => 
    apiClient.post<any>(`/orders/${id}/pay`, data),

  cancelOrder: (id: string, reason?: string) => 
    apiClient.post<any>(`/orders/${id}/cancel`, { reason }),

  generateMaterialList: (params: any) => 
    apiClient.post<any>('/orders/material-list', params),
};
