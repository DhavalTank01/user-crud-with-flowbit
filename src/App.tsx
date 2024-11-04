import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import URLS from "./Routes";
import SignUp from "./Pages/SignUp";
import DashBoard from "./Pages/Dashboard";
import useAuth from "./hooks/Auth";
import LoginWithOtp from "./Pages/Login/LoginWithOtp";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";

function App() {
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

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
