"use client";

import { priorityOption } from "../const/const";
import useCreateTicket from "../hook/useCreateTicket";
import { ETicketPriority } from "../type/ticket.enum";

import { Button } from "@/components/ui/button";
import { InputComponent } from "@/components/ui/featureComponents/InputComponent";
import { SelectorComponent } from "@/components/ui/featureComponents/SelectorComponent";
import { TextAreaComponent } from "@/components/ui/featureComponents/TextAreaComponent";

export default function CreateTicket() {
  // Hook
  const { register, errors, watch, setValue, handleSubmit, handleClickCreate } =
    useCreateTicket();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1>Create ticket</h1>

      <div className="w-[1000px] flex flex-col items-center gap-3 shadow-2xl p-4 rounded-lg">
        <InputComponent
          title="Title"
          {...register("title")}
          error={errors.title?.message}
          isRequire
        />
        <TextAreaComponent
          title="Description"
          {...register("description")}
          error={errors.description?.message}
          isRequire
        />
        <SelectorComponent
          title="Priority"
          options={priorityOption}
          value={watch("priority")}
          onChange={(val) => {
            setValue("priority", val as ETicketPriority);
          }}
          error={errors.priority?.message}
        />

        <Button
          variant="soft-red"
          className="w-full"
          onClick={handleSubmit(handleClickCreate)}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
