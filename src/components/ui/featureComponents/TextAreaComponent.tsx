import React from "react";
import clsx from "clsx";

import { Icons } from "../../../icons/index";

interface ITextAreaComponentProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  title: string;
  isRequire?: boolean;
  error?: string;
  titleColor?: string;
  placeHolder?: string;
}

export const TextAreaComponent = React.forwardRef<
  HTMLTextAreaElement,
  ITextAreaComponentProps
>(
  (
    {
      title,
      isRequire,
      error,
      titleColor = "secondary-gray-950",
      placeHolder = "please typing",
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full flex flex-col gap-1">
        <p className={`text-${titleColor}`}>
          {title}
          {isRequire && <span className="text-urgent-02">*</span>}
        </p>
        <div className="flex flex-col gap-2">
          <textarea
            ref={ref}
            placeholder={placeHolder}
            className={clsx(
              "resize-none border border-primary-soft-red rounded-md text-sm px-3 py-2 disabled:opacity-100",
              {
                "border-urgent-02": error,
                "placeholder:text-secondary-gray-400": !props.value,
              }
            )}
            {...props}
          />

          {error && (
            <div className="flex items-center gap-1 text-urgent-02">
              <Icons name="DangerBold" className="w-4 h-4" />
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
);

TextAreaComponent.displayName = "TextAreaComponent";
