import React, { FC } from "react";

export const Button: FC = ({ children }) => (
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
    {children}
  </button>
);
