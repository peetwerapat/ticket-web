"use client";

import React, { useState } from "react";

import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import ModalNotification from "../components/ui/featureComponents/ModalNotification";
import { ControlledPaginate } from "../components/ui/pagination/ControlledPagination";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Switch } from "../components/ui/switch";
import { useToast } from "../components/ui/toast/use-toast";

import { InputComponent } from "@/components/ui/featureComponents/InputComponent";
import { Icons } from "@/icons";

export default function Home() {
  const { toast } = useToast();
  const handleSuccessClick = () => {
    setIsConfirmModalOpen(true);
    toast({
      icon: "TickCircleBold",
      // title: "Success",
      description: "Success.",
      variant: "success",
    });
  };

  const handleWarningClick = () => {
    toast({
      icon: "DangerBold",
      // title: "Warning",
      description: "Warning.",
      variant: "warning",
    });
  };

  const handleErrorClick = () => {
    toast({
      icon: "InfoCircleBold",
      // title: "Error",
      description: "Error.",
      variant: "error",
    });
  };

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1>H1</h1>
        <h2>H2</h2>
        <h3>H3</h3>
        <h4>H4</h4>
        <h5>H5</h5>
        <p className="title1">Title1</p>
        <p className="title2">Title2</p>
        <p className="body1">Body1</p>
        <p className="body2">Body2</p>
        <p className="body3">Body3</p>
        <p className="body4">Body4</p>
        <p className="button">button</p>
        <InputComponent title="Email" disabled />
        <ControlledPaginate
          configPagination={{
            page: 10,
            limit: 10,
            totalPages: 13,
            total: 100,
          }}
          setPage={() => 11}
          setLimit={() => 1}
        />
        <Icons name="ClockBold" className="w-80" />
        <Checkbox />
        <RadioGroup defaultValue="option-one">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
          </div>
        </RadioGroup>
        <Switch />

        <div className="flex gap-10">
          <Button variant="main" onClick={handleSuccessClick}>
            Main
          </Button>
          <Button variant="main-outline" disabled onClick={handleWarningClick}>
            Main-light
          </Button>
          <Button variant="main-gradient" onClick={handleWarningClick}>
            Main-gradient
          </Button>

          <Button variant="secondary" onClick={handleErrorClick}>
            Secondary
          </Button>
          <Button variant="secondary-outline" onClick={handleErrorClick}>
            Secondary-light
          </Button>
        </div>
      </div>

      <ModalNotification
        open={isConfirmModalOpen}
        setOpen={setIsConfirmModalOpen}
      />
    </>
  );
}
