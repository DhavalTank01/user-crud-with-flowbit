import { Dropdown, Navbar } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { getFullName } from "../../utils";
import UserAvatar from "../UserAvatar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../../axios";
import toast from "react-hot-toast";
import URLS from "../../Routes";
import { logout } from "../../redux/slice/userSlice";
import { APIS } from "../../axios/apis";

function Header() {
  const { user, isAuthenticated } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState({
    logout: false,
  });
  const handleLogout = async () => {
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
    <Navbar fluid rounded>
      <Navbar.Brand>
        <Link to={isAuthenticated ? URLS.Dashboard : URLS.Login}>
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            CRUD App
          </span>
        </Link>
      </Navbar.Brand>
      {isAuthenticated ? (
        <div className="flex md:order-2">
          <Dropdown arrowIcon={false} inline label={<UserAvatar user={user} />}>
            <Dropdown.Header>
              <span className="block text-sm">{getFullName(user)}</span>
              <span className="block truncate text-sm font-medium">
                {user?.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item
              disabled={isLoading.logout}
              onClick={() => navigate(URLS.Dashboard)}
            >
              Dashboard
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => navigate(URLS.Profile)}>
              My Profile
            </Dropdown.Item>
            <Dropdown.Item onClick={() => navigate(URLS.ChangePassword)}>
              Change Password
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item disabled={isLoading.logout} onClick={handleLogout}>
              Logout
            </Dropdown.Item>
          </Dropdown>
        </div>
      ) : null}
    </Navbar>
  );
}

export default Header;
