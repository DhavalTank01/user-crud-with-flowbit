import React from "react";
import ComingSoon from "../../../Components/ComingSoon";
import CustomBreadcrumb from "../../../Components/CustomBreadcrumb";
import toast from "react-hot-toast";
import { APIS } from "../../../axios/apis";
import axiosInstance from "../../../axios";
import { useFormik } from "formik";
import useAuth from "../../../hooks/Auth";
import { User } from "../../../types/User";
import * as Yup from "yup";
import Input from "../../../Components/Input";
import CustomButton from "../../../Components/Button";
import { useNavigate } from "react-router-dom";
import URLS from "../../../Routes";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slice/userSlice";

const ChangePassword = () => {
  const currentUser = useAuth().getUserAndToken()?.user as User;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      current_password: Yup.string().required(),
      new_password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .required(),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("new_password"), undefined], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: async (values) => {
      try {
        let payload = {
          email: currentUser?.email,
          oldPassword: values?.current_password,
          newPassword: values?.new_password,
        };
        let response = await axiosInstance.post(APIS.CHANGE_PASSWORD, payload);
        if (response?.status === 200) {
          toast.success(response?.data?.message);
          formik.resetForm();
          dispatch(logout());
          navigate(URLS.Login);
        } else {
          toast.error(response?.data?.message || "Something went wrong");
        }
      } catch (error) {
        console.error(error);
      } finally {
        formik.resetForm();
      }
    },
  });
  return (
    <div>
      <CustomBreadcrumb pageTitle="Settings" pageSubTitle="Change Password" />
      <form onSubmit={formik.handleSubmit} className="p-4">
        <div className="mb-4 flex w-60 flex-col flex-wrap justify-start gap-4">
          <Input
            name="current_password"
            placeholder="Current Password"
            id="current_password"
            type="password"
            label="Current Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.current_password}
            error={!!formik.errors.current_password}
            helperText={formik.errors.current_password}
          />
          <Input
            name="new_password"
            placeholder="New Password"
            id="new_password"
            type="password"
            label="New Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.new_password}
            error={!!formik.errors.new_password}
            helperText={formik.errors.new_password}
          />
          <Input
            name="confirm_password"
            placeholder="Confirm Password"
            id="confirm_password"
            type="password"
            label="Confirm Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirm_password}
            error={!!formik.errors.confirm_password}
            helperText={formik.errors.confirm_password}
          />
        </div>
        <CustomButton
          type="submit"
          isLoading={formik.isSubmitting}
          disabled={!formik.isValid}
        >
          Change
        </CustomButton>
      </form>
    </div>
  );
};

export default ChangePassword;
