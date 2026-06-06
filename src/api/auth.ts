import { apiClient } from './client';

export interface LoginParams {
  phone: string;
  password: string;
}

export interface RegisterParams {
  name: string;
  phone: string;
  password: string;
  email?: string;
  role: 'owner' | 'designer' | 'constructor';
  city?: string;
  designerProfile?: any;
  constructorProfile?: any;
}

export interface AuthResponse {
  token: string;
  user: any;
}

export const authAPI = {
  login: (params: LoginParams) => 
    apiClient.post<AuthResponse>('/auth/login', params),

  register: (params: RegisterParams) => 
    apiClient.post<AuthResponse>('/auth/register', params),

  getCurrentUser: () => 
    apiClient.get<any>('/auth/me'),

  updateProfile: (data: any) => 
    apiClient.put<any>('/auth/profile', data),
};
