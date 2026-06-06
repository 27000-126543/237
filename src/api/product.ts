import { apiClient } from './client';

export const productAPI = {
  getProducts: (params?: any) => 
    apiClient.get<any>('/products', params),

  getProductById: (id: string) => 
    apiClient.get<any>(`/products/${id}`),

  getRelatedProducts: (id: string, params?: any) => 
    apiClient.get<any>(`/products/${id}/related`, params),
};
