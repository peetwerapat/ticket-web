import { JSX } from "react";

import { Button } from "../button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../dialog";

import { cn } from "@/lib/utils";

interface ModalProps {
  title?: string;
  open?: boolean;
  description?: string;
  description2?: string;
  iconDescription?: JSX.Element;
  secondDescription?: string;
  buttonText?: string;
  setOpen: (open: boolean) => void;
  onConfirm?: () => void;
  isConfirmOnly?: boolean;
  icon?: JSX.Element;
  removeConfirmButton?: boolean;
  onCancel?: () => void;
  className?: string;
  buttonVariant?:
    | "main"
    | "main-outline"
    | "main-gradient"
    | "secondary"
    | "secondary-outline"
    | "outline"
    | "delete"
    | null;
  isClose?: boolean;
  buttonSize?:
    | "default"
    | "sm"
    | "modalNotification"
    | "pagination"
    | "selectPaginate"
    | "date"
    | "confirmSize"
    | null;
}

export default function ModalNotification({
  title,
  open,
  description,
  description2,
  setOpen,
  onConfirm,
  isConfirmOnly,
  buttonText = "ยืนยัน",
  icon,
  removeConfirmButton = false,
  onCancel,
  className,
  buttonVariant = "main",
  isClose = false,
  buttonSize = "modalNotification",
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={cn("max-w-[500px] w-72 rounded-xl md:w-96", className)}
        outlineCloseButton
        removeCloseBtn
      >
        <DialogHeader className="w-full">
          <DialogTitle className="hidden font-semibold text-xl text-neutral-09 items-center">
            {title}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden">{description}</DialogDescription>
        <div className="w-full flex flex-col items-center text-center gap-2">
          {icon}
          <div>
            <p className="font-bold text-xl md:text-2xl text-neutral-09">
              {title}
            </p>
            <p className="md:body1 text-neutral-09">{description}</p>
            <p className="md:body1 text-neutral-09">{description2}</p>
          </div>
        </div>
        {!removeConfirmButton && (
          <div className="flex w-full justify-center gap-4 mt-2">
            <Button
              variant={buttonVariant}
              size={buttonSize}
              onClick={() => {
                if (onConfirm) {
                  onConfirm();
                }
                setOpen(false);
              }}
              type="submit"
            >
              {buttonText}
            </Button>

            {!isConfirmOnly && (
              <Button
                variant="main-outline"
                size={buttonSize}
                onClick={onCancel}
              >
                {isClose ? "Close" : "Cancel"}
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
