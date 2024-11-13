import { Datepicker } from "flowbite-react";
import React from "react";

interface SingleDatePickerPropsTypes {
  onChange: (date: Date) => FocusEvent;
  onBlur?: () => FocusEvent;
  value: string | number | readonly string[] | undefined;
  name?: string;
  id?: string;
  error?: boolean;
  helperText?: string;
}

const SingleDatePicker: React.FC<SingleDatePickerPropsTypes> = ({
  onChange,
  onBlur,
  value,
  name,
  id,
  error = false,
  helperText = "",
}) => {
  return (
    <div>
      <Datepicker
        onChange={(date) => {
          if (date instanceof Date) {
            onChange(date);
          }
        }}
        onBlur={onBlur}
        value={value}
        name={name}
        id={id}
      />
      {helperText && (
        <p className={`text-sm ${error ? "text-red-600" : "text-gray-500"}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default SingleDatePicker;
