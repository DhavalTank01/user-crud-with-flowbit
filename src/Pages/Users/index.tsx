import React, { useCallback, useEffect, useState } from "react";
import ComingSoon from "../../Components/ComingSoon";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import { Pagination, Table, ToggleSwitch } from "flowbite-react";
import CustomPagination from "../../Components/CustomPagination";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import axiosInstance from "../../axios";
import { APIS } from "../../axios/apis";
import toast from "react-hot-toast";
import UserAvatar from "../../Components/UserAvatar";
import { convertTextCase, getFullName } from "../../utils";
import { User } from "../../types/User";
import useAuth from "../../hooks/Auth";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [users, setUsers] = useState([]);
  const currentUser = useAuth()?.getUserAndToken()?.user as User;
  const [isLoading, setIsLoading] = useState({
    pageLoading: true,
    userToggle: false,
    deleteUser: false,
  });

  useEffect(() => {
    getUsers();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const getUsers = useCallback(async () => {
    try {
      setIsLoading({ ...isLoading, pageLoading: true });
      let response = await axiosInstance.get(APIS.GET_ALL_USERS);
      if (response?.status === 200) {
        setUsers(response?.data?.users);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading({ ...isLoading, pageLoading: false });
    }
  }, []);

  const handleEditClick = (user: User) => {};
  const handleDeleteClick = (user: User) => {};

  const handleToggleUserStatus = async (user: User) => {
    try {
      setIsLoading({ ...isLoading, userToggle: true });
      let response = await axiosInstance.put(APIS.UPDATE_USER_STATUS(user.id));
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        await getUsers();
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading({ ...isLoading, userToggle: false });
    }
  };

  return (
    <div>
      <CustomBreadcrumb pageTitle="Users" />
      <div className="max-h-[500px] overflow-y-auto">
        <Table className="data-table" hoverable>
          <Table.Head>
            <Table.HeadCell>User ID</Table.HeadCell>
            <Table.HeadCell>Full Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Phone Number</Table.HeadCell>
            <Table.HeadCell>Role</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {/* Table rows */}
            {users.map((user: any, index: number) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  #{user.id}
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <UserAvatar user={user} />
                    <div>{getFullName(user)}</div>
                  </div>
                </Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.phone_number}</Table.Cell>
                <Table.Cell>
                  {convertTextCase(user.role, "titlecase")}
                </Table.Cell>
                <Table.Cell>
                  <ToggleSwitch
                    disabled={currentUser?.id === user.id}
                    checked={!user.is_disabled}
                    label={!user.is_disabled ? "Active" : "Disabled"}
                    onChange={() => handleToggleUserStatus(user)}
                  />
                </Table.Cell>
                <Table.Cell className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <MdEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(user)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <MdDelete />
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
            {/* Add additional rows as needed */}
          </Table.Body>
        </Table>
      </div>
      <CustomPagination
        totalItems={100}
        onPageChange={handlePageChange}
        handleItemsPerPageChange={handleItemsPerPageChange}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default Users;
