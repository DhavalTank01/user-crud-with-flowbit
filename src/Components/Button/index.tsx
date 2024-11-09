import { Button, Spinner } from "flowbite-react";
import React from "react";

interface CustomButtonPropsTypes {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const CustomButton = ({
  children,
  type = "submit",
  disabled = false,
  isLoading = false,
  onClick,
  ...rest
}: CustomButtonPropsTypes) => {
  return (
    <Button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...rest}
    >
      {isLoading ? (
        <div className="flex items-center gap-3">
          <Spinner />
          {children}
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default CustomButton;
