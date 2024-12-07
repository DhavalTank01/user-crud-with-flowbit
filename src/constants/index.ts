import { HiChartPie, HiUser } from "react-icons/hi";
import { CiCircleList } from "react-icons/ci";
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
  {
    name: "Roles",
    path: URLS.Roles,
    icon: CiCircleList,
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

const USER_ROLES = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "client",
    label: "Client",
  },
];

const USER_STATUS = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "false",
    label: "Active",
  },
  {
    value: "true",
    label: "Disabled",
  },
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

export {
  DEFAULT_SIDE_BAR,
  ADMIN_SIDE_BAR,
  CLIENT_PAGES,
  USER_ACTIVITY_STATUS,
  USER_ROLES,
  USER_STATUS,
};
