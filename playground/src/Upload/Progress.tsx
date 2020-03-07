import React, { FC } from "react";

interface ProgressProps {
  percentValue: number;
}

export const Progress: FC<ProgressProps> = ({ percentValue }) => (
  <div className="flex flex-col mt-2 items-center">
    <progress value={percentValue} max="100" className="w-full" />
    <p>{percentValue}%</p>
  </div>
);
