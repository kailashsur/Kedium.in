import { customAlphabet } from "nanoid";

export function obfuscateEmail(email: string): string {
  // Validate the input
  if (email) {
    if (typeof email !== "string") {
      console.log("the email is not a string", email);
    }

    const email_id = email.trim();
    const domain = email_id.slice(email_id.indexOf("@"), email_id.length);
    const name = email_id.slice(0, email_id.indexOf("@"));
    const firstCharacter = name.charAt(0);
    const dots = ".".repeat(name.length - 1);
    const obfuscatedEmail = firstCharacter + dots + domain;
    return obfuscatedEmail;
  }
  return "";
}

export function Appwrite_ImageID(username: string): string {
  // Create a custom Nano ID generator with a length of 10 characters
  const nanoid = customAlphabet(
    "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    10,
  );

  // Generate a Nano ID
  const id = nanoid();

  return username + "-" + id;
}

export function formatDate(inputDate: string): string {
  const date = new Date(inputDate);

  // Get the month short name (e.g., 'Aug')
  const month = date.toLocaleString("default", { month: "short" });

  // Get the day of the month (e.g., '7')
  const day = date.getUTCDate();

  // Return formatted string
  return `${month} ${day}`;
}

export function fullDate(inputDate: string): string {
  return new Date(inputDate).toDateString();
}

export function NumberFormatter(number?: number): string {
  /* above 1000 'K', above 1000000 'M' etc... */
  if (number === undefined || number === null) {
    return "0"; // or handle this case as needed
  }

  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  }
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + "K";
  }

  return number.toString();
}
