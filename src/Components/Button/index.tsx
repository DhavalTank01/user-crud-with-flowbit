import { Button, Spinner } from "flowbite-react";
import React from "react";

interface CustomButtonPropsTypes {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  isLoading?: boolean;
  color?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const CustomButton = ({
  children,
  type = "submit",
  disabled = false,
  isLoading = false,
  onClick,
  color,
  className,
  ...rest
}: CustomButtonPropsTypes) => {
  return (
    <Button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      color={color ? color : undefined}
      className={className}
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
