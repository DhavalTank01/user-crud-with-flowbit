import React, { useEffect, useState } from "react";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import { Badge, Table, ToggleSwitch } from "flowbite-react";
import CustomPagination from "../../Components/CustomPagination";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import axiosInstance from "../../axios";
import { APIS } from "../../axios/apis";
import toast from "react-hot-toast";
import UserAvatar from "../../Components/UserAvatar";
import {
  generateUserId,
  getFormattedDate,
  getFullName,
  highlightText,
} from "../../utils";
import { User } from "../../types/User";
import useAuth from "../../hooks/Auth";
import ConfirmModel from "../../Components/ConfirmModel";
import CustomIconButton from "../../Components/CustomIconButton";
import PageLoader from "../../Components/PageLoader";
import CustomButton from "../../Components/Button";
import URLS from "../../Routes";
import { useNavigate } from "react-router-dom";
import { HiUserAdd } from "react-icons/hi";
import CustomUserRoleBadge from "../../Components/CustomUserRoleBadge";
import SortableHeader from "../../Components/SortableHeader";
import DebouncedSearch from "../../Components/DebouncedSearch";
import CustomSelect from "../../Components/CustomSelect";
import { USER_ROLES, USER_STATUS } from "../../constants";
import { FcClearFilters } from "react-icons/fc";

const Users = () => {
  const navigate = useNavigate();
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

  const [queryParams, setQueryParams] = useState({
    search: "",
    sortOrder: "asc",
    sortBy: "id",
    page: 1,
    limit: 10,
    role: "",
    filter_by: "",
    is_disabled: "",
  });

  // Fetch users whenever queryParams changes
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading((prev) => ({ ...prev, pageLoading: true }));
        const payload: {
          page: number;
          limit: number;
          search: string;
          sortOrder: string;
          sortBy: string;
          role?: string;
          filter_by?: string;
          is_disabled?: string;
        } = {
          page: queryParams.page,
          limit: queryParams.limit,
          search: queryParams.search,
          sortOrder: queryParams.sortOrder,
          sortBy: queryParams.sortBy,
        };

        if (queryParams.role && queryParams.role !== "all") {
          payload.role = queryParams.role;
        }

        if (queryParams.is_disabled && queryParams.is_disabled !== "all") {
          payload.is_disabled = queryParams.is_disabled;
        }

        const response = await axiosInstance.post(APIS.GET_ALL_USERS, payload);
        if (response.status === 200) {
          setUsers(response.data?.users);
          setTotalUsers(response.data?.totalCount);
        }
      } catch (error: any) {
        console.error(error);
        toast.error(error?.response?.data?.message || "Something went wrong");
      } finally {
        setIsLoading((prev) => ({ ...prev, pageLoading: false }));
      }
    };

    fetchUsers(); // Call the function inside the useEffect
  }, [queryParams]);

  const handlePageChange = (page: number) => {
    setQueryParams({ ...queryParams, page });
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newItemsPerPage = parseInt(event.target.value);
    setQueryParams({ ...queryParams, limit: newItemsPerPage, page: 1 });
  };

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

  const handleSearch = (searchTerm: string) => {
    setQueryParams((prev) => ({ ...prev, search: searchTerm, page: 1 }));
  };

  const resetFilters = () => {
    setQueryParams({
      ...queryParams,
      role: "",
      is_disabled: "",
      page: 1,
      search: "",
    });
  };

  return (
    <div className="overflow-hidden">
      <CustomBreadcrumb pageTitle="Users" />
      {isLoading.pageLoading ? (
        <PageLoader />
      ) : (
        <React.Fragment>
          <div className="sticky top-0 z-10 bg-white p-4">
            <div className="flex items-center justify-between">
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
            <div className="flex items-end gap-2">
              <div className="w-full">
                <DebouncedSearch
                  value={queryParams?.search}
                  onChange={(searchTerm: string) => handleSearch(searchTerm)}
                />
              </div>
              <CustomSelect
                parentClassName="w-full"
                value={queryParams?.role}
                options={USER_ROLES}
                name="role"
                id="role"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setQueryParams({
                    ...queryParams,
                    role: e.target.value,
                    page: 1,
                    filter_by: "role",
                  });
                }}
                label="Filter by Role"
              />
              <CustomSelect
                parentClassName="w-full"
                value={queryParams?.is_disabled}
                options={USER_STATUS}
                name="is_disabled"
                id="is_disabled"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setQueryParams({
                    ...queryParams,
                    filter_by: "is_disabled",
                    page: 1,
                    is_disabled: e.target.value,
                  });
                }}
                label="Filter by Status"
              />
              <CustomButton
                type="button"
                onClick={() => resetFilters()}
                disabled={
                  (!queryParams?.role &&
                    !queryParams?.is_disabled &&
                    !queryParams?.search) ||
                  queryParams?.role === "all" ||
                  queryParams?.is_disabled === "all"
                }
              >
                <div className="flex items-center gap-2">
                  <span>Reset</span>
                  <FcClearFilters />
                </div>
              </CustomButton>
            </div>
          </div>
          <div className="relative max-h-[500px] overflow-auto">
            <Table className="data-table">
              <Table.Head className="sticky top-0 z-10 bg-white shadow-md">
                <SortableHeader
                  label="User ID"
                  sortKey="id"
                  currentSort={queryParams}
                  onSortChange={(sortBy, sortOrder) =>
                    setQueryParams({ ...queryParams, sortBy, sortOrder })
                  }
                />
                <SortableHeader
                  label="Full Name"
                  sortKey="first_name"
                  currentSort={queryParams}
                  onSortChange={(sortBy, sortOrder) =>
                    setQueryParams({ ...queryParams, sortBy, sortOrder })
                  }
                />
                <SortableHeader
                  label="Email"
                  sortKey="email"
                  currentSort={queryParams}
                  onSortChange={(sortBy, sortOrder) =>
                    setQueryParams({ ...queryParams, sortBy, sortOrder })
                  }
                />
                <SortableHeader
                  label="Phone Number"
                  sortKey="phone_number"
                  currentSort={queryParams}
                  onSortChange={(sortBy, sortOrder) =>
                    setQueryParams({ ...queryParams, sortBy, sortOrder })
                  }
                />
                <SortableHeader
                  label="Role"
                  sortKey="role"
                  currentSort={queryParams}
                  onSortChange={(sortBy, sortOrder) =>
                    setQueryParams({ ...queryParams, sortBy, sortOrder })
                  }
                />
                <SortableHeader
                  label="Status"
                  sortKey="is_disabled"
                  currentSort={queryParams}
                  onSortChange={(sortBy, sortOrder) =>
                    setQueryParams({ ...queryParams, sortBy, sortOrder })
                  }
                />
                <SortableHeader
                  label="Last Login"
                  sortKey="last_login"
                  currentSort={queryParams}
                  onSortChange={(sortBy, sortOrder) =>
                    setQueryParams({ ...queryParams, sortBy, sortOrder })
                  }
                />
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {/* Table rows */}
                {users?.length ? (
                  users.map((user: User, index: number) => (
                    <Table.Row
                      key={index}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        <Badge className="w-min" color="indigo">
                          {generateUserId(user)}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          <UserAvatar user={user} />
                          <div>
                            {highlightText(
                              getFullName(user),
                              queryParams?.search,
                            )}
                          </div>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        {highlightText(user.email, queryParams?.search)}
                      </Table.Cell>
                      <Table.Cell>
                        {highlightText(user.phone_number, queryParams?.search)}
                      </Table.Cell>
                      <Table.Cell>
                        <CustomUserRoleBadge user={user} />
                      </Table.Cell>
                      <Table.Cell>
                        <ToggleSwitch
                          disabled={currentUser?.id === user.id}
                          checked={!user.is_disabled}
                          onChange={() => handleToggleUserStatus(user)}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        {getFormattedDate(
                          user.last_login,
                          "DD/MM/YYYY hh:mm:ss A",
                        )}
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
                  ))
                ) : (
                  <Table.Row>
                    <Table.Cell
                      height={300}
                      colSpan={10}
                      className="text-center"
                    >
                      <div>No Users Found</div>
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </div>
          <CustomPagination
            totalItems={totalUsers}
            onPageChange={handlePageChange}
            handleItemsPerPageChange={handleItemsPerPageChange}
            currentPage={queryParams.page}
            itemsPerPage={queryParams.limit}
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
