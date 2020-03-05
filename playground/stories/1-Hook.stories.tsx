import React, { useState } from "react";
import { useLazyUpload, uploadFiles } from "../../library/dist";
import { Box } from "../src/common/Box";
import { Button } from "../src/common/Button";
import { FileListInfo } from "../src/common/File/FileListInfo";
import { Layout } from "../src/common/Layout";
import { Text } from "../src/common/Text";
import { Title } from "../src/common/Title";

export const SimpleFileUpload = () => {
  const { attributes, fileList, resetFileList } = useLazyUpload({});
  const [isLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<any>([]);
  return (
    <Layout>
      <Title>
        Simple file upload with{" "}
        <Text highlight inline>
          useLazyUpload
        </Text>
      </Title>
      <Box withBorder isLoading={isLoading}>
        <form
          className="flex flex-col"
          onSubmit={e => {
            uploadFiles<{ files: {} }>({
              config: {
                url: "https://lazy-upload-server.now.sh/api/files",
                method: "POST"
              },
              fileList
            })
              .then(({ data }) => {
                alert("The file has been uploaded.");
                setUploadedFiles([
                  ...uploadedFiles,
                  ...Object.values(data.files)
                ]);
                resetFileList();
              })
              .catch(() => {
                alert("Cannot upload file");
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
          {!!fileList.length && (
            <div className="self-end">
              <Button
                onClick={() => {
                  resetFileList();
                }}
              >
                Clear
              </Button>
              <Button type="submit">Send</Button>
            </div>
          )}
        </form>
      </Box>
      {!!fileList.length && (
        <Box withBorder>
          <Title>List of preloaded files</Title>
          <FileListInfo fileList={fileList} />
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
  const [uploadedFiles, setUploadedFiles] = useState<any>([]);
  return (
    <Layout>
      <Title>
        Multiple file upload with{" "}
        <Text highlight inline>
          useLazyUpload
        </Text>
      </Title>
      <Box withBorder isLoading={isLoading}>
        <form
          className="flex flex-col"
          onSubmit={e => {
            uploadFiles<{ files: {} }>({
              config: {
                url: "https://lazy-upload-server.now.sh/api/files",
                method: "POST"
              },
              fileList
            })
              .then(({ data }) => {
                alert("The file has been uploaded.");
                setUploadedFiles([
                  ...uploadedFiles,
                  ...Object.values(data.files)
                ]);
                resetFileList();
              })
              .catch(() => {
                alert("Cannot upload file");
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
          {!!fileList.length && (
            <div className="self-end">
              <Button
                onClick={() => {
                  resetFileList();
                }}
              >
                Clear
              </Button>
              <Button type="submit">Send</Button>
            </div>
          )}
        </form>
      </Box>
      {!!fileList.length && (
        <Box withBorder>
          <Title>List of preloaded files</Title>
          <FileListInfo fileList={fileList} />
        </Box>
      )}
    </Layout>
  );
};

export default {
  title: "Hooks",
  component: SimpleFileUpload
};
