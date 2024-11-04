import { Link } from "react-router-dom";
import URLS from "../../Routes";
import Input from "../../Components/Input";
import CustomButton from "../../Components/Button";

const SignUp = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <form className="flex w-[500px] flex-col gap-4" onSubmit={() => {}}>
        <div className="text-center text-xl">Sign Up</div>
        <Input
          name="first_name"
          placeholder="First name"
          id="first_name"
          label="First name"
          type="text"
        />
        <Input
          name="last_name"
          placeholder="Last name"
          id="last_name"
          label="Last name"
          type="text"
        />
        <Input
          name="Email"
          placeholder="Email"
          id="email"
          label="Email"
          type="email"
        />
        <Input
          name="phone_number"
          id="phone_number"
          label="Phone Number"
          type="number"
          placeholder="Phone Number"
        />
        <Input
          type="date"
          name="dob"
          id="dob"
          label="Date of Birth"
          placeholder="Date of Birth"
        />
        <Input
          name="Password"
          placeholder="Password"
          id="password"
          label="Password"
          type="password"
        />
        <CustomButton type="submit">Submit</CustomButton>
        <div className="flex items-center justify-between">
          <Link to={URLS.Login}>Remember password?</Link>
          <Link to={URLS.ForgotPassword}>Lost password?</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
