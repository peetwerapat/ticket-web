import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { ETicketPriority, ETicketStatus } from "../type/ticket.enum";
import { TTicket } from "../type/ticket.type";
import {
  UpdateTicketForm,
  updateTicketSchema,
} from "../validate/update.ticket.validate";

import { useToast } from "@/components/ui/toast/use-toast";
import { ticketApi } from "@/services/ticket/ticketApi";

export default function useViewAndEditTicket() {
  // Local State
  const [ticketById, setTicketById] = useState<TTicket>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);

  // Hook
  const { id } = useParams();
  const { toast } = useToast();
  const router = useRouter();
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
    register,
  } = useForm<UpdateTicketForm>({
    resolver: zodResolver(updateTicketSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "" as ETicketStatus,
      priority: "" as ETicketPriority,
    },
  });

  // Fetch Data
  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const res = await ticketApi.getTicketById(Number(id));
          setTicketById(res.data);
          reset({
            title: res.data.title,
            description: res.data.description,
            status: res.data.status,
            priority: res.data.priority,
          });
        } catch (err: any) {
          toast({
            variant: "error",
            description: err.message || "An unknown error occurred",
          });
        }
      })();
    }
  }, [id, reset, toast]);

  // Function
  const onSubmit = async (data: UpdateTicketForm) => {
    try {
      const res = await ticketApi.updateTicket(Number(id), data);
      setTicketById(res.data);
      setIsEditing(false);
      toast({
        variant: "success",
        description: res.message,
      });
    } catch (err: any) {
      toast({
        variant: "error",
        description: err.message || "An unknown error occurred",
      });
    }
  };

  const handleClickEditButton = () => {
    setIsEditing(true);
  };

  const handleClickCancelEdit = () => {
    setIsEditing(false);
    reset(ticketById as UpdateTicketForm);
  };

  const handleClickDeleteButton = () => {
    setIsDelete(true);
  };

  const handleClickCancelDelete = () => {
    setIsDelete(false);
  };

  const handleClickConfirmDelete = async () => {
    if (!ticketById?.id) {
      toast({
        variant: "error",
        description: "This ticket not found.",
      });
      return;
    }

    try {
      const res = await ticketApi.deleteTicket(ticketById.id);
      toast({
        variant: "success",
        description: res.message,
      });
      router.push("/tickets");
    } catch (err: any) {
      toast({
        variant: "error",
        description: err.message || "An unknown error occurred",
      });
    }
  };

  return {
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
  };
}
