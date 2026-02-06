import { describe, it, expect } from "vitest";
import { formatDate, isFutureDate } from "@utils/formatDate";

describe("formatDate", () => {
  it("should format date in medium style by default", () => {
    const date = new Date("2024-01-15");
    const formatted = formatDate(date);
    expect(formatted).toContain("2024");
  });

  it("should format ISO string dates", () => {
    const formatted = formatDate("2024-01-15");
    expect(formatted).toBeTruthy();
    expect(typeof formatted).toBe("string");
  });

  it("should handle short style", () => {
    const date = new Date("2024-01-15");
    const formatted = formatDate(date, { style: "short" });
    expect(formatted).toBeTruthy();
  });

  it("should handle long style", () => {
    const date = new Date("2024-01-15");
    const formatted = formatDate(date, { style: "long" });
    expect(formatted).toBeTruthy();
  });

  it("should handle invalid dates gracefully", () => {
    const formatted = formatDate("invalid-date");
    expect(formatted).toBe("invalid-date");
  });
});

describe("isFutureDate", () => {
  it("should return true for future dates", () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    expect(isFutureDate(futureDate)).toBe(true);
  });

  it("should return false for past dates", () => {
    const pastDate = new Date("2020-01-01");
    expect(isFutureDate(pastDate)).toBe(false);
  });

  it("should handle string dates", () => {
    const futureDate = "2030-01-01";
    expect(isFutureDate(futureDate)).toBe(true);
  });
});
