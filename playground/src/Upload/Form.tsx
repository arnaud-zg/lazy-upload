import React from "react";
import { useLazyUpload } from "../../../library/dist";
import { Button } from "../common/Button";
import { SetProgressEventPayload } from "./useUpload";

const UPLOAD_FILES_URL = "https://lazy-upload-server.now.sh/api/files";

interface FormProps {
  acceptedFiles: File[];
  attributes: ReturnType<typeof useLazyUpload>["attributes"];
  onReset: VoidFunction;
  pendingFiles: File[];
  rejectedFiles: File[];
  resetProgress: VoidFunction;
  setProgressEvent: (progressEvent: SetProgressEventPayload) => void;
  upload: ReturnType<typeof useLazyUpload>["upload"];
  uploadedFiles: File[];
}

export const Form = ({
  acceptedFiles,
  attributes,
  onReset,
  pendingFiles,
  rejectedFiles,
  resetProgress,
  setProgressEvent,
  upload,
  uploadedFiles
}: FormProps) => (
  <form
    className="flex flex-col"
    onSubmit={e => {
      upload({
        config: {
          url: UPLOAD_FILES_URL,
          method: "POST",
          onUploadProgress: setProgressEvent
        },
        fileList: acceptedFiles
      }).then(() => {
        resetProgress();
      });

      e.preventDefault();
    }}
  >
    <label htmlFor="file-upload">Choose files:</label>
    <input {...attributes} id="file-upload" name="file-upload" />
    <div className="self-end">
      {(!!pendingFiles.length ||
        !!uploadedFiles.length ||
        !!rejectedFiles.length) && <Button onClick={onReset}>Clear</Button>}
      {!!acceptedFiles.length && <Button type="submit">Send</Button>}
    </div>
  </form>
);
