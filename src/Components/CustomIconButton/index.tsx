import React from "react";
import { classNames } from "../../utils"; // Assuming you have a utility for conditional class names

interface CustomIconButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const CustomIconButton = ({
  onClick,
  children,
  className,
  disabled,
  ...rest
}: CustomIconButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type="button"
      className={classNames(
        "rounded p-2 transition-all duration-200",
        disabled ? "cursor-not-allowed text-gray-400" : className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default CustomIconButton;
