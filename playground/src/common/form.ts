const FAKE_WAITING_UPLOAD_MS = 1500;

interface fakeFileListUploadProps {
  fileList: File[];
}

export const fakeFileListUpload = ({
  fileList
}: fakeFileListUploadProps): Promise<{ config: {} }> => {
  const formData = new FormData();
  fileList.forEach(file => {
    formData.append(file.name, file);
  });
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };

  return new Promise(resolve => {
    setTimeout(() => resolve({ config }), FAKE_WAITING_UPLOAD_MS);
  });
};
