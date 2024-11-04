import { Link } from "react-router-dom";
import URLS from "../../Routes";
import Input from "../../Components/Input";
import CustomButton from "../../Components/Button";

const Login = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <form className="flex w-[500px] flex-col gap-4" onSubmit={() => {}}>
        <div className="text-center text-xl">Login</div>
        <Input
          id="email1"
          name="email"
          type="email"
          label="Your email"
          placeholder="Email"
        />
        <Input
          id="password1"
          name="password"
          type="password"
          label="Your password"
          placeholder="Password"
          error={false}
          helperText=""
        />
        <CustomButton type="submit">Login</CustomButton>
        <div className="flex items-center justify-between">
          <Link to={URLS.LoginWithOtp}>Login with OTP?</Link>
          <Link to={URLS.ForgotPassword}>Loss password?</Link>
        </div>
        <div className="text-end">
          <Link to={URLS.SignUp}>Don't have an account?</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
