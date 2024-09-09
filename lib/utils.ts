import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

// FORMAT DATE TIME
// FORMAT DATE TIME
export const formatDateTime = (
  dateString: Date | string,
  timeZone?: string
) => {
  // Options for different formatting needs
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: timeZone || "UTC", // Use the provided time zone or default to 'UTC'
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // two-digit month (e.g., '10')
    day: "2-digit", // two-digit day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  // Convert dateString to Date object if it's a string
  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;

  // Format the date/time using the provided options
  const formattedDateTime = new Intl.DateTimeFormat(
    "en-US",
    dateTimeOptions
  ).format(date);
  const formattedDateDay = new Intl.DateTimeFormat(
    "en-US",
    dateDayOptions
  ).format(date);
  const formattedDate = new Intl.DateTimeFormat("en-US", dateOptions).format(
    date
  );
  const formattedTime = new Intl.DateTimeFormat("en-US", timeOptions).format(
    date
  );

  // Return formatted date/time strings
  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function encryptKey(passkey: string) {
  return btoa(passkey);
}

export function decryptKey(passkey: string) {
  return atob(passkey);
}
