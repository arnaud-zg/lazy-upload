import React, { FC } from "react";
import { FileItem } from "./FileItem";

interface FileListInfoProps {
  fileList: File[];
}

export const FileListInfo: FC<FileListInfoProps> = ({ fileList }) => (
  <ul>
    {fileList.map((file, index) => (
      <FileItem key={`${file.name}-${index}`} file={file} />
    ))}
  </ul>
);
