const Image = require("@11ty/eleventy-img");
const { EleventyI18nPlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: "en",
  });

  // add localized collections for art
  eleventyConfig.addCollection("art_en", function (collection) {
    return collection.getFilteredByGlob("./src/en/art/*.md");
  });

  eleventyConfig.addCollection("art_el", function (collection) {
    return collection.getFilteredByGlob("./src/el/art/*.md");
  });

  eleventyConfig.addCollection("art_sv", function (collection) {
    return collection.getFilteredByGlob("./src/sv/art/*.md");
  });

  return {
    passthroughFileCopy: true,
    markdownTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md"],
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
