import { Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { convertTextCase } from "../../utils";
import { HiEye, HiEyeOff } from "react-icons/hi"; // Import eye icons

interface InputPropsTypes {
  type?: string;
  name?: string;
  id: string;
  value?: string;
  label?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  helperText?: string | undefined;
  onFocus?: React.FocusEventHandler<HTMLInputElement> | undefined;
}

const Input = ({
  type = "text",
  name,
  id,
  value,
  label,
  placeholder,
  onChange,
  onBlur,
  onFocus,
  disabled,
  required,
  error,
  helperText,
  ...rest
}: InputPropsTypes) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="relative">
      {label ? (
        <div className={"mb-2 block"}>
          <Label htmlFor={id} value={label} />
        </div>
      ) : null}
      <TextInput
        id={id}
        name={name}
        type={showPassword && type === "password" ? "text" : type}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        value={value}
        disabled={disabled}
        autoComplete="off"
        color={error ? "failure" : undefined}
        helperText={convertTextCase(helperText, "errorMessage")}
        {...rest}
      />
      {type === "password" && (
        <button
          tabIndex={-1}
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-11 flex items-center text-gray-500"
          aria-label="Toggle password visibility"
        >
          {showPassword ? <HiEyeOff /> : <HiEye />}
        </button>
      )}
    </div>
  );
};

export default Input;
