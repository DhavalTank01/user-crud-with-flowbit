import React, { useCallback, useEffect, useState } from "react";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import { Table, ToggleSwitch } from "flowbite-react";
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
import ConfirmModel from "../../Components/ConfirmModel";
import CustomIconButton from "../../Components/CustomIconButton";
import PageLoader from "../../Components/PageLoader";
import CustomButton from "../../Components/Button";
import URLS from "../../Routes";
import { useNavigate } from "react-router-dom";
import { HiUserAdd } from "react-icons/hi";

const Users = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [users, setUsers] = useState([] as User[]);
  const [totalUsers, setTotalUsers] = useState(0);
  const currentUser = useAuth()?.getUserAndToken()?.user as User;
  const [isLoading, setIsLoading] = useState({
    pageLoading: true,
    userToggle: false,
    deleteUser: false,
  });
  const [modelDetails, setModelDetails] = useState({
    isShow: false,
    user: {},
    type: "",
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
        setTotalUsers(response?.data?.totalCount);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading({ ...isLoading, pageLoading: false });
    }
  }, []);

  const handleEditClick = (user: User) => {
    navigate(`${URLS.EditUser}/${user.id}`);
  };
  const handleDeleteClick = (user: User) => {
    setModelDetails({
      isShow: true,
      user,
      type: "delete",
    });
  };

  const handleToggleUserStatus = async (user: User) => {
    try {
      setIsLoading({ ...isLoading, userToggle: true });
      let response = await axiosInstance.put(APIS.UPDATE_USER_STATUS(user.id));
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        let newUsers = users?.map((u: User) => {
          if (u.id === user.id) {
            return { ...u, is_disabled: !u?.is_disabled };
          }
          return u;
        }) as User[];
        setUsers(newUsers);
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

  const handleDeleteUser = async (user: User) => {
    try {
      setIsLoading({ ...isLoading, deleteUser: true });
      let response = await axiosInstance.delete(APIS.DELETE_USER(user?.id));
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        let newUsers = users.filter((u: User) => u.id !== user.id);
        setUsers(newUsers);
        handleClose();
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading({ ...isLoading, deleteUser: false });
    }
  };

  const handleClose = () => {
    setModelDetails({
      isShow: false,
      user: {},
      type: "",
    });
  };

  return (
    <div>
      <CustomBreadcrumb pageTitle="Users" />
      {isLoading.pageLoading ? (
        <PageLoader />
      ) : (
        <React.Fragment>
          <div className="mb-4 flex items-center justify-between p-4">
            <div>Users ({totalUsers})</div>
            <CustomButton
              type="button"
              color="light"
              onClick={() => {
                navigate(URLS.AddUser);
              }}
            >
              <div className="flex items-center gap-2">
                <span>Add User</span>
                <HiUserAdd />
              </div>
            </CustomButton>
          </div>
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
                        onChange={() => handleToggleUserStatus(user)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-4 align-middle">
                        <CustomIconButton
                          onClick={() => handleEditClick(user)}
                          className="text-blue-500 hover:text-blue-700"
                          disabled={currentUser?.id === user.id}
                        >
                          <MdEdit />
                        </CustomIconButton>
                        <CustomIconButton
                          disabled={currentUser?.id === user.id}
                          onClick={() => handleDeleteClick(user)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <MdDelete />
                        </CustomIconButton>
                      </div>
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
          <ConfirmModel
            isShow={modelDetails?.isShow}
            onClose={handleClose}
            onApprove={() => handleDeleteUser(modelDetails?.user as User)}
            onReject={handleClose}
            modelDetails={modelDetails}
            approveButtonText="Delete"
            rejectButtonText="Cancel"
            typeColorClass="text-red-500"
            approveButtonColor="failure"
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default Users;
