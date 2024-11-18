import { Link, useNavigate } from "react-router-dom";
import URLS from "../../Routes";
import Input from "../../Components/Input";
import CustomButton from "../../Components/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../axios";
import { APIS } from "../../axios/apis";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/userSlice";
import toast from "react-hot-toast";
import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorMessage = secureLocalStorage.getItem("errorMessage") as string;
  interface FormValues {
    email: string;
    password: string;
  }
  const initialValues = {
    email: "test1@yopmail.com",
    password: "test@123",
  };

  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      loginUser(values);
    },
    enableReinitialize: true,
    validationSchema: schema,
  });

  const loginUser = async (values: FormValues) => {
    try {
      const response = await axiosInstance.post(APIS.LOGIN, values);
      if (response?.status === 200) {
        let token = response?.data?.token;
        let user = response?.data?.user;
        let backupToken = response?.data?.token;
        dispatch(login({ user, token, backupToken }));
        navigate(URLS.Dashboard);
        toast.success(response.data?.message || "Login successfully");
      } else {
        toast.error(response?.data?.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
    } finally {
      formik.setSubmitting(false);
    }
  };

  useEffect(() => {
    if (errorMessage?.length > 0) {
      toast.error(errorMessage || "Something went wrong");
      secureLocalStorage.removeItem("errorMessage");
    }
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <form
        className="flex w-[500px] flex-col gap-4"
        onSubmit={formik.handleSubmit}
      >
        <div className="text-center text-xl">Login</div>
        <Input
          id="email1"
          name="email"
          type="email"
          label="Your email"
          placeholder="Email"
          error={formik.errors.email ? true : false}
          helperText={formik.errors.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <Input
          id="password1"
          name="password"
          type="password"
          label="Your password"
          placeholder="Password"
          error={formik.errors.password ? true : false}
          helperText={formik.errors.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <CustomButton
          isLoading={formik.isSubmitting}
          disabled={!formik.isValid}
          type="submit"
        >
          Login
        </CustomButton>
        <div className="flex items-center justify-between">
          <Link to={URLS.LoginWithOtp}>Login with OTP?</Link>
          <Link to={URLS.ForgotPassword}>Loss password?</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
