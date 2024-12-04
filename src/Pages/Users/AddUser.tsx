import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import Input from "../../Components/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { User } from "../../types/User";
import SingleDatePicker from "../../Components/SingleDatePicker";
import CustomButton from "../../Components/Button";
import axiosInstance from "../../axios";
import { APIS } from "../../axios/apis";
import CustomRadioGroup from "../../Components/CustomRadioGroup";
import URLS from "../../Routes";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CustomSelect from "../../Components/CustomSelect";
import { Role } from "../../types/Role";
import { useEffect, useState } from "react";

const AddUser = () => {
  const navigate = useNavigate();
  const initialValues = {
    first_name: "",
    last_name: "",
    phone_number: "",
    dob: "",
    email: "",
    role_id: "",
  };

  const [roles, setRoles] = useState([] as Role[]);
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      first_name: Yup.string().required(),
      last_name: Yup.string().required(),
      phone_number: Yup.string().min(10).max(13).required(),
      dob: Yup.string().required(),
      email: Yup.string().email().required(),
      role_id: Yup.number().required("Role is required"),
    }),
    onSubmit: (values) => {
      addUser(values as User);
    },
  });

  const addUser = async (user: User) => {
    try {
      let response = await axiosInstance.post(APIS.CREATE_USER, user);
      if (response?.status === 201) {
        toast.success(response?.data?.message);
        navigate(URLS.Users);
      } else {
        toast.error(response?.data?.message || "Something went wrong");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      formik.resetForm();
    }
  };

  const checkUniqueEmail = async (email: string) => {
    try {
      const response = await axiosInstance.post(APIS.CHECK_UNIQUE_EMAIL, {
        email,
      });
      if (response?.status === 200) {
        if (response?.data?.isExist) {
          formik.setErrors({ ...formik.errors, email: "Email already exist" });
        } else {
          formik.setErrors({ ...formik.errors });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelClick = () => {
    navigate(URLS.Users);
  };

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
        pageSubTitle="Add User"
      />
      <div className="w-80 p-4">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <Input
            name="first_name"
            placeholder="First name"
            id="first_name"
            label="First name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.first_name}
            error={!!formik.errors.first_name && formik.touched.first_name}
            helperText={
              formik.errors.first_name && formik.touched.first_name
                ? formik.errors.first_name
                : ""
            }
          />
          <Input
            name="last_name"
            placeholder="Last name"
            id="last_name"
            label="Last name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.last_name}
            error={!!formik.errors.last_name && formik.touched.last_name}
            helperText={
              formik.errors.last_name && formik.touched.last_name
                ? formik.errors.last_name
                : ""
            }
          />
          <Input
            name="email"
            placeholder="Email"
            id="email"
            label="Email"
            type="email"
            onChange={formik.handleChange}
            onBlur={(e) => {
              formik.handleBlur(e);
              checkUniqueEmail(formik.values.email);
            }}
            value={formik.values.email}
            error={!!formik.errors.email && formik.touched.email}
            helperText={
              formik.errors.email && formik.touched.email
                ? formik.errors.email
                : ""
            }
          />
          <Input
            name="phone_number"
            placeholder="Phone number"
            id="phone_number"
            label="Phone number"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone_number}
            error={!!formik.errors.phone_number && formik.touched.phone_number}
            helperText={
              formik.errors.phone_number && formik.touched.phone_number
                ? formik.errors.phone_number
                : ""
            }
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
            error={!!formik.errors.dob && formik.touched.dob}
            helperText={
              formik.errors.dob && formik.touched.dob ? formik.errors.dob : ""
            }
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
          <div className="flex justify-between align-middle">
            <CustomButton
              isLoading={formik.isSubmitting}
              disabled={!formik.isValid}
              type="submit"
            >
              Add User
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
    </div>
  );
};

export default AddUser;
