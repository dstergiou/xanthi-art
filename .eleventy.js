const Image = require("@11ty/eleventy-img");
const { EleventyI18nPlugin } = require("@11ty/eleventy");
const path = require("path");

const imageShortCode = async (
  src,
  alt,
  cls,
  widths = [300, 400, 600, 800, 1600],
  formats = ["webp", "jpeg"],
  sizes = "100vw"
) => {
  const imageMetadata = await Image(src, {
    filenameFormat: function (hash, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);

      return `${name}-${width}.${format}`;
    },
    widths: [...widths, null],
    formats: [...formats, null],
    outputDir: "_site/assets/images",
    urlPath: "/assets/images",
  });

  const imageAttributes = {
    alt,
    class: cls,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(imageMetadata, imageAttributes);
};

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

  eleventyConfig.addShortcode("image", imageShortCode);

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
