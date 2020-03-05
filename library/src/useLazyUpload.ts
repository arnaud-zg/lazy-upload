import React, { useCallback, useRef, useState } from 'react';

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

  const ref = useRef<HTMLInputElement | null>(null);
  const resetFileList = useCallback(() => {
    if (ref.current) {
      ref.current.value = '';
    }
    return setFileList([]);
  }, [ref]);

  return {
    attributes: {
      type: 'file',
      multiple,
      onChange,
      ref,
    },
    fileList,
    resetFileList,
  };
};
