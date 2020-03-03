import React, { FC } from "react";
import { Loading } from "./Loading";

interface BoxProps {
  isLoading?: boolean;
  withBorder?: boolean;
}

export const Box: FC<BoxProps> = ({ children, isLoading, withBorder }) => (
  <div
    className={`justify-center p-4 mt-4 bg-gray-100${
      withBorder ? " border-2 rounded-md" : ""
    }`}
  >
    {isLoading ? <Loading /> : children}
  </div>
);
