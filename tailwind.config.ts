import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
	darkMode: "class",
	content: ["./src/**/*.{astro,html,md,mdx,js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				// Semantic colors from CSS variables
				background: "rgb(var(--color-background) / <alpha-value>)",
				foreground: "rgb(var(--color-foreground) / <alpha-value>)",
				muted: {
					DEFAULT: "rgb(var(--color-muted) / <alpha-value>)",
					foreground: "rgb(var(--color-muted-foreground) / <alpha-value>)",
				},
				border: "rgb(var(--color-border) / <alpha-value>)",
				card: {
					DEFAULT: "rgb(var(--color-card) / <alpha-value>)",
					foreground: "rgb(var(--color-card-foreground) / <alpha-value>)",
				},
				primary: {
					DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
					foreground: "rgb(var(--color-primary-foreground) / <alpha-value>)",
				},
				secondary: {
					DEFAULT: "rgb(var(--color-secondary) / <alpha-value>)",
					foreground: "rgb(var(--color-secondary-foreground) / <alpha-value>)",
				},
				accent: {
					DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
					foreground: "rgb(var(--color-accent-foreground) / <alpha-value>)",
				},
				success: "rgb(var(--color-success) / <alpha-value>)",
				warning: "rgb(var(--color-warning) / <alpha-value>)",
				error: "rgb(var(--color-error) / <alpha-value>)",
				// Brand colors for direct use
				brand: {
					DEFAULT: "#1a73e8",
					light: "#4f8ff4",
					dark: "#174ea6",
				},
			},
			fontFamily: {
				sans: ["'Inter Variable'", "'Inter'", "system-ui", "sans-serif"],
				mono: ["'JetBrains Mono'", "monospace"],
			},
			fontSize: {
				"2xs": ["0.625rem", { lineHeight: "0.75rem" }],
			},
			spacing: {
				"18": "4.5rem",
				"112": "28rem",
				"128": "32rem",
			},
			borderRadius: {
				"4xl": "2rem",
			},
			boxShadow: {
				glow: "0 0 20px rgba(26, 115, 232, 0.3)",
				"glow-lg": "0 0 40px rgba(26, 115, 232, 0.4)",
				"soft": "0 2px 8px 0 rgba(0, 0, 0, 0.08)",
				"soft-lg": "0 4px 16px 0 rgba(0, 0, 0, 0.12)",
				"soft-xl": "0 8px 24px 0 rgba(0, 0, 0, 0.16)",
				"3xl": "0 20px 40px -12px rgba(0, 0, 0, 0.25)",
				"inner-lg": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
			},
			animation: {
				"fade-in": "fadeIn 0.5s ease-out forwards",
				"fade-up": "fadeUp 0.5s ease-out forwards",
				"slide-in-left": "slideInLeft 0.5s ease-out forwards",
				"slide-in-right": "slideInRight 0.5s ease-out forwards",
				float: "float 3s ease-in-out infinite",
				pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				fadeUp: {
					"0%": { opacity: "0", transform: "translateY(20px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				slideInLeft: {
					"0%": { opacity: "0", transform: "translateX(-20px)" },
					"100%": { opacity: "1", transform: "translateX(0)" },
				},
				slideInRight: {
					"0%": { opacity: "0", transform: "translateX(20px)" },
					"100%": { opacity: "1", transform: "translateX(0)" },
				},
				float: {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-10px)" },
				},
			},
			transitionDuration: {
				"400": "400ms",
			},
		},
	},
	plugins: [typography],
};

export default config;
