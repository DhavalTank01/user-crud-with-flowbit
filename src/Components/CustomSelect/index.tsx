import { Label, Select } from "flowbite-react";
import React from "react";
import { OptionsTypes } from "../../types";
import { classNames } from "../../utils";
interface CustomSelectProps {
  name: string;
  id: string;
  value: string;
  label: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement> | undefined;
  onBlur?: React.ChangeEventHandler<HTMLSelectElement> | undefined;
  disabled?: boolean;
  options?: OptionsTypes[];
  parentClassName?: string;
  selectClassName?: string;
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
  selectClassName,
  ...rest
}: CustomSelectProps) => {
  return (
    <div className={parentClassName}>
      <div className={classNames("mb-2 block", selectClassName)}>
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
