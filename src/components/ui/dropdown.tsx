"use client";

import * as React from "react";

import { iconNames, Icons } from "../../icons/index";

// import { Check } from "lucide-react";
import { Button } from "./button";
import { Command, CommandEmpty, CommandItem, CommandList } from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

import { cn } from "@/lib/utils";

type Mode = "single" | "multiple";

interface DropdownProps {
  mode?: Mode;
  options: string[] | null;
  // todo: handle multiple selections
  selected: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  Icon?: keyof typeof iconNames;
  border?: boolean;
  onChange?: (event: string) => void;
}

const Dropdown = ({
  options = [],
  selected = "",
  className,
  placeholder,
  disabled = false,
  Icon = "ChevronDownBold",
  border = true,
  onChange,
}: DropdownProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={cn("block", className)}>
      <Popover open={open} onOpenChange={disabled ? undefined : setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            size="selectPaginate"
            aria-expanded={open}
            className={cn(
              `py-5 w-full font-medium ${!border && "border-white"}`,
              selected && !disabled
                ? "text-black"
                : "text-muted-foreground !cursor-not-allowed"
            )}
          >
            <p className="text-sm">{selected ? selected : placeholder}</p>
            <Icons name={Icon} className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn("p-0 LOL", className)}>
          <Command>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandList>
              {options &&
                options.map((item, index) => (
                  <CommandItem
                    key={`${item}_${index}`}
                    value={item.toString()}
                    onSelect={() => {
                      if (onChange) {
                        onChange(item);
                        setOpen(false);
                      }
                    }}
                  >
                    {/* <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selected === item ? "opacity-100" : "opacity-0"
                      )}
                    /> */}
                    <p className="text-xs">{item}</p>
                  </CommandItem>
                ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export { Dropdown };
