import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import path from "node:path";

const alias = {
	"@layouts": path.resolve("src/layouts"),
	"@components": path.resolve("src/components"),
	"@providers": path.resolve("src/components/providers"),
	"@modules": path.resolve("src/modules"),
	"@content": path.resolve("src/content"),
	"@services": path.resolve("src/services"),
	"@styles": path.resolve("src/styles"),
	"@utils": path.resolve("src/utils"),
	"@types": path.resolve("src/types"),
	"@seo": path.resolve("src/seo"),
};

export default defineConfig({
	srcDir: "./src",
	output: "static",
	integrations: [react(), tailwind({ applyBaseStyles: false })],
	vite: {
		resolve: {
			alias,
		},
	},
});
