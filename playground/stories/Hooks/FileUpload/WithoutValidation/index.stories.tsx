import React, { useState } from "react";
import { useLazyUpload } from "../../../../../library/dist";
import { Box } from "../../../../src/common/Box";
import { Layout } from "../../../../src/common/Layout";
import { Tags, TagsEnum } from "../../../../src/common/Tags";
import { Text } from "../../../../src/common/Text";
import { Title } from "../../../../src/common/Title";
import { FileListStatus } from "../../../../src/File/FileListStatus";
import { useUpload } from "../../../../src/Upload/useUpload";
import { Form } from "../../../../src/Upload/Form";

export const SimpleFileUpload = () => {
  const {
    attributes,
    pendingFiles,
    acceptedFiles,
    uploadedFiles,
    rejectedFiles,
    reset,
    upload
  } = useLazyUpload({});
  const [isLoading] = useState(false);
  const { uploadState, setProgressEvent, resetProgress } = useUpload();
  const onReset = () => {
    reset();
    resetProgress();
  };

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
        <Form
          acceptedFiles={acceptedFiles}
          attributes={attributes}
          onReset={onReset}
          pendingFiles={pendingFiles}
          rejectedFiles={rejectedFiles}
          resetProgress={resetProgress}
          setProgressEvent={setProgressEvent}
          upload={upload}
          uploadedFiles={uploadedFiles}
        />
      </Box>
      <FileListStatus files={pendingFiles} title="List of pending files" />
      <FileListStatus
        files={acceptedFiles}
        title="List of accepted files"
        percentUploaded={uploadState.percentUploaded}
      />
      <FileListStatus files={uploadedFiles} title="List of uploaded files" />
      <FileListStatus files={rejectedFiles} title="List of rejected files" />
    </Layout>
  );
};

export const MultipleFileUpload = () => {
  const {
    attributes,
    pendingFiles,
    acceptedFiles,
    rejectedFiles,
    uploadedFiles,
    reset,
    upload
  } = useLazyUpload({
    multiple: true
  });
  const [isLoading] = useState(false);
  const { uploadState, setProgressEvent, resetProgress } = useUpload();
  const onReset = () => {
    reset();
    resetProgress();
  };

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
        <Form
          acceptedFiles={acceptedFiles}
          attributes={attributes}
          onReset={onReset}
          pendingFiles={pendingFiles}
          rejectedFiles={rejectedFiles}
          resetProgress={resetProgress}
          setProgressEvent={setProgressEvent}
          upload={upload}
          uploadedFiles={uploadedFiles}
        />
      </Box>
      <FileListStatus files={pendingFiles} title="List of pending files" />
      <FileListStatus
        files={acceptedFiles}
        title="List of accepted files"
        percentUploaded={uploadState.percentUploaded}
      />
      <FileListStatus files={uploadedFiles} title="List of uploaded files" />
      <FileListStatus files={rejectedFiles} title="List of rejected files" />
    </Layout>
  );
};

export default {
  title: "Hooks/File Upload/Without Validation",
  component: SimpleFileUpload
};
