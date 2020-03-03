import React from "react";
import { Layout } from "../src/common/Layout";
import { Text } from "../src/common/Text";
import { Title } from "../src/common/Title";

export default {
  title: "Welcome"
};

export const ToStorybook = () => (
  <Layout>
    <Title>Welcome to the playground of lazy-upload</Title>
    <Text>
      lazy-upload is a library which aims to simplify the file upload flow. You
      can find several examples. The easiest way is use component, you don't
      need to take care about css. There is also an alternative if you want to
      have custom behaviors you can use hooks.
    </Text>
  </Layout>
);

ToStorybook.story = {
  name: "Playground of lazy-upload"
};
