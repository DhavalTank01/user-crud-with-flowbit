const APIS = {
  BASE_URL: process.env.REACT_APP_BASE_URL,
  LOGIN: "/auth/login", // POST
  LOGOUT: "/auth/logout", // PUT
  SIGNUP: "/user", // POST
  FORGOT_PASSWORD: "/auth/forgot-password", // POST
  SEND_OTP: "/auth/send-otp", // POST
  RESET_PASSWORD: "/auth/reset-password", // POST
  CHANGE_PASSWORD: "/auth/change-password", // POST
  LOGIN_WITH_OTP: "/auth/login-with-otp", // POST
  GET_CURRENT_USER: "/auth/me", // GET
  GET_USER_BY_TOKEN: "/auth/user-details", // GET
  GET_ALL_USERS: "/user", // POST
  CREATE_USER: "/user/add", // POST
  UPDATE_USER: (userId: string | number) => `/user/${userId}`, // PUT
  UPDATE_USER_ACTIVE_STATUS: (userId: number) =>
    `/user/activity-status/${userId}`, // PUT
  DELETE_USER: (userId: number) => `/user/${userId}`, // DELETE
  GET_USER: (userId: string) => `/user/${userId}`, // GET
  UPDATE_USER_STATUS: (userId: number) => `/user/toggle-status/${userId}`, // PUT
  CHECK_UNIQUE_EMAIL: "/auth/check-unique-email", // POST
};

export { APIS };
