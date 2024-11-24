import { Checkbox, Label } from "flowbite-react";
import React from "react";

interface CustomCheckboxProps {
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  value?: string;
  id?: string;
  name?: string;
  defaultChecked?: boolean;
  label?: string;
}

const CustomCheckbox = ({
  onChange,
  value,
  id,
  name,
  defaultChecked,
  label,
  ...rest
}: CustomCheckboxProps) => {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        defaultChecked={defaultChecked}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        {...rest}
      />
      <Label htmlFor="accept" className="flex">
        {label}
      </Label>
    </div>
  );
};

export default CustomCheckbox;
