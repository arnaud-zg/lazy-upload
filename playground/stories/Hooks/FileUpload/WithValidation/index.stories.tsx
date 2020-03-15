import React, { useState } from "react";
import { Layout } from "../../../../src/common/Layout";
import { Title } from "../../../../src/common/Title";
import { Box } from "../../../../src/common/Box";
import { Text } from "../../../../src/common/Text";
import { Tags, TagsEnum } from "../../../../src/common/Tags";
import { useLazyUpload } from "../../../../../library/dist";
import { useUpload } from "../../../../src/Upload/useUpload";
import { Form } from "../../../../src/Upload/Form";
import { FileListStatus } from "../../../../src/File/FileListStatus";
import { useValidate } from "../../../../src/File/useValidate";

export const FileUpload = () => {
  const { validate } = useValidate();
  const validateFiles = ({ files }: { files: File[] }) => validate({ files });
  const {
    attributes,
    pendingFiles,
    acceptedFiles,
    uploadedFiles,
    rejectedFiles,
    reset,
    upload
  } = useLazyUpload({ multiple: true, validateFiles });
  const [isLoading] = useState(false);
  const { uploadState, setProgressEvent, resetProgress } = useUpload();
  const onReset = () => {
    reset();
    resetProgress();
  };

  return (
    <Layout>
      <Title>
        File upload with{" "}
        <Text highlight inline>
          useLazyUpload
        </Text>
      </Title>
      <Tags tagList={[TagsEnum.FILE_UPLOAD, TagsEnum.WITH_VALIDATION]} />
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
  title: "Hooks/File Upload/With Validation",
  component: FileUpload
};
