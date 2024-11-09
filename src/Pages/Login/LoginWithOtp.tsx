import { Link, useNavigate } from "react-router-dom";
import URLS from "../../Routes";
import Input from "../../Components/Input";
import CustomButton from "../../Components/Button";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import axiosInstance from "../../axios";
import { APIS } from "../../axios/apis";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/userSlice";

const LoginWithOtp = () => {
  const initialValues = {
    email: "test1@yopmail.com",
    otp: "",
  };
  const timerValue = 10;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState(initialValues.email);
  const [otp, setOtp] = useState(initialValues.otp);
  const [isSendOtp, setIsSendOtp] = useState(false);
  const [isLoading, setIsLoading] = useState({
    sendingOtp: false,
    login: false,
    resendOtp: false,
  });
  const [timer, setTimer] = useState(timerValue);

  const startTimer = () => {
    let interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  };

  const handleLoginWithOtp = async () => {
    try {
      setIsLoading({ ...isLoading, login: true });
      let response = await axiosInstance.post(APIS.LOGIN_WITH_OTP, {
        email,
        otp,
      });
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
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading({ ...isLoading, login: false });
    }
  };
  const sendOtp = async () => {
    try {
      setIsLoading({ ...isLoading, sendingOtp: true });
      let response = await axiosInstance.post(APIS.SEND_OTP, { email });
      if (response?.status === 200) {
        setIsSendOtp(true);
        toast.success(response?.data?.message);
        setTimer(timerValue);
        startTimer();
      } else {
        toast.error(response?.data?.message || "Something went wrong");
        setIsSendOtp(false);
      }
    } catch (error) {
      console.error(error);
      setIsSendOtp(false);
    } finally {
      setIsLoading({ ...isLoading, sendingOtp: false });
    }
  };

  const handleResendOtp = async () => {
    try {
      setIsLoading({ ...isLoading, resendOtp: true });
      let response = await axiosInstance.post(APIS.SEND_OTP, { email });
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        setTimer(timerValue);
        startTimer();
      } else {
        toast.error(response?.data?.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading({ ...isLoading, resendOtp: false });
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (isSendOtp) {
      handleLoginWithOtp();
    } else {
      sendOtp();
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <form className="flex w-[500px] flex-col gap-4" onSubmit={handleSubmit}>
        <div className="text-center text-xl">Login With OTP</div>
        <Input
          id="email1"
          name="email"
          type="email"
          label="Your email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          disabled={isSendOtp}
        />
        {isSendOtp ? (
          <Input
            id="otp1"
            name="number"
            type="otp"
            label="Enter OTP"
            placeholder="OTP"
            value={otp}
            onChange={handleOtpChange}
          />
        ) : null}
        <CustomButton
          type="submit"
          isLoading={isLoading.sendingOtp || isLoading.login}
        >
          {isSendOtp ? "Login" : "Send OTP"}
        </CustomButton>
        {isSendOtp ? (
          <div className="flex items-center justify-end">
            <CustomButton
              type="button"
              isLoading={isLoading.resendOtp}
              onClick={handleResendOtp}
              disabled={timer > 0}
            >
              Resend OTP {timer > 0 ? `in ${timer}s` : ""}
            </CustomButton>
          </div>
        ) : null}
        <div className="flex items-center justify-between">
          <Link to={URLS.Login}>Remember password?</Link>
          <Link to={URLS.ForgotPassword}>Loss password?</Link>
        </div>
        <div className="text-end">
          <Link to={URLS.SignUp}>Don't have an account?</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginWithOtp;
