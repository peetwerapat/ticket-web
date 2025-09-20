import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  FrontIcon?: React.ReactNode;
  BackIcon?: React.ReactNode;
  bgColor?: string;
  checked?: boolean;
  name?: string;
  className?: string;
  variant?: string;
  disabled?: boolean;
  rounded?: string;
  onIconClick?: () => void;
  borderColor?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      FrontIcon,
      BackIcon,
      bgColor = "bg-white",
      onIconClick,
      disabled = false,
      rounded = "md",
      borderColor = "border-secondary-gray-300",
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex items-center">
        {FrontIcon && (
          <span className="pl-2">
            {React.isValidElement(FrontIcon) ? FrontIcon : null}
          </span>
        )}
        <input
          {...props}
          type={type}
          ref={ref}
          className={cn(
            `w-full h-9 md:h-10 px-3 py-2 text-sm rounded-${rounded} border ${borderColor} ${bgColor} focus:border-primary-ocean-blue-600 disabled:cursor-not-allowed disabled:bg-secondary-gray-100 disabled:border-none`,
            className
          )}
          disabled={disabled}
        />
        {BackIcon && (
          <span className="pe-2" onClick={onIconClick}>
            {React.isValidElement(BackIcon) ? BackIcon : null}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
