import React, { FC } from "react";
import { FileItemName } from "./FileItemName";
import { Text } from "../common/Text";

interface FileItemProps {
  file: File;
}

export const FileItem: FC<FileItemProps> = ({ file }) => {
  return (
    <div className="border-2 p-4 mt-4">
      <div>
        <FileItemName>Filename</FileItemName>{" "}
        <Text inline highlight>
          {file.name}
        </Text>
      </div>
      <div>
        <FileItemName>Size</FileItemName>{" "}
        <Text inline highlight>
          {file.size}
        </Text>
      </div>
      {file.type && (
        <div>
          <FileItemName>Type</FileItemName>{" "}
          <Text inline highlight>
            {file.type}
          </Text>
        </div>
      )}
      <div>
        <FileItemName>Last modified</FileItemName>{" "}
        <Text inline highlight>
          {file.lastModified}
        </Text>
      </div>
    </div>
  );
};
