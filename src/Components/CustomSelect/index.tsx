import { Label, Select } from "flowbite-react";
import React from "react";
import { OptionsTypes } from "../../types";
import { convertTextCase } from "../../utils";
interface CustomSelectProps {
  name: string;
  id: string;
  value: string;
  label?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement> | undefined;
  onBlur?: React.ChangeEventHandler<HTMLSelectElement> | undefined;
  disabled?: boolean;
  options?: OptionsTypes[];
  parentClassName?: string;
  isAddEmptyOption?: boolean;
  sizing?: string;
  error?: boolean;
  helperText?: string;
  [key: string]: any;
}

const CustomSelect = ({
  name,
  id,
  value,
  label,
  onChange,
  onBlur,
  disabled,
  options,
  parentClassName,
  sizing,
  error,
  helperText,
  isAddEmptyOption,
  ...rest
}: CustomSelectProps) => {
  return (
    <div className={parentClassName}>
      {label ? (
        <div className={"mb-2 block"}>
          <Label htmlFor={id} value={label} />
        </div>
      ) : null}
      <Select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        sizing={sizing}
        helperText={convertTextCase(helperText, "errorMessage")}
        color={error ? "failure" : undefined}
        {...rest}
      >
        {isAddEmptyOption ? (
          <option value={""} disabled>
            Select
          </option>
        ) : null}
        {options?.map((option: OptionsTypes) => (
          <option
            key={option.value}
            value={option.value}
            selected={value === option.value}
          >
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default CustomSelect;
