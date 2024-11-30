import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import URLS from "./Routes";
import EditUser from "./Pages/Users/EditUser";
import AddUser from "./Pages/Users/AddUser";
import Users from "./Pages/Users";
import ChangePassword from "./Pages/Settings/ChangePassword";
import MyProfile from "./Pages/Settings/Profile";
import DashBoard from "./Pages/Dashboard";
import Header from "./Components/Header";
import TermsAndConditions from "./Pages/TermsAndConditions";
import { Footer } from "flowbite-react";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import ResetPassword from "./Pages/ResetPassword";
import ForgotPassword from "./Pages/ForgotPassword";
import LoginWithOtp from "./Pages/Login/LoginWithOtp";
import Login from "./Pages/Login";
import { CLIENT_PAGES } from "./constants";
import { User } from "./types/User";
import CustomSidebar from "./Components/Sidebar";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { login } from "./redux/slice/userSlice";
import axiosInstance from "./axios";
import { APIS } from "./axios/apis";
import { getCookie } from "./utils";
import secureLocalStorage from "react-secure-storage";
import { useDispatch } from "react-redux";
import useAuth from "./hooks/Auth";
import Roles from "./Pages/Roles";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, getUserAndToken } = useAuth();
  const [loading, setLoading] = useState(true);

  const restoreSessionIfClearLocalStorage = async () => {
    try {
      const token = secureLocalStorage.getItem("token");
      if (!token) {
        const backupToken = getCookie("backupToken");
        if (backupToken) {
          const response = await axiosInstance.get(APIS.GET_USER_BY_TOKEN);
          if (response?.status === 200) {
            const user = response.data.user;
            const token = response.data.user.token;
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

  const PrivateRoute = ({
    children,
    path,
  }: {
    children: JSX.Element;
    path?: string;
  }) => {
    if (!isAuthenticated()) {
      return <Navigate to={URLS.Login} replace />;
    }

    if (path && !isHaveAccess(path)) {
      return <Navigate to={URLS.Dashboard} replace />;
    }

    return children;
  };

  const SidebarWrapper = ({ children }: { children: JSX.Element }) => {
    return (
      <div className="flex h-screen flex-col">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <div className="fixed left-0 top-[60px] h-[calc(100vh-60px)] w-64">
            <CustomSidebar />
          </div>
          <div className="ml-64 flex flex-1 flex-col overflow-y-auto pt-[60px]">
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </div>
      </div>
    );
  };

  const PublicRoute = ({ children }: { children: JSX.Element }) => {
    return !isAuthenticated() ? (
      <div>
        <Header />
        {children}
        <Footer />
      </div>
    ) : (
      <Navigate to={URLS.Dashboard} replace />
    );
  };

  const isHaveAccess = (path: string) => {
    if (!isAuthenticated()) return false;
    const user = getUserAndToken()?.user as User;
    return user?.role === "client" ? CLIENT_PAGES.includes(path) : true;
  };

  return (
    <Routes>
      {/* Public Routes */}
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
        path={URLS.PrivacyPolicy}
        element={
          <div>
            <Header />
            <PrivacyPolicy />
            <Footer />
          </div>
        }
      />
      <Route
        path={URLS.TermsAndConditions}
        element={
          <div>
            <Header />
            <TermsAndConditions />
            <Footer />
          </div>
        }
      />

      {/* Private Routes */}
      <Route
        path={URLS.Dashboard}
        element={
          <PrivateRoute>
            <SidebarWrapper>
              <DashBoard />
            </SidebarWrapper>
          </PrivateRoute>
        }
      />
      <Route
        path={URLS.Profile}
        element={
          <PrivateRoute>
            <SidebarWrapper>
              <MyProfile />
            </SidebarWrapper>
          </PrivateRoute>
        }
      />
      <Route
        path={URLS.ChangePassword}
        element={
          <PrivateRoute>
            <SidebarWrapper>
              <ChangePassword />
            </SidebarWrapper>
          </PrivateRoute>
        }
      />
      <Route
        path={URLS.Users}
        element={
          <PrivateRoute path={URLS.Users}>
            <SidebarWrapper>
              <Users />
            </SidebarWrapper>
          </PrivateRoute>
        }
      />
      <Route
        path={URLS.AddUser}
        element={
          <PrivateRoute path={URLS.AddUser}>
            <SidebarWrapper>
              <AddUser />
            </SidebarWrapper>
          </PrivateRoute>
        }
      />
      <Route
        path={`${URLS.EditUser}/:id`}
        element={
          <PrivateRoute path={`${URLS.EditUser}/:id`}>
            <SidebarWrapper>
              <EditUser />
            </SidebarWrapper>
          </PrivateRoute>
        }
      />
      <Route
        path={URLS.Roles}
        element={
          <PrivateRoute path={URLS.Roles}>
            <SidebarWrapper>
              <Roles />
            </SidebarWrapper>
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to={URLS.Dashboard} replace />} />
    </Routes>
  );
};

export default App;
