import React, { FC } from "react";

interface ButtonProps {
  onClick: VoidFunction;
}

export const Button: FC<ButtonProps> = ({ children, onClick }) => (
  <button
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
    onClick={onClick}
  >
    {children}
  </button>
);
