import { useState, useCallback, useMemo } from "react";

interface UseUploadState {
  percentUploaded: number;
}

export type SetProgressEventPayload = ProgressEvent;

const initialState = { percentUploaded: 0 };

export const useUpload = () => {
  const [uploadState, setUploadState] = useState<UseUploadState>(initialState);
  const resetProgress = useCallback(
    () => setUploadState({ percentUploaded: 0 }),
    []
  );
  const setProgressEvent = useCallback(
    (progressEvent: SetProgressEventPayload) => {
      const { loaded, total } = progressEvent;
      const percentUploaded = Math.round((loaded * 100) / total);
      return setUploadState({ percentUploaded });
    },
    [uploadState]
  );
  return useMemo(
    () => ({
      resetProgress,
      uploadState,
      setProgressEvent
    }),
    [resetProgress, uploadState, setProgressEvent]
  );
};
