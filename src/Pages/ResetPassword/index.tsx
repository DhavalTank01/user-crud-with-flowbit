import Input from "../../Components/Input";
import CustomButton from "../../Components/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../axios";
import { APIS } from "../../axios/apis";
import toast from "react-hot-toast";
import URLS from "../../Routes";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const initialValues = {
    password: "test@123",
    confirmPassword: "test@123",
  };

  const schema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Please confirm your password"),
  });

  const resetPassword = async (values: any) => {
    try {
      let payload = {
        password: values?.password,
        confirmPassword: values?.confirmPassword,
        reset_password_token: token,
      };
      const response = await axiosInstance.post(APIS.RESET_PASSWORD, payload);
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        navigate(URLS.Login);
      } else {
        toast.error(response?.data?.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
    } finally {
      formik.resetForm();
    }
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => {
      resetPassword(values);
    },
  });

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <form
        className="flex w-[500px] flex-col gap-4"
        onSubmit={formik.handleSubmit}
      >
        <div className="text-center text-xl">Reset Password</div>
        <Input
          type="password"
          name="password"
          id="password"
          label="Password"
          placeholder="Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          error={Boolean(formik.errors.password)}
          helperText={formik.errors.password}
        />
        <Input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          error={Boolean(formik.errors.confirmPassword)}
          helperText={formik.errors.confirmPassword}
        />
        <CustomButton
          type="submit"
          disabled={!formik.isValid}
          isLoading={formik.isSubmitting}
        >
          Reset
        </CustomButton>
      </form>
    </div>
  );
};

export default ResetPassword;
