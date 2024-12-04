import { useEffect, useState } from "react";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import URLS from "../../Routes";
import { useFormik } from "formik";
import Input from "../../Components/Input";
import toast from "react-hot-toast";
import axiosInstance from "../../axios";
import { APIS } from "../../axios/apis";
import { useNavigate, useParams } from "react-router-dom";
import PageLoader from "../../Components/PageLoader";
import CustomButton from "../../Components/Button";
import SingleDatePicker from "../../Components/SingleDatePicker";
import CustomRadioGroup from "../../Components/CustomRadioGroup";
import * as Yup from "yup";
import { Label, ToggleSwitch } from "flowbite-react";
import { Role } from "../../types/Role";
import CustomSelect from "../../Components/CustomSelect";

const EditUser = () => {
  const params = useParams();
  const navigate = useNavigate();
  const initialValues = {
    first_name: "",
    last_name: "",
    phone_number: "",
    dob: "",
    role_id: "",
    is_disabled: false,
  };
  const [isLoading, setIsLoading] = useState({
    pageLoading: true,
  });
  const [roles, setRoles] = useState([] as Role[]);
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      first_name: Yup.string().required(),
      last_name: Yup.string().required(),
      phone_number: Yup.string().min(10).max(13).required(),
      dob: Yup.string().required(),
      role_id: Yup.number().required("Role is required"),
    }),
    onSubmit: (values) => {
      updateUser(values);
    },
  });

  const updateUser = async (values: any) => {
    try {
      let response = await axiosInstance.put(
        APIS.UPDATE_USER(params?.id || ""),
        values,
      );
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        navigate(URLS.Users);
      } else {
        toast.error(response?.data?.message || "Something went wrong");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading({ ...isLoading, pageLoading: false });
    }
  };

  const getUserById = async () => {
    try {
      let response = await axiosInstance.get(APIS.GET_USER(params?.id || ""));
      if (response?.status === 200) {
        formik.setValues({
          first_name: response?.data?.user?.first_name,
          last_name: response?.data?.user?.last_name,
          phone_number: response?.data?.user?.phone_number,
          dob: new Date(response?.data?.user?.dob).toString(),
          role_id: response?.data?.user?.role_id,
          is_disabled: response?.data?.user?.is_disabled,
        });
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading({ ...isLoading, pageLoading: false });
    }
  };

  const handleCancelClick = () => {
    navigate(URLS.Users);
  };

  useEffect(() => {
    getUserById();
  }, []);

  const getRolesList = async () => {
    try {
      const response = await axiosInstance.get(APIS.GET_ROLE_LIST);
      if (response.status === 200) {
        setRoles(response.data.roles);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getRolesList();
  }, []);

  return (
    <div>
      <CustomBreadcrumb
        pageTitle="Users"
        pageLink={URLS.Users}
        pageSubTitle="Edit User"
      />
      {isLoading.pageLoading ? (
        <PageLoader />
      ) : (
        <div className="w-80 p-4">
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <Input
              id="first_name"
              label="First Name"
              name="first_name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.first_name}
              onBlur={formik.handleBlur}
              error={!!formik.errors.first_name}
              helperText={formik.errors.first_name}
            />
            <Input
              id="last_name"
              label="Last Name"
              name="last_name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.last_name}
              onBlur={formik.handleBlur}
              error={!!formik.errors.last_name}
              helperText={formik.errors.last_name}
            />
            <Input
              id="phone_number"
              label="Phone Number"
              name="phone_number"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.phone_number}
              onBlur={formik.handleBlur}
              error={!!formik.errors.phone_number}
              helperText={formik.errors.phone_number}
            />
            <SingleDatePicker
              label="Date of Birth"
              name="dob"
              id="dob"
              value={!!formik.values.dob ? new Date(formik.values.dob) : null}
              onChange={(e: any) => {
                formik.setFieldValue("dob", e);
              }}
              onBlur={formik.handleBlur}
              maxDate={new Date()}
              error={!!formik.errors.dob}
              helperText={formik.errors.dob}
            />
            <CustomSelect
              parentClassName="w-full"
              value={formik.values.role_id}
              options={roles?.map((role) => ({
                value: role?.id,
                label: role?.name,
              }))}
              label="Role"
              name="role_id"
              id="role_id"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!formik.errors.role_id && formik.touched.role_id}
              helperText={
                formik.errors.role_id && formik.touched.role_id
                  ? formik.errors.role_id
                  : ""
              }
              isAddEmptyOption={true}
            />
            <div>
              <Label className="mb-2 block" htmlFor="statusToggle">
                Status
              </Label>
              <ToggleSwitch
                id="statusToggle"
                checked={!formik.values.is_disabled}
                onChange={(checked: boolean) =>
                  formik.setFieldValue("is_disabled", !checked)
                }
                label={formik.values.is_disabled ? "Inactive" : "Active"}
              />
            </div>

            <div className="flex justify-between align-middle">
              <CustomButton
                isLoading={formik.isSubmitting}
                disabled={!formik.isValid}
                type="submit"
              >
                Edit User
              </CustomButton>
              <CustomButton
                type="button"
                color="light"
                onClick={handleCancelClick}
                disabled={formik.isSubmitting}
              >
                Cancel
              </CustomButton>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditUser;
