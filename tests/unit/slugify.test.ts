import { describe, it, expect } from "vitest";
import { slugify, unslugify, isValidSlug, uniqueSlugify } from "@utils/slugify";

describe("slugify", () => {
  it("should convert text to lowercase slug", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("should handle special characters", () => {
    expect(slugify("Café & Té")).toBe("cafe-te");
  });

  it("should handle multiple spaces", () => {
    expect(slugify("Hello    World")).toBe("hello-world");
  });

  it("should handle spanish characters", () => {
    expect(slugify("Ingeniería Industrial")).toBe("ingenieria-industrial");
  });

  it("should remove trailing hyphens", () => {
    expect(slugify("Hello World!!!")).toBe("hello-world");
  });
});

describe("unslugify", () => {
  it("should convert slug to title case", () => {
    expect(unslugify("hello-world")).toBe("Hello World");
  });

  it("should handle single word", () => {
    expect(unslugify("hello")).toBe("Hello");
  });
});

describe("isValidSlug", () => {
  it("should validate correct slugs", () => {
    expect(isValidSlug("hello-world")).toBe(true);
    expect(isValidSlug("hello-world-123")).toBe(true);
    expect(isValidSlug("hello")).toBe(true);
  });

  it("should reject invalid slugs", () => {
    expect(isValidSlug("Hello World")).toBe(false);
    expect(isValidSlug("hello_world")).toBe(false);
    expect(isValidSlug("hello--world")).toBe(false);
    expect(isValidSlug("-hello")).toBe(false);
    expect(isValidSlug("hello-")).toBe(false);
  });
});

describe("uniqueSlugify", () => {
  it("should return unique slug when slug exists", () => {
    const existingSlugs = ["hello-world"];
    const result = uniqueSlugify("Hello World", existingSlugs);
    expect(result).toBe("hello-world-1");
  });

  it("should return original slug when it doesn't exist", () => {
    const existingSlugs = ["other-slug"];
    const result = uniqueSlugify("Hello World", existingSlugs);
    expect(result).toBe("hello-world");
  });

  it("should increment counter for multiple existing slugs", () => {
    const existingSlugs = ["hello-world", "hello-world-1"];
    const result = uniqueSlugify("Hello World", existingSlugs);
    expect(result).toBe("hello-world-2");
  });
});
