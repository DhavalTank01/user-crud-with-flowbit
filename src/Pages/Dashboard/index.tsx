import { Button } from "flowbite-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFullName } from "../../utils";
import { logout } from "../../redux/slice/userSlice";
import URLS from "../../Routes";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../../axios";
import { APIS } from "../../axios/apis";

const DashBoard = () => {
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState({
    logout: false,
  });

  const handleLogoutClick = async () => {
    try {
      setIsLoading({ ...isLoading, logout: true });
      let response = await axiosInstance.put(APIS.LOGOUT);
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        dispatch(logout());
        navigate(URLS.Login);
      } else {
        toast.error(response?.data?.message || "Something went wrong");
        navigate(URLS.Login);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading({ ...isLoading, logout: false });
    }
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <div>Hello {getFullName(user)}</div>
      <Button onClick={handleLogoutClick}>Logout</Button>
    </div>
  );
};

export default DashBoard;
