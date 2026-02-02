/**
 * Type guard utilities for runtime type checking.
 */

/**
 * Checks if a value is defined (not null or undefined).
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Checks if a value is a non-empty string.
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Checks if a value is a valid URL string.
 */
export function isValidUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;

  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if a value is a valid email string.
 */
export function isValidEmail(value: unknown): value is string {
  if (typeof value !== "string") return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

/**
 * Checks if a value is an array with at least one element.
 */
export function isNonEmptyArray<T>(value: unknown): value is T[] {
  return Array.isArray(value) && value.length > 0;
}

/**
 * Checks if a value is a valid date string (ISO format).
 */
export function isValidDateString(value: unknown): value is string {
  if (typeof value !== "string") return false;

  const date = new Date(value);
  return !isNaN(date.getTime());
}

/**
 * Checks if an object has a specific property.
 */
export function hasProperty<K extends PropertyKey>(
  obj: unknown,
  key: K
): obj is Record<K, unknown> {
  return typeof obj === "object" && obj !== null && key in obj;
}

/**
 * Asserts that a value is defined, throwing an error if not.
 */
export function assertDefined<T>(
  value: T | null | undefined,
  message = "Value is not defined"
): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(message);
  }
}

/**
 * Type-safe object keys utility.
 */
export function objectKeys<T extends object>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
}

/**
 * Type-safe object entries utility.
 */
export function objectEntries<T extends object>(
  obj: T
): Array<[keyof T, T[keyof T]]> {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
}
