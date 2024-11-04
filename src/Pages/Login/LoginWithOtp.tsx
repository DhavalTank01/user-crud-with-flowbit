import { Link } from "react-router-dom";
import URLS from "../../Routes";
import Input from "../../Components/Input";
import CustomButton from "../../Components/Button";

const LoginWithOtp = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <form className="flex w-[500px] flex-col gap-4" onSubmit={() => {}}>
        <div className="text-center text-xl">Login With OTP</div>
        <Input
          id="email1"
          name="email"
          type="email"
          label="Your email"
          placeholder="Email"
        />
        <Input
          id="otp1"
          name="number"
          type="otp"
          label="Enter OTP"
          placeholder="OTP"
        />
        <CustomButton type="submit">Login</CustomButton>
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
