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
  GET_ALL_USERS: "/user", // GET
  CREATE_USER: "/user", // POST
  UPDATE_USER: (userId: number) => `/user/${userId}`, // PUT
  DELETE_USER: (userId: number) => `/user/${userId}`, // DELETE
  GET_USER: (userId: number) => `/user/${userId}`, // GET
  UPDATE_USER_STATUS: (userId: number) => `/user/toggle-status/${userId}`, // PUT
};

export { APIS };
