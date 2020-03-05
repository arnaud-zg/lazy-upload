import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

export enum ContentType {
  FORM_DATA = 'multipart/form-data',
}

interface uploadFilesProps {
  config: AxiosRequestConfig;
  data?: { [key: string]: string };
  fileList: File[];
}

export const uploadFiles = <T = any>({
  config,
  data,
  fileList,
}: uploadFilesProps) => {
  const formData = new FormData();
  if (data) {
    Object.keys(data).forEach(fieldKey => {
      formData.append(fieldKey, data[fieldKey]);
    });
  }
  fileList.forEach(file => {
    formData.append(file.name, file);
  });
  return axios({
    ...config,
    data: formData,
    headers: { 'Content-Type': ContentType.FORM_DATA },
  }) as AxiosPromise<T>;
};
