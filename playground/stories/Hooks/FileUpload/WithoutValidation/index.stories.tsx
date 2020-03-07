import React, { useState } from "react";
import {
  uploadFiles,
  uploadFilesResponse,
  useLazyUpload
} from "../../../../../library/dist";
import { Box } from "../../../../src/common/Box";
import { Button } from "../../../../src/common/Button";
import { Layout } from "../../../../src/common/Layout";
import { Tags, TagsEnum } from "../../../../src/common/Tags";
import { Text } from "../../../../src/common/Text";
import { Title } from "../../../../src/common/Title";
import { FileListInfo } from "../../../../src/File/FileListInfo";
import { Progress } from "../../../../src/Upload/Progress";
import { useUpload } from "../../../../src/Upload/useUpload";

const UPLOAD_FILES_URL = "https://lazy-upload-server.now.sh/api/files";

export const SimpleFileUpload = () => {
  const { attributes, fileList, resetFileList } = useLazyUpload({});
  const [isLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<File[]>([]);
  const { uploadState, setProgressEvent, resetProgress } = useUpload();

  return (
    <Layout>
      <Title>
        Simple file upload with{" "}
        <Text highlight inline>
          useLazyUpload
        </Text>
      </Title>
      <Tags
        tagList={[
          TagsEnum.SIMPLE,
          TagsEnum.FILE_UPLOAD,
          TagsEnum.WITHOUT_VALIDATION
        ]}
      />
      <Box withBorder isLoading={isLoading}>
        <form
          className="flex flex-col"
          onSubmit={e => {
            uploadFiles({
              config: {
                url: UPLOAD_FILES_URL,
                method: "POST",
                onUploadProgress: setProgressEvent
              },
              fileList
            })
              .then(({ uploadedFiles: { files: uploadedFilesResponse } }) => {
                setUploadedFiles([
                  ...uploadedFiles,
                  ...Object.values<File>(uploadedFilesResponse)
                ]);
                resetFileList();
                resetProgress();
              })
              .catch(({ rejectedFiles }: uploadFilesResponse) => {
                setRejectedFiles([...uploadedFiles, ...rejectedFiles]);
                resetFileList();
                resetProgress();
              });
            e.preventDefault();
          }}
        >
          <label htmlFor="simple-file-upload">Choose a file:</label>
          <input
            {...attributes}
            id="simple-file-upload"
            name="simple-file-upload"
          />
          <div className="self-end">
            {(!!fileList.length ||
              !!uploadedFiles.length ||
              !!rejectedFiles.length) && (
              <Button
                onClick={() => {
                  resetFileList();
                  setUploadedFiles([]);
                  setRejectedFiles([]);
                  resetProgress();
                }}
              >
                Clear
              </Button>
            )}
            {!!fileList.length && <Button type="submit">Send</Button>}
          </div>
        </form>
      </Box>
      {!!fileList.length && (
        <>
          <Box withBorder>
            <Title>Upload progress</Title>
            <Progress percentValue={uploadState.percentUploaded} />
          </Box>
          <Box withBorder>
            <Title>List of preloaded files</Title>
            <FileListInfo fileList={fileList} />
          </Box>
        </>
      )}
      {!!uploadedFiles.length && (
        <Box withBorder>
          <Title>List of uploaded files</Title>
          <FileListInfo fileList={uploadedFiles} />
        </Box>
      )}
      {!!rejectedFiles.length && (
        <Box withBorder>
          <Title>List of rejected files</Title>
          <FileListInfo fileList={rejectedFiles} />
        </Box>
      )}
    </Layout>
  );
};

export const MultipleFileUpload = () => {
  const { attributes, fileList, resetFileList } = useLazyUpload({
    multiple: true
  });
  const [isLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<File[]>([]);
  const { uploadState, setProgressEvent, resetProgress } = useUpload();

  return (
    <Layout>
      <Title>
        Multiple file upload with{" "}
        <Text highlight inline>
          useLazyUpload
        </Text>
      </Title>
      <Tags
        tagList={[
          TagsEnum.MULTIPLE,
          TagsEnum.FILE_UPLOAD,
          TagsEnum.WITHOUT_VALIDATION
        ]}
      />
      <Box withBorder isLoading={isLoading}>
        <form
          className="flex flex-col"
          onSubmit={e => {
            uploadFiles({
              config: {
                url: UPLOAD_FILES_URL,
                method: "POST",
                onUploadProgress: setProgressEvent
              },
              fileList
            })
              .then(({ uploadedFiles: { files: uploadedFilesResponse } }) => {
                setUploadedFiles([
                  ...uploadedFiles,
                  ...Object.values<File>(uploadedFilesResponse)
                ]);
                resetFileList();
                resetProgress();
              })
              .catch(({ rejectedFiles }: uploadFilesResponse) => {
                setRejectedFiles([...uploadedFiles, ...rejectedFiles]);
                resetFileList();
                resetProgress();
              });

            e.preventDefault();
          }}
        >
          <label htmlFor="multiple-file-upload">Choose files:</label>
          <input
            {...attributes}
            id="multiple-file-upload"
            name="multiple-file-upload"
          />
          <div className="self-end">
            {(!!fileList.length ||
              !!uploadedFiles.length ||
              !!rejectedFiles.length) && (
              <Button
                onClick={() => {
                  resetFileList();
                  setUploadedFiles([]);
                  setRejectedFiles([]);
                  resetProgress();
                }}
              >
                Clear
              </Button>
            )}
            {!!fileList.length && <Button type="submit">Send</Button>}
          </div>
        </form>
      </Box>
      {!!fileList.length && (
        <>
          <Box withBorder>
            <Title>Upload progress</Title>
            <Progress percentValue={uploadState.percentUploaded} />
          </Box>
          <Box withBorder>
            <Title>List of preloaded files</Title>
            <FileListInfo fileList={fileList} />
          </Box>
        </>
      )}
      {!!uploadedFiles.length && (
        <Box withBorder>
          <Title>List of uploaded files</Title>
          <FileListInfo fileList={uploadedFiles} />
        </Box>
      )}
      {!!rejectedFiles.length && (
        <Box withBorder>
          <Title>List of rejected files</Title>
          <FileListInfo fileList={rejectedFiles} />
        </Box>
      )}
    </Layout>
  );
};

export default {
  title: "Hooks/File Upload/Without validation",
  component: SimpleFileUpload
};
