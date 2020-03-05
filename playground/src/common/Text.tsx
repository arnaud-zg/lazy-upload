import React, { FC } from "react";

interface TextProps {
  inline?: boolean;
  highlight?: boolean;
}

export const Text: FC<TextProps> = ({ children, highlight, inline }) => (
  <p
    className={`${inline ? " inline" : ""}${
      highlight ? " bg-gray-300 px-1" : ""
    }`}
  >
    {children}
  </p>
);
