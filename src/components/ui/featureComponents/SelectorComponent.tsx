import * as React from "react";
import clsx from "clsx";

import { Icons } from "../../../icons/index";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";

import { IOption } from "@/types/globalType";

interface ISelectorComponentProps {
  title?: string;
  options: IOption[];
  value: string;
  onChange: (value: string, extra?: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  isRequire?: boolean;
  titleColor?: string;
}

export const SelectorComponent = ({
  title,
  options,
  value,
  onChange,
  placeholder = "กรุณาเลือก",
  error,
  disabled,
  isRequire,
  titleColor = "secondary-gray-950",
}: ISelectorComponentProps) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <p className={`text-${titleColor}`}>
        {title} {isRequire && <span className="text-urgent-02">*</span>}
      </p>
      <div className="flex flex-col gap-2">
        <Select
          onValueChange={(val: string) => {
            const selected = options.find((opt) => opt.value === val);
            onChange(val, selected?.extra);
          }}
          value={value}
          disabled={disabled}
        >
          <SelectTrigger
            className={clsx(
              "disabled:opacity-100",
              {
                "border-urgent-02": error,
              },
              {
                "text-secondary-gray-300": value === "" || value === "0",
              }
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {error && (
          <div className="flex items-center gap-1 text-urgent-02">
            <Icons name="DangerBold" className="w-4 h-4" />
            <p className="text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};
