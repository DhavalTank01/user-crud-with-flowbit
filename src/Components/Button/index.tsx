import { Button, Spinner } from "flowbite-react";
import React from "react";

interface CustomButtonPropsTypes {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  isLoading?: boolean;
}

const CustomButton = ({
  children,
  type = "submit",
  disabled = false,
  isLoading = false,
}: CustomButtonPropsTypes) => {
  return (
    <Button type={type} disabled={disabled || isLoading}>
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
