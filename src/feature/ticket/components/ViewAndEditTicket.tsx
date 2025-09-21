"use client";

import { priorityOption, statusOption } from "../const/const";
import useViewAndEditTicket from "../hook/useViewAndEditTicket";
import { ETicketPriority, ETicketStatus } from "../type/ticket.enum";

import { TicketPriority, TicketStatus } from "./TicketInfo";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InputComponent } from "@/components/ui/featureComponents/InputComponent";
import ModalNotification from "@/components/ui/featureComponents/ModalNotification";
import { SelectorComponent } from "@/components/ui/featureComponents/SelectorComponent";
import { TextAreaComponent } from "@/components/ui/featureComponents/TextAreaComponent";
import { Icons } from "@/icons";

export default function ViewAndEditTicket() {
  // Hook
  const {
    ticketById,
    isEditing,
    isDelete,
    setIsDelete,
    handleSubmit,
    register,
    errors,
    watch,
    setValue,
    onSubmit,
    handleClickEditButton,
    handleClickCancelEdit,
    handleClickDeleteButton,
    handleClickCancelDelete,
    handleClickConfirmDelete,
  } = useViewAndEditTicket();

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen p-6">
        <Card className="w-full max-w-2xl shadow-lg rounded-2xl">
          <CardHeader className="border-b pb-4">
            <CardTitle className="flex justify-between items-center">
              <p className="title1 text-gray-800">
                {`Ticket #${ticketById?.id}`}
              </p>
              {!isEditing && (
                <p className="font-medium">
                  {ticketById?.status && TicketStatus(ticketById?.status)}
                </p>
              )}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            {isEditing ? (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
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
                  title="Status"
                  options={statusOption}
                  value={watch("status")}
                  onChange={(val) => setValue("status", val as ETicketStatus)}
                  error={errors.status?.message}
                />
                <SelectorComponent
                  title="Priority"
                  options={priorityOption}
                  value={watch("priority")}
                  onChange={(val) =>
                    setValue("priority", val as ETicketPriority)
                  }
                  error={errors.priority?.message}
                />

                <CardFooter className="flex justify-end gap-2 mt-4">
                  <Button type="submit" variant="soft-red" className="w-28">
                    Save
                  </Button>
                  <Button
                    type="button"
                    className="w-28"
                    onClick={handleClickCancelEdit}
                  >
                    Cancel
                  </Button>
                </CardFooter>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Title</p>
                  <p className="text-lg font-medium">{ticketById?.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="text-base">{ticketById?.description}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Priority</p>
                  <p className="font-medium">
                    {ticketById?.priority &&
                      TicketPriority(ticketById?.priority)}
                  </p>
                </div>
              </div>
            )}
          </CardContent>

          {!isEditing && (
            <CardFooter className="flex gap-2 justify-end">
              <Button className="w-28" onClick={handleClickEditButton}>
                Edit
              </Button>
              <Button
                className="w-28"
                variant="delete"
                onClick={handleClickDeleteButton}
              >
                Delete
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>

      <ModalNotification
        open={isDelete}
        setOpen={setIsDelete}
        title="Confirm to delete this ticket"
        description="If you delete this ticket you cannot to restore it."
        buttonText="Confirm"
        icon={<Icons name="DialogDeleted" className="w-16 h-16" />}
        buttonVariant="delete"
        onCancel={handleClickCancelDelete}
        onConfirm={handleClickConfirmDelete}
      />
    </>
  );
}
