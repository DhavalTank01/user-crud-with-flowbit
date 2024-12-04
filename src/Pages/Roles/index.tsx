import React, { useEffect, useState } from "react";
import CustomButton from "../../Components/Button";
import CustomSelect from "../../Components/CustomSelect";
import DebouncedSearch from "../../Components/DebouncedSearch";
import { HiUserAdd } from "react-icons/hi";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import PageLoader from "../../Components/PageLoader";
import { useNavigate } from "react-router-dom";
import URLS from "../../Routes";
import { USER_ROLES, USER_STATUS } from "../../constants";
import { FcClearFilters } from "react-icons/fc";
import axiosInstance from "../../axios";
import { APIS } from "../../axios/apis";
import { Badge, Table, ToggleSwitch } from "flowbite-react";
import SortableHeader from "../../Components/SortableHeader";
import { convertTextCase, generateUserId, highlightText } from "../../utils";
import toast from "react-hot-toast";
import CustomIconButton from "../../Components/CustomIconButton";
import { MdDelete, MdEdit } from "react-icons/md";
import CustomPagination from "../../Components/CustomPagination";
import ConfirmModel from "../../Components/ConfirmModel";
import CustomModel from "../../Components/CustomModel";
import Input from "../../Components/Input";

interface Roles {
  id: number;
  name: string;
  is_disabled: boolean;
}

const Roles = () => {
  const [isLoading, setIsLoading] = useState({
    pageLoading: true,
    deleteUser: false,
    editUser: false,
    userToggle: false,
    addUser: false,
  });
  const [modelDetails, setModelDetails] = useState<{
    isShow: boolean;
    role: Partial<Roles>;
    error?: {
      name?: string;
    };
    type: string;
    title?: string;
  }>({
    isShow: false,
    role: {},
    type: "",
    title: "",
    error: {},
  });

  const navigate = useNavigate();
  const [queryParams, setQueryParams] = useState({
    search: "",
    page: 1,
    limit: 10,
    sortBy: "name",
    sortOrder: "asc",
    filter_by: "is_disabled",
    is_disabled: "all",
  });
  const [totalRoles, setTotalRoles] = useState(0);
  const [roles, setRoles] = useState([] as Roles[]);

  const handleSearch = (searchTerm: string) => {
    setQueryParams({ ...queryParams, search: searchTerm, page: 1 });
  };

  const resetFilters = () => {
    setQueryParams({
      ...queryParams,
      is_disabled: "all",
      page: 1,
      search: "",
      sortBy: "name",
      sortOrder: "asc",
    });
  };

  // Fetch roles whenever queryParams changes
  const fetchRoles = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, pageLoading: true }));
      const payload: {
        page: number;
        limit: number;
        search: string;
        sortBy: string;
        sortOrder: string;
        filter_by?: string;
        is_disabled?: boolean;
      } = {
        page: queryParams.page,
        limit: queryParams.limit,
        search: queryParams.search,
        sortBy: queryParams.sortBy,
        sortOrder: queryParams.sortOrder,
      };
      if (queryParams.is_disabled && queryParams.is_disabled !== "all") {
        payload.is_disabled = queryParams.is_disabled === "true" ? true : false;
      }

      const response = await axiosInstance.post(APIS.GET_ALL_ROLES, payload);
      if (response.status === 200) {
        setTotalRoles(response.data.totalCount);
        setRoles(response.data.roles);
      } else {
        setTotalRoles(0);
      }
      setIsLoading((prev) => ({ ...prev, pageLoading: false }));
    } catch (error) {
      setIsLoading((prev) => ({ ...prev, pageLoading: false }));
    }
  };

  useEffect(() => {
    fetchRoles();
  }, [queryParams]);

  const handleToggleRoleStatus = async (role: Roles) => {
    try {
      setIsLoading({ ...isLoading, userToggle: true });
      let response = await axiosInstance.put(APIS.UPDATE_ROLE_STATUS(role.id));
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        let newUsers = roles?.map((u: Roles) => {
          if (u.id === role.id) {
            return { ...u, is_disabled: !u?.is_disabled };
          }
          return u;
        }) as Roles[];
        setRoles(newUsers);
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

  const handleEditClick = (role: Roles) => {
    setModelDetails({
      isShow: true,
      role: role as Roles,
      type: "edit",
      title: "Edit Role",
    });
  };

  const handleDeleteClick = (role: Roles) => {
    setModelDetails({
      isShow: true,
      role: role as Roles,
      type: "delete",
    });
  };

  const handlePageChange = (page: number) => {
    setQueryParams({ ...queryParams, page });
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newItemsPerPage = parseInt(event.target.value);
    setQueryParams({ ...queryParams, limit: newItemsPerPage, page: 1 });
  };

  const handleDeleteUser = async (role: Roles) => {
    try {
      setIsLoading({ ...isLoading, deleteUser: true });
      let response = await axiosInstance.delete(APIS.DELETE_ROLE(role?.id));
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        let newUsers = roles.filter((u: Roles) => u.id !== role.id);
        setRoles(newUsers);
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

  const handleEditUser = async (role: Roles) => {
    try {
      setIsLoading({ ...isLoading, editUser: true });
      role.name = convertTextCase(role.name, "titlecase");
      let response = await axiosInstance.put(APIS.UPDATE_ROLE(role?.id), {
        name: role?.name,
      });
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        let newUsers = roles?.map((u: Roles) => {
          if (u.id === role.id) {
            return { ...u, ...role };
          }
          return u;
        }) as Roles[];
        setRoles(newUsers);
        handleClose();
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading({ ...isLoading, editUser: false });
    }
  };

  const handleAddUser = async (role: Roles) => {
    try {
      setIsLoading({ ...isLoading, addUser: true });
      let response = await axiosInstance.post(APIS.CREATE_ROLE, {
        name: role?.name,
      });
      if (response?.status === 201) {
        toast.success(response?.data?.message);
        fetchRoles();
        handleClose();
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading({ ...isLoading, addUser: false });
    }
  };

  const handleClose = () => {
    setModelDetails({
      isShow: false,
      role: {},
      type: "",
      title: "",
    });
  };

  const handleAddClick = () => {
    setModelDetails({
      isShow: true,
      role: {},
      type: "add",
      title: "Add Role",
    });
  };

  return (
    <div className="overflow-hidden">
      <CustomBreadcrumb pageTitle="Roles" />
      {isLoading.pageLoading ? (
        <PageLoader />
      ) : (
        <React.Fragment>
          <div className="sticky top-0 z-10 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>Roles ({totalRoles || 0})</div>
              <CustomButton
                type="button"
                color="light"
                onClick={() => {
                  handleAddClick();
                }}
              >
                <div className="flex items-center gap-2">
                  <span>Add Role</span>
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
                value={queryParams?.is_disabled}
                options={USER_STATUS}
                name="is_disabled"
                id="is_disabled"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setQueryParams({
                    ...queryParams,
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
                  queryParams.is_disabled === "all" && queryParams.search === ""
                }
              >
                <div className="flex items-center gap-2">
                  <span>Reset</span>
                  <FcClearFilters />
                </div>
              </CustomButton>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <SortableHeader
                  label="ID"
                  sortKey="id"
                  currentSort={queryParams}
                  onSortChange={(sortBy, sortOrder) =>
                    setQueryParams({ ...queryParams, sortBy, sortOrder })
                  }
                />
                <SortableHeader
                  label="Name"
                  sortKey="name"
                  currentSort={queryParams}
                  onSortChange={(sortBy, sortOrder) =>
                    setQueryParams({ ...queryParams, sortBy, sortOrder })
                  }
                />
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {roles?.length ? (
                  roles.map((role: Roles, index: number) => (
                    <Table.Row
                      key={index}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        <Badge className="w-min" color="indigo">
                          {generateUserId(role.id)}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>
                        {highlightText(role.name, queryParams?.search)}
                      </Table.Cell>
                      <Table.Cell>
                        <ToggleSwitch
                          disabled={false}
                          checked={!role.is_disabled}
                          onChange={() => handleToggleRoleStatus(role)}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex gap-4 align-middle">
                          <CustomIconButton
                            onClick={() => handleEditClick(role)}
                            className="text-blue-500 hover:text-blue-700"
                            disabled={false}
                          >
                            <MdEdit />
                          </CustomIconButton>
                          <CustomIconButton
                            disabled={false}
                            onClick={() => handleDeleteClick(role)}
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
                      <div>No Roles Found</div>
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </div>
          <CustomPagination
            totalItems={totalRoles}
            onPageChange={handlePageChange}
            handleItemsPerPageChange={handleItemsPerPageChange}
            currentPage={queryParams.page}
            itemsPerPage={queryParams.limit}
          />
          <ConfirmModel
            isShow={modelDetails?.isShow && modelDetails?.type === "delete"}
            onClose={handleClose}
            onApprove={() => handleDeleteUser(modelDetails?.role as Roles)}
            onReject={handleClose}
            modelDetails={modelDetails}
            approveButtonText="Delete"
            rejectButtonText="Cancel"
            typeColorClass="text-red-500"
            approveButtonColor="failure"
            isLoading={isLoading.deleteUser}
          />
          <CustomModel
            isShow={
              modelDetails?.isShow &&
              (modelDetails?.type === "edit" || modelDetails?.type === "add")
            }
            onClose={handleClose}
            onApprove={() => {
              if (modelDetails?.type === "add") {
                handleAddUser(modelDetails?.role as Roles);
              } else {
                handleEditUser(modelDetails?.role as Roles);
              }
            }}
            onReject={handleClose}
            modelDetails={modelDetails}
            approveButtonText={modelDetails?.type === "add" ? "Add" : "Edit"}
            rejectButtonText="Cancel"
            isLoading={isLoading.addUser || isLoading.editUser}
            isError={!modelDetails?.role?.name}
          >
            <form className="p-4">
              <Input
                label="Name"
                type="text"
                id="name"
                name="name"
                value={modelDetails?.role?.name || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setModelDetails({
                    ...modelDetails,
                    role: {
                      ...modelDetails?.role,
                      name: e.target.value,
                    },
                  })
                }
                onFocus={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setModelDetails({
                    ...modelDetails,
                    error: {
                      ...modelDetails?.error,
                      name: "",
                    },
                  });
                }}
                onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setModelDetails({
                    ...modelDetails,
                    error: {
                      ...modelDetails?.error,
                      name: !e.target.value ? "name is required" : "",
                    },
                  });
                }}
                placeholder="Enter Role Name"
                required={true}
                error={!!modelDetails?.error?.name}
                helperText={
                  !!modelDetails?.error?.name ? "name is required" : undefined
                }
              />
            </form>
          </CustomModel>
        </React.Fragment>
      )}
    </div>
  );
};

export default Roles;
