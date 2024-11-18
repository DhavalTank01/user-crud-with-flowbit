import { Label, Select } from "flowbite-react";
import React from "react";
import { OptionsTypes } from "../../types";
interface CustomSelectProps {
  name: string;
  id: string;
  value: string;
  label: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement> | undefined;
  onBlur?: React.ChangeEventHandler<HTMLSelectElement> | undefined;
  disabled?: boolean;
  options?: OptionsTypes[];
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
  ...rest
}: CustomSelectProps) => {
  return (
    <div className="">
      <div className="mb-2 block">
        <Label htmlFor={id} value={label} />
      </div>
      <Select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
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
