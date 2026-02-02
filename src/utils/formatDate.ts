/**
 * Date formatting utilities for consistent date display across the portfolio.
 */

type DateFormatStyle = "short" | "medium" | "long" | "relative";
type DateInput = string | Date;

interface FormatDateOptions {
  style?: DateFormatStyle;
  locale?: string;
}

const DEFAULT_LOCALE = "es-ES";

/**
 * Converts a date input to a Date object.
 */
function toDate(input: DateInput): Date {
  return input instanceof Date ? input : new Date(input);
}

/**
 * Formats a date into a human-readable format.
 * @param dateInput - Date object or ISO date string (e.g., "2024-01-15")
 * @param options - Formatting options
 * @returns Formatted date string
 */
export function formatDate(
  dateInput: DateInput,
  options: FormatDateOptions = {}
): string {
  const { style = "medium", locale = DEFAULT_LOCALE } = options;

  try {
    const date = toDate(dateInput);

    if (isNaN(date.getTime())) {
      console.warn(`Invalid date: ${dateInput}`);
      return String(dateInput);
    }

    if (style === "relative") {
      return formatRelativeDate(date, locale);
    }

    const formatOptions = getFormatOptions(style);
    return new Intl.DateTimeFormat(locale, formatOptions).format(date);
  } catch (error) {
    console.error(`Error formatting date: ${dateInput}`, error);
    return String(dateInput);
  }
}

/**
 * Gets Intl.DateTimeFormat options for a given style.
 */
function getFormatOptions(style: DateFormatStyle): Intl.DateTimeFormatOptions {
  switch (style) {
    case "short":
      return {
        day: "numeric",
        month: "short",
      };
    case "medium":
      return {
        day: "numeric",
        month: "long",
        year: "numeric",
      };
    case "long":
      return {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      };
    default:
      return {
        day: "numeric",
        month: "long",
        year: "numeric",
      };
  }
}

/**
 * Formats a date as a relative time string (e.g., "hace 2 días").
 */
function formatRelativeDate(date: Date, locale: string): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, "second");
  } else if (diffInMinutes < 60) {
    return rtf.format(-diffInMinutes, "minute");
  } else if (diffInHours < 24) {
    return rtf.format(-diffInHours, "hour");
  } else if (diffInDays < 7) {
    return rtf.format(-diffInDays, "day");
  } else if (diffInWeeks < 4) {
    return rtf.format(-diffInWeeks, "week");
  } else if (diffInMonths < 12) {
    return rtf.format(-diffInMonths, "month");
  } else {
    return rtf.format(-diffInYears, "year");
  }
}

/**
 * Formats a date range string.
 * @param startDate - Start date
 * @param endDate - Optional end date
 * @returns Formatted date range
 */
export function formatDateRange(
  startDate: DateInput,
  endDate?: DateInput,
  locale: string = DEFAULT_LOCALE
): string {
  const start = formatDate(startDate, { style: "medium", locale });

  if (!endDate || toDate(startDate).getTime() === toDate(endDate).getTime()) {
    return start;
  }

  const end = formatDate(endDate, { style: "medium", locale });
  return `${start} – ${end}`;
}

/**
 * Checks if a date is in the future.
 */
export function isFutureDate(dateInput: DateInput): boolean {
  const date = toDate(dateInput);
  return date > new Date();
}

/**
 * Checks if a date is in the past.
 */
export function isPastDate(dateInput: DateInput): boolean {
  const date = toDate(dateInput);
  return date < new Date();
}
