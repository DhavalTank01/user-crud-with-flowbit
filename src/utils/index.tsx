import moment from "moment";
import { CaseType } from "../types";
import { User } from "../types/User";

const getCookie = (name: string): string | null => {
  const cookieString = document.cookie;
  const cookies = cookieString.split("; ").reduce(
    (acc, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key] = value;
      return acc;
    },
    {} as Record<string, string>,
  );

  return cookies[name] || null;
};

const setCookie = (name: string, value: string, expiresDays: number) => {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  const options = {
    expires: new Date(Date.now() + expiresDays * 24 * 60 * 60 * 1000),
    path: "/",
  };

  if (options.expires) {
    cookieString += `; expires=${options.expires.toUTCString()}`;
  }

  if (options.path) {
    cookieString += `; path=${options.path}`;
  }

  document.cookie = cookieString;
};

const clearAllCookies = () => {
  const cookies = document.cookie.split("; ");

  for (const cookie of cookies) {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.slice(0, eqPos) : cookie;

    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
};

const getFullName = (user: User): string => {
  if (!user) return "-";
  return convertTextCase(`${user?.first_name} ${user?.last_name}`, "titlecase");
};

const convertTextCase = (
  text: string | undefined,
  caseType: CaseType,
): string => {
  if (!text) return "";
  switch (caseType) {
    case "uppercase":
      return text.toUpperCase();
    case "lowercase":
      return text.toLowerCase();
    case "titlecase":
      return text
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    case "capitalize":
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    case "errorMessage":
      return text
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
        .replace("_", " ")
        .toLowerCase()
        .replace(/^\w/, (match) => match.toUpperCase());
    case "initialLetters":
      return text
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase())
        .join("");

    default:
      return text;
  }
};
const getFormattedDate = (
  date: string | undefined | null,
  dateFormat: string = "DD/MM/YYYY",
  inputFormat: string = "YYYY-MM-DDTHH:mm:ss.SSSZ",
): string | undefined => {
  if (!date) {
    return "-";
  }

  const dateObj = moment(date, inputFormat);
  return dateObj.isValid() ? dateObj.format(dateFormat) : undefined;
};

const classNames = (...classes: (string | undefined)[]): string => {
  return classes?.filter(Boolean).join(" ");
};

const generateUserId = (id: number) => {
  if (!id) {
    return "#0000";
  } else {
    return `#${id.toString().padStart(4, "0")}`;
  }
};

const highlightText = (text: string, searchTerm: string) => {
  if (!searchTerm) return text;

  const regex = new RegExp(`(${searchTerm})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    part.toLowerCase() === searchTerm.toLowerCase() ? (
      <span key={index} style={{ backgroundColor: "yellow" }}>
        {part}
      </span>
    ) : (
      part
    ),
  );
};

export {
  getCookie,
  setCookie,
  clearAllCookies,
  getFullName,
  convertTextCase,
  getFormattedDate,
  classNames,
  generateUserId,
  highlightText,
};
