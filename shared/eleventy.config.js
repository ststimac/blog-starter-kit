import { DateTime } from "luxon";
import pluginRss from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";

export default function createEleventyConfig(options = {}) {
  const {
    dir = {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
  } = options;

  return function (eleventyConfig) {
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(pluginSyntaxHighlight);

    eleventyConfig.addGlobalData("meta", {
      buildTime: () => new Date(),
    });

    eleventyConfig.addFilter("readableDate", (dateObj) => {
      return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
        "LLLL d, yyyy"
      );
    });

    eleventyConfig.addFilter("htmlDateString", (dateObj) => {
      return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
        "yyyy-LL-dd"
      );
    });

    eleventyConfig.addFilter("head", (array, n) => {
      if (!Array.isArray(array) || array.length === 0) return [];
      if (n < 0) return array.slice(n);
      return array.slice(0, n);
    });

    eleventyConfig.addFilter("min", (...numbers) => {
      return Math.min(...numbers);
    });

    eleventyConfig.addCollection("posts", (collectionApi) => {
      return collectionApi
        .getFilteredByGlob("src/posts/**/*.md")
        .sort((a, b) => b.date - a.date);
    });

    eleventyConfig.addCollection("featuredPosts", (collectionApi) => {
      return collectionApi
        .getFilteredByGlob("src/posts/**/*.md")
        .filter((post) => post.data.featured)
        .sort((a, b) => b.date - a.date);
    });

    eleventyConfig.addCollection("categories", (collectionApi) => {
      const posts = collectionApi.getFilteredByGlob("src/posts/**/*.md");
      const categories = {};
      posts.forEach((post) => {
        const cats = post.data.categories || [];
        cats.forEach((cat) => {
          const key = cat.toLowerCase();
          if (!categories[key]) {
            categories[key] = { key, posts: [] };
          }
          categories[key].posts.push(post);
        });
      });
      return Object.values(categories).sort((a, b) =>
        a.key.localeCompare(b.key)
      );
    });

    eleventyConfig.addCollection("tagList", (collectionApi) => {
      const tagSet = new Set();
      collectionApi.getAll().forEach((item) => {
        if ("tags" in item.data) {
          const tags = item.data.tags;
          (Array.isArray(tags) ? tags : [tags]).forEach((tag) => {
            if (typeof tag === "string") tagSet.add(tag);
          });
        }
      });
      return [...tagSet].sort();
    });

    eleventyConfig.setLibrary(
      "md",
      markdownIt({
        html: true,
        breaks: true,
        linkify: true,
      }).use(markdownItAnchor, {
        permalink: markdownItAnchor.permalink.linkInsideHeader({
          symbol: "#",
          placement: "before",
        }),
        level: [1, 2, 3, 4],
        slugify: eleventyConfig.getFilter("slugify"),
      })
    );

    return {
      dir,
      templateFormats: ["md", "njk", "html"],
      markdownTemplateEngine: "njk",
      htmlTemplateEngine: "njk",
      dataTemplateEngine: "njk",
      pathPrefix: "/",
    };
  };
}
