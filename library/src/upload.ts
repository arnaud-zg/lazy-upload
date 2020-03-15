import axios, { AxiosRequestConfig, AxiosError } from 'axios';

enum ContentType {
  FORM_DATA = 'multipart/form-data',
}

export interface UploadFilesProps {
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

interface UploadFilesResponse<FileList = FileListGeneric> {
  uploadedFiles: FileList;
  rejectedFiles: File[];
  error?: AxiosError;
}

export const uploadFiles = <FileList = FileListGeneric>({
  config,
  data,
  fileList,
}: UploadFilesProps) => {
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
    ) as Promise<UploadFilesResponse<FileList>>;
};
