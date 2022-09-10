module.exports = function (eleventyConfig) {

    eleventyConfig.addPassthroughCopy("./src/assets/styles/compiled_styles/");
    eleventyConfig.addWatchTarget("./src/assets/styles/compiled_styles/");

    eleventyConfig.addPassthroughCopy("./src/assets/scripts/");
    eleventyConfig.addWatchTarget("./src/assets/scripts/");

    eleventyConfig.addPassthroughCopy("./src/_includes/");
    eleventyConfig.addWatchTarget("./src/_includes/");

    eleventyConfig.addPassthroughCopy("./src/sections/");
    eleventyConfig.addWatchTarget("./src/sections/");

    eleventyConfig.addPassthroughCopy("./src/assets/images/");
    eleventyConfig.addWatchTarget("./src/assets/images/");

    eleventyConfig.addPassthroughCopy("./src/assets/fonts/");

    return {
        dir: {
            input: "src",
            output: "public"
        }
    }
}
