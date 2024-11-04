import secureLocalStorage from "react-secure-storage";

const useAuth = () => {
  const getUserAndToken = () => {
    return {
      token: secureLocalStorage.getItem("token") || null,
      user: secureLocalStorage.getItem("user") || null,
    };
  };

  const isAuthenticated = () => {
    const { token } = getUserAndToken();
    return !!token;
  };

  const isAccessToPage = () => {
    return true;
  };

  return { getUserAndToken, isAuthenticated, isAccessToPage };
};

export default useAuth;
