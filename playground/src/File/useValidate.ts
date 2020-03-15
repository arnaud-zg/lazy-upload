import { useCallback } from "react";
import axios, { AxiosResponse } from "axios";

const VALIDATE_EXTENSION_FILES_URL =
  "https://lazy-upload-server.now.sh/api/validate/file/extension";
const VALIDATE_SIZE_FILES_URL =
  "https://lazy-upload-server.now.sh/api/validate/file/size";

export const useValidate = () => {
  const validate = useCallback(({ files }: { files: File[] }) => {
    const filesSize = files.reduce((acc, value) => acc + value.size, 0);
    const fileTypes = files.reduce((acc, value) => [...acc, value.type], []);
    const validateExtension = () =>
      axios({
        url: VALIDATE_EXTENSION_FILES_URL,
        params: {
          fileTypes
        },
        method: "GET"
      }) as Promise<AxiosResponse<{ [fileType: string]: boolean }>>;
    const validateSize = () =>
      axios({
        url: VALIDATE_SIZE_FILES_URL,
        params: {
          filesSize
        },
        method: "GET"
      }) as Promise<AxiosResponse<{ status: boolean }>>;

    return Promise.all([validateSize(), validateExtension()])
      .then(data => {
        const isFilesSizeValid = data[0].data.status;
        const { acceptedFiles, rejectedFiles } = Object.entries(
          data[1].data
        ).reduce(
          (acc, [fileType, isAllowed]) => {
            const nextFiles = files.filter(file => file.type === fileType);
            if (!isFilesSizeValid) {
              return {
                ...acc,
                rejectedFiles: [...acc.rejectedFiles, ...nextFiles]
              };
            }

            return {
              ...acc,
              acceptedFiles: [
                ...acc.acceptedFiles,
                ...(isAllowed ? nextFiles : [])
              ],
              rejectedFiles: [
                ...acc.rejectedFiles,
                ...(!isAllowed ? nextFiles : [])
              ]
            };
          },
          { acceptedFiles: [], rejectedFiles: [] }
        );

        return Promise.resolve({
          acceptedFiles,
          rejectedFiles
        });
      })
      .catch(() =>
        Promise.resolve({
          acceptedFiles: [],
          rejectedFiles: [...files]
        })
      );
  }, []);
  return {
    validate
  };
};
