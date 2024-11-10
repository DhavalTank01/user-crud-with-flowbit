import { Sidebar } from "flowbite-react";
import { HiChartPie, HiUser } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import URLS from "../../Routes";

const CustomSidebar = () => {
  const navigate = useNavigate();
  const isActive = (path: string) => {
    console.log(window.location.pathname);
    console.log(path);
    return window.location.pathname === path;
  };

  return (
    <Sidebar
      aria-label="Sidebar with multi-level dropdown example"
      className="side-bar"
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            onClick={() => navigate(URLS.Dashboard)}
            icon={HiChartPie}
            active={isActive(URLS.Dashboard)}
            className="cursor-pointer"
          >
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item
            active={isActive(URLS.Users)}
            onClick={() => navigate(URLS.Users)}
            icon={HiUser}
            className="cursor-pointer"
          >
            Users
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default CustomSidebar;
