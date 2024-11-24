import { Datepicker, Label } from "flowbite-react";
import React from "react";
import { convertTextCase } from "../../utils";

interface SingleDatePickerPropsTypes {
  defaultValue?: Date;
  minDate?: Date;
  maxDate?: Date;
  onChange?: (date: Date | null) => void;
  value?: Date | null;
  label?: string;
  helperText?: string;
  error?: boolean;
  [key: string]: any;
}

const SingleDatePicker: React.FC<SingleDatePickerPropsTypes> = ({
  onChange,
  onBlur,
  helperText,
  error,
  label,
  value,
  defaultValue,
  minDate,
  maxDate,
  id,
  name,
  ...rest
}) => {
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor={id} value={label} />
      </div>
      <Datepicker
        id={id}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        defaultValue={defaultValue}
        minDate={minDate}
        maxDate={maxDate}
        value={value}
        {...rest}
      />
      {helperText && (
        <p className={`text-sm ${error ? "text-red-600" : "text-gray-500"}`}>
          {convertTextCase(helperText, "errorMessage")}
        </p>
      )}
    </div>
  );
};

export default SingleDatePicker;
