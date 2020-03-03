import React, { useState } from "react";
import { useLazyUpload } from "../../library/dist";
import { Box } from "../src/common/Box";
import { Button } from "../src/common/Button";
import { FileListInfo } from "../src/common/File/FileListInfo";
import { fakeFileListUpload } from "../src/common/form";
import { Layout } from "../src/common/Layout";
import { Text } from "../src/common/Text";
import { Title } from "../src/common/Title";

export const SimpleFileUpload = () => {
  const { attributes, fileList, resetFileList } = useLazyUpload({});
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Layout>
      <Title>
        Simple file upload with <Text highlight>useLazyUpload</Text>
      </Title>
      <Box withBorder isLoading={isLoading}>
        <form
          className="flex flex-col"
          onSubmit={e => {
            e.preventDefault();
            setIsLoading(true);
            fakeFileListUpload({ fileList }).then(({ config }) => {
              resetFileList();
              alert(
                `${
                  fileList.length
                } files has been uploaded with configuration ${JSON.stringify(
                  config
                )}`
              );
              setIsLoading(false);
            });
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
              <Button>Send</Button>
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
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Layout>
      <Title>
        Multiple file upload with <Text highlight>useLazyUpload</Text>
      </Title>
      <Box withBorder isLoading={isLoading}>
        <form
          className="flex flex-col"
          onSubmit={e => {
            e.preventDefault();
            setIsLoading(true);
            fakeFileListUpload({ fileList }).then(({ config }) => {
              resetFileList();
              alert(
                `${
                  fileList.length
                } files has been uploaded with configuration ${JSON.stringify(
                  config
                )}`
              );
              setIsLoading(false);
            });
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
              <Button>Send</Button>
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
