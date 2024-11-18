import { HiChartPie, HiUser } from "react-icons/hi";
import URLS from "../Routes";

const DEFAULT_SIDE_BAR = [
  {
    name: "Dashboard",
    path: URLS.Dashboard,
    icon: HiChartPie,
  },
];

const ADMIN_SIDE_BAR = [
  {
    name: "Dashboard",
    path: URLS.Dashboard,
    icon: HiChartPie,
  },
  {
    name: "Users",
    path: URLS.Users,
    icon: HiUser,
  },
];

const CLIENT_PAGES = [
  URLS.Dashboard,
  URLS.Login,
  URLS.LoginWithOtp,
  URLS.TermsAndConditions,
  URLS.PrivacyPolicy,
  URLS.ResetPassword,
  URLS.ForgotPassword,
  URLS.ChangePassword,
  URLS.Profile,
];

const USER_ACTIVITY_STATUS = [
  {
    value: "online",
    label: "Online",
  },
  {
    value: "offline",
    label: "Offline",
  },
  {
    value: "busy",
    label: "Busy",
  },
  {
    value: "away",
    label: "Away",
  },
];

export { DEFAULT_SIDE_BAR, ADMIN_SIDE_BAR, CLIENT_PAGES, USER_ACTIVITY_STATUS };
