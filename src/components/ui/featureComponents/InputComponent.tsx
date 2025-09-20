import React from "react";
import clsx from "clsx";

import { Icons } from "../../../icons/index";
import { Input } from "../input";

import idCardCheck from "@/lib/idCardCheck";

interface IInputCompoenentProps {
  title: string;
  isNum?: boolean;
  istel?: boolean;
  isEmail?: boolean;
  isUsername?: boolean;
  isPassword?: boolean;
  isIdCard?: boolean;
  isFrontIcon?: boolean;
  isRequire?: boolean;
  titleColor?: string;
  error?: string;
  stateIcon?: boolean;
  setStaeIcon?: React.Dispatch<React.SetStateAction<boolean>>;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placholder?: string;
}
export const InputComponent = React.forwardRef<
  HTMLInputElement,
  IInputCompoenentProps
>(
  (
    {
      title,
      isNum,
      istel,
      isEmail,
      isUsername,
      isPassword = false,
      isIdCard,
      isFrontIcon = false,
      isRequire,
      titleColor = "secondary-gray-950",
      error,
      stateIcon,
      setStaeIcon,
      value,
      onChange,
      disabled,
      placholder = "กรุณากรอก",
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full flex flex-col gap-1">
        <p className={`text-${titleColor}`}>
          {title} {isRequire && <span className="text-urgent-02">*</span>}
        </p>
        <div className="flex flex-col gap-2">
          <Input
            ref={ref}
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={placholder}
            type={
              isNum
                ? "number"
                : istel
                  ? "tel"
                  : isEmail
                    ? "email"
                    : stateIcon === false
                      ? "password"
                      : "text"
            }
            className={clsx(
              "disabled:opacity-100",
              {
                "border-urgent-02":
                  error ||
                  (isIdCard &&
                    value &&
                    value.toString().length === 13 &&
                    !idCardCheck(value.toString())),
              },
              {
                "placeholder:text-secondary-gray-300":
                  value === "" || value === 0,
              }
            )}
            onKeyDown={(e) => {
              if (
                isNum &&
                (e.key === "e" ||
                  e.key === "E" ||
                  e.key === "-" ||
                  e.key === "+")
              ) {
                e.preventDefault();
              }
            }}
            onWheel={(e) => (e.target as HTMLElement).blur()}
            FrontIcon={
              isFrontIcon ? (
                isEmail || isUsername ? (
                  <Icons
                    name="SmsOutline"
                    className="w-4 h-4 md:w-5 md:h-5 text-secondary-gray-950"
                  />
                ) : (
                  <Icons
                    name="LockOutline"
                    className="w-4 h-4 md:w-5 md:h-5 text-secondary-gray-950"
                  />
                )
              ) : (
                ""
              )
            }
            BackIcon={
              isPassword ? (
                stateIcon ? (
                  <Icons
                    name="EyeOutline"
                    className="w-5 h-5 md:w-6 md:h-6 text-secondary-gray-950"
                  />
                ) : (
                  <Icons
                    name="EyeSlashOutline"
                    className="w-5 h-5 md:w-6 md:h-6 text-secondary-gray-950"
                  />
                )
              ) : (
                ""
              )
            }
            onIconClick={() => setStaeIcon && setStaeIcon(!stateIcon)}
            {...props}
          />

          {isIdCard &&
            value &&
            value.toString().length === 13 &&
            !idCardCheck(value.toString()) && (
              <p className="text-urgent-02 text-sm">เลขบัตรประชาชนไม่ถูกต้อง</p>
            )}

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

InputComponent.displayName = "InputComponent";
