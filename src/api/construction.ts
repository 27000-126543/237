import { apiClient } from './client';

export const constructionAPI = {
  createConstruction: (params: any) => 
    apiClient.post<any>('/construction', params),

  getConstructions: (params?: any) => 
    apiClient.get<any>('/construction', params),

  getConstructionById: (id: string) => 
    apiClient.get<any>(`/construction/${id}`),

  submitBid: (id: string, params: any) => 
    apiClient.post<any>(`/construction/${id}/bid`, params),

  selectConstructor: (id: string, bidId: string) => 
    apiClient.post<any>(`/construction/${id}/select-constructor`, { bidId }),

  signContract: (id: string, signature: string) => 
    apiClient.post<any>(`/construction/${id}/sign-contract`, { signature }),

  updateProgress: (id: string, progressId: string, data: any) => 
    apiClient.post<any>(`/construction/${id}/progress`, { progressId, ...data }),

  uploadPhoto: (id: string, data: any) => 
    apiClient.post<any>(`/construction/${id}/photos`, data),

  submitReport: (id: string, data: any) => 
    apiClient.post<any>(`/construction/${id}/reports`, data),

  submitAcceptance: (id: string) => 
    apiClient.post<any>(`/construction/${id}/submit-acceptance`),

  confirmAcceptance: (id: string, data: any) => 
    apiClient.post<any>(`/construction/${id}/confirm-acceptance`, data),
};
