import { Dropdown, Navbar } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { getFullName } from "../../utils";
import UserAvatar from "../UserAvatar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../../axios";
import toast from "react-hot-toast";
import URLS from "../../Routes";
import { logout, setCurrentUser } from "../../redux/slice/userSlice";
import { APIS } from "../../axios/apis";
import CustomSelect from "../CustomSelect";
import { USER_ACTIVITY_STATUS } from "../../constants";

function Header() {
  const { user, isAuthenticated } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState({
    logout: false,
    updateActivityStatus: false,
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

  const handleActivityStatusChange = async (e: any) => {
    try {
      setIsLoading({ ...isLoading, updateActivityStatus: true });
      let payload = {
        activity_status: e?.target?.value,
      };
      let response = await axiosInstance.put(
        APIS.UPDATE_USER_ACTIVE_STATUS(user?.id),
        payload,
      );
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        dispatch(setCurrentUser(response?.data?.user));
      } else {
        toast.error(response?.data?.message || "Something went wrong");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading({ ...isLoading, updateActivityStatus: false });
    }
  };

  return (
    <Navbar fluid rounded className="h-15 fixed left-0 right-0 top-0 z-20">
      <Navbar.Brand>
        <span
          className="cursor-pointer self-center whitespace-nowrap text-xl font-semibold dark:text-white"
          onClick={() =>
            navigate(isAuthenticated ? URLS.Dashboard : URLS.Login)
          }
        >
          CRUD App
        </span>
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
            <Dropdown.Item disabled>
              <CustomSelect
                parentClassName="w-full"
                value={user?.activity_status}
                options={USER_ACTIVITY_STATUS}
                name="activity_status"
                id="activity_status"
                onChange={handleActivityStatusChange}
                disabled={isLoading.updateActivityStatus}
              />
            </Dropdown.Item>
            <Dropdown.Divider />
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
