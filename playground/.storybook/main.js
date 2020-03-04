const path = require("path");

module.exports = {
  addons: [
    {
      name: "@storybook/preset-typescript",
      options: {
        tsDocgenLoaderOptions: {
          tsconfigPath: path.resolve(__dirname, "../tsconfig.json")
        },
        include: [
          path.resolve(__dirname),
          path.resolve(__dirname, ".."),
          path.resolve(__dirname, "../../library")
        ]
      }
    },
    {
      name: "@storybook/preset-scss",
      options: {
        cssLoaderOptions: {
          modules: true,
          localIdentName: "[name]__[local]--[hash:base64:5]"
        }
      }
    }
  ],
  stories: ["../stories/**/*.stories.[tj]sx"]
};
