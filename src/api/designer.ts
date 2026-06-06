import { apiClient } from './client';

export interface MatchParams {
  styles: string[];
  budget: number;
  area: number;
  city?: string;
}

export const designerAPI = {
  getDesigners: (params?: any) => 
    apiClient.get<any>('/designers', params),

  getDesignerById: (id: string) => 
    apiClient.get<any>(`/designers/${id}`),

  matchDesigners: (params: MatchParams) => 
    apiClient.post<any>('/designers/match', params),

  getDesignerReviews: (id: string, params?: any) => 
    apiClient.get<any>(`/designers/${id}/reviews`, params),
};
