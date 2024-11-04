import { Link } from "react-router-dom";
import URLS from "../../Routes";
import Input from "../../Components/Input";
import CustomButton from "../../Components/Button";

const ResetPassword = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <form className="flex w-[500px] flex-col gap-4" onSubmit={() => {}}>
        <div className="text-center text-xl">Reset Password</div>
        <Input
          type="password"
          name="password"
          id="password"
          label="Password"
          placeholder="Password"
        />
        <Input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm Password"
        />
        <CustomButton type="submit">Reset</CustomButton>
      </form>
    </div>
  );
};

export default ResetPassword;
