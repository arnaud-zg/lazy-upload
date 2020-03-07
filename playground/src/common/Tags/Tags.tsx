import React, { FC } from "react";

interface TagsProps {
  tagList: TagProps["tag"][];
}

interface TagProps {
  tag: string;
  withPadding: boolean;
}

export const Tags: FC<TagsProps> = ({ tagList }) => (
  <div className="flex mt-4">
    {tagList.map((tag, index) => (
      <Tag key={tag} tag={tag} withPadding={index > 0} />
    ))}
  </div>
);

const Tag: FC<TagProps> = ({ tag, withPadding }) => (
  <span
    className={`inline-flex bg-blue-400 text-white rounded-full h-8 px-3 items-center${
      withPadding ? " ml-2" : ""
    }`}
  >
    {tag}
  </span>
);
