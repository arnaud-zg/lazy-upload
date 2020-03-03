import React, { FC } from "react";

export const Layout: FC = ({ children }) => (
  <div className="flex justify-center">
    <div className="p-4 w-9/12 mt-2 border-2 rounded-md bg-gray-300">
      {children}
    </div>
  </div>
);
