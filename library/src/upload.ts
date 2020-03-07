import axios, { AxiosRequestConfig, AxiosError } from 'axios';

export enum ContentType {
  FORM_DATA = 'multipart/form-data',
}

interface uploadFilesProps {
  config: AxiosRequestConfig;
  data?: { [key: string]: string };
  fileList: File[];
}

interface Files {
  [fileName: string]: File;
}

interface FileListGeneric {
  files: Files;
}

export interface uploadFilesResponse<FileList = FileListGeneric> {
  uploadedFiles: FileList;
  rejectedFiles: File[];
  error?: AxiosError;
}

export const uploadFiles = <FileList = FileListGeneric>({
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
  })
    .then(({ data }: { data: FileListGeneric }) => ({
      uploadedFiles: data,
      rejectedFiles: [],
    }))
    .catch((error: AxiosError) =>
      Promise.reject({
        uploadedFiles: {},
        rejectedFiles: fileList,
        error,
      })
    ) as Promise<uploadFilesResponse<FileList>>;
};
