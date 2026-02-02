import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
import path from "node:path";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

const alias = {
	"@layouts": path.resolve(rootDir, "src/layouts"),
	"@components": path.resolve(rootDir, "src/components"),
	"@providers": path.resolve(rootDir, "src/components/providers"),
	"@modules": path.resolve(rootDir, "src/modules"),
	"@content": path.resolve(rootDir, "src/content"),
	"@services": path.resolve(rootDir, "src/services"),
	"@styles": path.resolve(rootDir, "src/styles"),
	"@utils": path.resolve(rootDir, "src/utils"),
	"@types": path.resolve(rootDir, "src/types"),
	"@seo": path.resolve(rootDir, "src/seo"),
};

export default defineConfig({
	resolve: {
		alias,
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: [],
		coverage: {
			provider: "c8",
			reporter: ["text", "lcov"],
			include: ["src/**/*.{ts,tsx}"]
		},
	},
});
