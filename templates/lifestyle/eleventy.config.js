import path from "node:path";
import { fileURLToPath } from "node:url";
import createEleventyConfig from "@blog-starter-kit/shared/eleventy.config.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sharedRoot = path.resolve(__dirname, "../../shared");

export default function (eleventyConfig) {
  const baseConfig = createEleventyConfig({
    dir: {
      input: "src",
      output: "_site",
      includes: "../../../shared/_includes",
      data: "src/_data",
    },
  });

  const config = baseConfig(eleventyConfig);

  eleventyConfig.addPassthroughCopy({
    [path.join(sharedRoot, "assets")]: "assets",
  });
  eleventyConfig.addPassthroughCopy({
    "src/assets": "assets",
  });

  eleventyConfig.addGlobalData("theme", "lifestyle");

  return config;
}
