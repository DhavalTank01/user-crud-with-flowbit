import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Pages/Login";
import URLS from "./Routes";
import SignUp from "./Pages/SignUp";
import DashBoard from "./Pages/Dashboard";
import useAuth from "./hooks/Auth";
import LoginWithOtp from "./Pages/Login/LoginWithOtp";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import { useDispatch } from "react-redux";
import secureLocalStorage from "react-secure-storage";
import { getCookie } from "./utils";
import axiosInstance from "./axios";
import { APIS } from "./axios/apis";
import { login } from "./redux/slice/userSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated } = useAuth();
    if (isAuthenticated()) {
      return children;
    } else {
      return <Navigate to={URLS.Login} replace />;
    }
  };

  const PublicRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated()) {
      return children;
    } else {
      return <Navigate to={URLS.Dashboard} replace />;
    }
  };

  const restoreSessionIfClearLocalStorage = async () => {
    try {
      const token = secureLocalStorage.getItem("token");
      if (!token) {
        const backupToken = getCookie("backupToken");
        if (backupToken) {
          let response = await axiosInstance.get(APIS.GET_USER_BY_TOKEN);
          if (response?.status === 200) {
            let user = response?.data?.user;
            let token = response?.data?.user?.token;
            dispatch(login({ user, token }));
            navigate(URLS.Dashboard);
          } else {
            navigate(URLS.Login);
          }
        } else {
          navigate(URLS.Login);
        }
      } else {
        navigate(URLS.Dashboard);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    restoreSessionIfClearLocalStorage();
  }, []);

  return (
    <Routes>
      {/* public routes */}
      <Route
        path={URLS.Login}
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path={URLS.LoginWithOtp}
        element={
          <PublicRoute>
            <LoginWithOtp />
          </PublicRoute>
        }
      />
      <Route
        path={URLS.ForgotPassword}
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />
      <Route
        path={URLS.ResetPassword}
        element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        }
      />
      <Route
        path={URLS.SignUp}
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />
      {/* private routes */}
      <Route
        path={URLS.Dashboard}
        element={
          <PrivateRoute>
            <DashBoard />
          </PrivateRoute>
        }
      />
      <Route
        path="*"
        element={
          <PrivateRoute>
            <DashBoard />
          </PrivateRoute>
        }
      />
      <Route
        index
        element={
          <PrivateRoute>
            <DashBoard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
