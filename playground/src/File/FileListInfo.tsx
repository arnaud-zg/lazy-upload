import React, { FC } from "react";
import { FileItem } from "./FileItem";

interface FileListInfoProps {
  fileList: File[];
}

export const FileListInfo: FC<FileListInfoProps> = ({ fileList }) => (
  <ul>
    {fileList.map(file => (
      <FileItem key={file.name} file={file} />
    ))}
  </ul>
);
