/**
 * @type {import("prettier").Config}
 */
const config = {
	semi: true,
	singleQuote: false,
	trailingComma: "es5",
	printWidth: 100,
	plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
	pluginSearchDirs: false,
};

module.exports = config;
