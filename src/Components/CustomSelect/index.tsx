import { Label, Select } from "flowbite-react";
import React from "react";
import { OptionsTypes } from "../../types";
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
        {...rest}
      >
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
