import { Sidebar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/Auth";
import { User } from "../../types/User";
import { ADMIN_SIDE_BAR, DEFAULT_SIDE_BAR } from "../../constants";

const CustomSidebar = () => {
  const navigate = useNavigate();
  const currentUser = useAuth()?.getUserAndToken()?.user as User;
  const isActive = (path: string) => {
    return window.location.pathname === path;
  };

  let role = currentUser?.role?.name;
  let isAdmin = role === "Admin";
  let SIDEBAR = isAdmin ? ADMIN_SIDE_BAR : DEFAULT_SIDE_BAR;

  return (
    <Sidebar
      aria-label="Sidebar with multi-level dropdown example"
      className="side-bar"
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {SIDEBAR.map((item) => (
            <Sidebar.Item
              key={item.name}
              onClick={() => navigate(item.path)}
              icon={item.icon}
              active={isActive(item.path)}
              className="cursor-pointer"
            >
              {item.name}
            </Sidebar.Item>
          ))}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default CustomSidebar;
