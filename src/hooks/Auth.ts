import secureLocalStorage from "react-secure-storage";

const useAuth = () => {
  const getUserAndToken = () => {
    return {
      token: secureLocalStorage.getItem("token") || null,
      user: secureLocalStorage.getItem("user") || null,
    };
  };

  const isAuthenticated = () => {
    const data = getUserAndToken();
    return !!data?.token && !!data?.user;
  };

  const isAccessToPage = () => {
    return true;
  };

  return { getUserAndToken, isAuthenticated, isAccessToPage };
};

export default useAuth;
