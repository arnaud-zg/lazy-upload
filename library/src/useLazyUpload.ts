import React, { useState, useCallback } from 'react';

interface useLazyUploadProps {
  multiple?: boolean;
}

export const useLazyUpload = ({ multiple = false }: useLazyUploadProps) => {
  const [fileList, setFileList] = useState<File[]>([]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileList(Array.from<File>(e.target.files));
    }
  };
  const resetFileList = useCallback(() => setFileList([]), []);

  return {
    attributes: {
      type: 'file',
      multiple,
      onChange,
    },
    fileList,
    resetFileList,
  };
};
