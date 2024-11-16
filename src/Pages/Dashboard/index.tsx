import { useSelector } from "react-redux";
import { getFullName } from "../../utils";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";

const DashBoard = () => {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div>
      <CustomBreadcrumb pageTitle="Dashboard" />
      <div className="m-4 mb-6 rounded-lg bg-blue-50 p-6">
        <h2 className="text-xl font-semibold text-blue-600">
          Hello, {getFullName(user)}
        </h2>
        <p className="text-gray-600">Welcome back!</p>
      </div>
    </div>
  );
};

export default DashBoard;
