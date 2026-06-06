import { apiClient } from './client';

export const uploadAPI = {
  uploadImage: (file: File, type: string = 'general') => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('type', type);
    return apiClient.upload<any>('/upload/image', formData);
  },

  uploadImages: (files: FileList | File[], type: string = 'general') => {
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('images', file);
    });
    formData.append('type', type);
    return apiClient.upload<any>('/upload/images', formData);
  },
};
