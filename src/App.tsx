import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import DashBoard from "./Pages/Dashboard";
import URLS from "./Routes";
import SignUp from "./Pages/SignUp";
import ResetPassword from "./Pages/ResetPassword";
import ForgotPassword from "./Pages/ForgotPassword";
import LoginWithOtp from "./Pages/Login/LoginWithOtp";
import Login from "./Pages/Login";
import toast from "react-hot-toast";
import { login } from "./redux/slice/userSlice";
import axiosInstance from "./axios";
import { APIS } from "./axios/apis";
import { getCookie } from "./utils";
import secureLocalStorage from "react-secure-storage";
import useAuth from "./hooks/Auth";
import { useDispatch } from "react-redux";
import MyProfile from "./Pages/Settings/Profile";
import ChangePassword from "./Pages/Settings/ChangePassword";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsAndConditions from "./Pages/TermsAndConditions";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

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
          }
        }
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    restoreSessionIfClearLocalStorage();
  }, []);

  if (loading) return <div>Loading...</div>;

  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    return isAuthenticated() ? children : <Navigate to={URLS.Login} replace />;
  };

  const PublicRoute = ({ children }: { children: JSX.Element }) => {
    return !isAuthenticated() ? (
      children
    ) : (
      <Navigate to={URLS.Dashboard} replace />
    );
  };

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
      <Route path={URLS.PrivacyPolicy} element={<PrivacyPolicy />} />
      <Route path={URLS.TermsAndConditions} element={<TermsAndConditions />} />
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
        path={URLS.Profile}
        element={
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        }
      />
      <Route
        path={URLS.ChangePassword}
        element={
          <PrivateRoute>
            <ChangePassword />
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
};

export default App;
