import React from "react";
import { Layout } from "../src/common/Layout";
import { Text } from "../src/common/Text";
import { Title } from "../src/common/Title";
import { Box } from "../src/common/Box";
import { withLinks, linkTo } from "@storybook/addon-links";

export const ToStorybook = () => (
  <Layout>
    <Title>Welcome to the playground of lazy-upload</Title>
    <Text>
      lazy-upload is a library which aims to simplify the file upload flow. You
      can find several examples. The easiest way is use component, you don't
      need to take care about css. There is also an alternative if you want to
      have custom behaviors you can use hooks.
    </Text>
    <Box>
      <div className="flex flex-col">
        <div className="flex">
          <Title>Table of contents</Title>
        </div>
        <div className="flex justify-center mt-4">
          <div className="overflow-hidden max-w-xs w-full shadow-lg">
            <button
              className="block w-full p-4 text-left border-b hover:bg-blue-400"
              onClick={linkTo(
                "hooks-file-upload-without-validation--simple-file-upload"
              )}
            >
              <p className="font-bold text-lg">Upload a file</p>
              <p className="mt-2">Upload a file without validation</p>
            </button>
            <button
              className="block w-full p-4 text-left border-b hover:bg-blue-400"
              onClick={linkTo(
                "hooks-file-upload-without-validation--multiple-file-upload"
              )}
            >
              <p className="font-bold text-lg">Upload multiple files</p>
              <p className="mt-2">Upload multiple files without validation</p>
            </button>
          </div>
        </div>
      </div>
    </Box>
  </Layout>
);

ToStorybook.story = {
  name: "Playground of lazy-upload"
};

export default {
  title: "Welcome",
  decorators: [withLinks]
};
