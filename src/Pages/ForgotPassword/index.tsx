import { Link, useNavigate } from "react-router-dom";
import URLS from "../../Routes";
import Input from "../../Components/Input";
import CustomButton from "../../Components/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../axios";
import { APIS } from "../../axios/apis";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const initialValues = {
    email: "test1@yopmail.com",
  };
  const navigate = useNavigate();

  const scema = Yup.object().shape({
    email: Yup.string().email().required(),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: scema,
    onSubmit: (values) => {
      forgotPassword(values);
    },
  });

  const forgotPassword = async (values: any) => {
    try {
      const response = await axiosInstance.post(APIS.FORGOT_PASSWORD, values);
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

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <form
        className="flex w-[500px] flex-col gap-4"
        onSubmit={formik.handleSubmit}
      >
        <div className="text-center text-xl">Forgot Password</div>
        <Input
          id="email1"
          name="email"
          type="email"
          label="Your email"
          placeholder="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={Boolean(formik.errors.email)}
          helperText={formik.errors.email}
        />
        <CustomButton
          type="submit"
          disabled={!formik.isValid}
          isLoading={formik.isSubmitting}
        >
          Submit
        </CustomButton>
        <div className="flex items-center justify-between">
          <Link to={URLS.Login}>Remember password?</Link>
          <Link to={URLS.LoginWithOtp}>Login with OTP?</Link>
        </div>
        <div className="text-end">
          <Link to={URLS.SignUp}>Don't have an account?</Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
