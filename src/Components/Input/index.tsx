import { Label, TextInput } from "flowbite-react";
import React, { ChangeEvent } from "react";

interface InputPropsTypes {
  type?: string;
  name?: string; // Changed `name` to be an optional string
  id: string;
  value?: string;
  label?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<Element>) => void;
  onBlur?: (e: ChangeEvent<Element>) => void;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  helperText?: string | undefined;
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
  disabled,
  required,
  error,
  helperText,
  ...rest
}: InputPropsTypes) => {
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor={id} value={label} />
      </div>
      <TextInput
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        disabled={disabled}
        autoComplete="off"
        color={error ? "failure" : "default"}
        helperText={helperText}
        {...rest}
      />
    </div>
  );
};

export default Input;
