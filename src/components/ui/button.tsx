import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm md:text-base font-semibold leading-normal",
  {
    variants: {
      variant: {
        main: "main group rounded-3xl bg-primary-ocean-blue-600 text-white hover:bg-primary-ocean-blue-900 hover:shadow-ocean-blue disabled:bg-secondary-gray-100 disabled:bg-secondary-gray-300",
        "main-outline":
          "main-outline group rounded-3xl bg-white border border-primary-ocean-blue-600 text-primary-ocean-blue-600 hover:bg-primary-ocean-blue-100 hover:border-primary-ocean-blue-100 disabled:bg-white disabled:border-secondary-gray-300 disabled:text-secondary-gray-300",
        "main-gradient":
          "main-gradient group rounded-3xl bg-gradient-ocean-blue-01 text-white hover:bg-primary-ocean-blue-500 hover:shadow-ocean-blue disabled:bg-secondary-gray-100 disabled:bg-secondary-gray-300",
        secondary:
          "secondary group bg-primary-ocean-blue-600 text-white hover:bg-primary-ocean-blue-900 hover:shadow-ocean-blue disabled:bg-secondary-gray-100 disabled:bg-secondary-gray-300",
        "secondary-outline":
          "secondary-outline group bg-white border border-primary-ocean-blue-600 text-primary-ocean-blue-600 hover:bg-primary-ocean-blue-100 hover:border-primary-ocean-blue-100 disabled:bg-white disabled:border-secondary-gray-300 disabled:text-secondary-gray-300",
        outline: "bg-background",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        datePicker:
          "bg-background hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2 w-fit",
        sm: "h-9 px-3",
        modalNotification: "w-24 h-10",
        pagination: "h-10 w-8",
        selectPaginate: "h-5 w-fit",
        date: "h-10 px-4 py-0",
        confirmSize: "h-10 w-fit px-14 py-2",
      },
    },
    defaultVariants: {
      variant: "main",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  disabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, disabled = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const disabledStyles =
      variant === "main"
        ? "pointer-events-none bg-secondary-75 text-secondary-500"
        : variant === "secondary"
          ? " pointer-events-none text-secondary-400 border-secondary-100"
          : " pointer-events-none text-secondary-400";

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          disabled && disabledStyles
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
