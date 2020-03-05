import React, { FC } from "react";

interface ButtonProps {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: VoidFunction;
}

export const Button: FC<ButtonProps> = ({ children, onClick, type }) => (
  <button
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ml-2"
    onClick={onClick}
    type={type}
  >
    {children}
  </button>
);
