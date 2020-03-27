import React, { useCallback, useRef, useState } from 'react';
import { uploadFiles as defaultUploadFiles, UploadFilesProps } from './upload';

enum InputType {
  FILE = 'file',
}

interface ValidateFilesProps {
  files: File[];
}

interface ValidateFilesResponse {
  acceptedFiles: File[];
  rejectedFiles: File[];
}

interface UseLazyUploadProps {
  multiple?: boolean;
  uploadFiles?: typeof defaultUploadFiles;
  validateFiles?: ({
    files,
  }: ValidateFilesProps) => Promise<ValidateFilesResponse>;
}

interface FileBucket {
  acceptedFiles: File[];
  pendingFiles: File[];
  rejectedFiles: File[];
  uploadedFiles: File[];
}

const initialFileBucket = {
  acceptedFiles: [],
  pendingFiles: [],
  rejectedFiles: [],
  uploadedFiles: [],
};

const defaultValidateFiles = ({ files }: ValidateFilesProps) =>
  Promise.resolve({
    acceptedFiles: files,
    rejectedFiles: [],
  });

export const useLazyUpload = ({
  multiple = false,
  validateFiles = defaultValidateFiles,
  uploadFiles = defaultUploadFiles,
}: UseLazyUploadProps) => {
  const [
    { acceptedFiles, pendingFiles, rejectedFiles, uploadedFiles },
    setFileBucket,
  ] = useState<FileBucket>(initialFileBucket);
  const ref = useRef<HTMLInputElement | null>(null);
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const nextPendingFiles = Array.from<File>(e.target.files);

      setFileBucket({
        acceptedFiles,
        rejectedFiles,
        pendingFiles: nextPendingFiles,
        uploadedFiles,
      });

      const {
        acceptedFiles: nextAcceptedFiles,
        rejectedFiles: nextRejectedFiles,
      } = await validateFiles({ files: nextPendingFiles });

      setFileBucket({
        acceptedFiles: nextAcceptedFiles,
        rejectedFiles: nextRejectedFiles,
        pendingFiles,
        uploadedFiles,
      });
    }
  };
  const reset = useCallback(() => {
    if (ref.current) {
      ref.current.value = '';
    }
    return setFileBucket({
      acceptedFiles: [],
      pendingFiles: [],
      rejectedFiles: [],
      uploadedFiles: [],
    });
  }, [ref]);
  const upload = useCallback(
    (props: UploadFilesProps) =>
      uploadFiles(props)
        .then(({ uploadedFiles: { files: nextUploadedFiles } }) => {
          setFileBucket({
            acceptedFiles: [],
            pendingFiles,
            rejectedFiles,
            uploadedFiles: [
              ...uploadedFiles,
              ...Object.values<File>(nextUploadedFiles),
            ],
          });
          if (ref.current) {
            ref.current.value = '';
          }
        })
        .catch(({ rejectedFiles: nextRejectedFiles }) =>
          setFileBucket({
            acceptedFiles: [],
            pendingFiles,
            rejectedFiles: [...rejectedFiles, ...nextRejectedFiles],
            uploadedFiles,
          })
        ),
    [pendingFiles, ref, rejectedFiles, uploadedFiles, uploadFiles]
  );
  return {
    attributes: {
      multiple,
      onChange,
      ref,
      type: InputType.FILE,
    },
    acceptedFiles,
    pendingFiles,
    rejectedFiles,
    uploadedFiles,
    reset,
    upload,
  };
};
