import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
	{
		ignores: ["dist", ".astro", "node_modules"],
	},
	js.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	...tseslint.configs.stylisticTypeChecked,
	{
		files: ["**/*.astro"],
		languageOptions: {
			globals: {
				Astro: "readonly",
			},
			parser: astro.parser,
		},
		plugins: {
			astro,
		},
		rules: {
			"astro/semi": ["error", "always"],
		},
	},
	{
		files: ["**/*.{ts,tsx,js,jsx}"],
		languageOptions: {
			ecmaVersion: "latest",
			globals: {
				...globals.browser,
				...globals.es2023,
			},
			parserOptions: {
				project: ["./tsconfig.json"],
				tsconfigRootDir: new URL(".", import.meta.url),
			},
		},
		plugins: {
			react: reactPlugin,
			"react-hooks": reactHooks,
		},
		rules: {
			"react/jsx-uses-react": "off",
			"react/react-in-jsx-scope": "off",
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "warn",
		},
		settings: {
			react: {
				version: "detect",
			},
		},
	},
];
