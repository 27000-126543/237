import { apiClient } from './client';

export const adminAPI = {
  getDashboardStats: (params?: any) => 
    apiClient.get<any>('/admin/dashboard/stats', params),

  getTrendData: (params?: any) => 
    apiClient.get<any>('/admin/dashboard/trend', params),

  getRankings: (params?: any) => 
    apiClient.get<any>('/admin/dashboard/rankings', params),

  getAnalytics: (params?: any) => 
    apiClient.get<any>('/admin/analytics', params),

  getPredictions: (params?: any) => 
    apiClient.get<any>('/admin/predictions', params),

  getConstructionMonitor: (params?: any) => 
    apiClient.get<any>('/admin/construction/monitor', params),
};

export const reportAPI = {
  exportMonthlyExcel: (params?: any) => 
    `/api/reports/monthly/excel?${new URLSearchParams(params).toString()}`,

  exportMonthlyPDF: (params?: any) => 
    `/api/reports/monthly/pdf?${new URLSearchParams(params).toString()}`,

  exportDesignerExcel: (params?: any) => 
    `/api/reports/designer/excel?${new URLSearchParams(params).toString()}`,

  exportDesignerPDF: (params?: any) => 
    `/api/reports/designer/pdf?${new URLSearchParams(params).toString()}`,

  exportConstructorExcel: (params?: any) => 
    `/api/reports/constructor/excel?${new URLSearchParams(params).toString()}`,

  exportConstructorPDF: (params?: any) => 
    `/api/reports/constructor/pdf?${new URLSearchParams(params).toString()}`,

  exportMaterialExcel: (params?: any) => 
    `/api/reports/material/excel?${new URLSearchParams(params).toString()}`,

  exportMaterialPDF: (params?: any) => 
    `/api/reports/material/pdf?${new URLSearchParams(params).toString()}`,
};
