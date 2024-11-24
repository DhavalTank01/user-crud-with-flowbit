import { Label, Radio } from "flowbite-react";
import React from "react";
import { convertTextCase } from "../../utils";

interface CustomRadioGroupProps {
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  label?: string;
  items?: string[];
  error?: boolean;
  helperText?: string;
}

const CustomRadioGroup = ({
  name,
  value,
  onChange,
  label,
  items,
  error,
  helperText,
  ...rest
}: CustomRadioGroupProps) => {
  return (
    <fieldset className="flex max-w-md flex-col gap-4">
      <legend className="mb-2">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {items?.map((item: string) => (
          <div className="flex items-center gap-2" key={item}>
            <Radio
              id={item}
              name={name}
              value={item}
              defaultChecked={value === item}
              onChange={onChange}
              {...rest}
            />
            <Label htmlFor={item}>{convertTextCase(item, "titlecase")}</Label>
          </div>
        ))}
      </div>
      {error && <p className="text-red-500">{helperText}</p>}
    </fieldset>
  );
};

export default CustomRadioGroup;
