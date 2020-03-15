import React from "react";
import { Box } from "../common/Box";
import { Title } from "../common/Title";
import { FileListInfo } from "./FileListInfo";
import { Progress } from "../Upload/Progress";

interface FileListStatusProps {
  files: File[];
  percentUploaded?: number;
  title: string;
}

export const FileListStatus = ({
  files,
  percentUploaded,
  title
}: FileListStatusProps) => (
  <>
    {!!files.length && (
      <>
        {typeof percentUploaded === "number" && (
          <Box withBorder>
            <Title>Upload progress</Title>
            <Progress percentValue={percentUploaded} />
          </Box>
        )}
        <Box withBorder>
          <Title>{title}</Title>
          <FileListInfo fileList={files} />
        </Box>
      </>
    )}
  </>
);
