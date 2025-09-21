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
import { EHttpStatusCode } from "@/types/enum";

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
      const fetchData = async () => {
        try {
          const res = await ticketApi.getTicketById(Number(id));

          if (res.statusCode === EHttpStatusCode.SUCCESS) {
            setTicketById(res.data);
            reset({
              title: res.data.title,
              description: res.data.description,
              status: res.data.status,
              priority: res.data.priority,
            });
          } else {
            toast({ variant: "error", description: res.message });
          }
        } catch (error) {
          if (error instanceof Error)
            toast({ variant: "error", description: error.message });
        }
      };

      fetchData();
    }
  }, [id, reset, toast]);

  // Function
  const onSubmit = async (data: UpdateTicketForm) => {
    try {
      const res = await ticketApi.updateTicket(Number(id), data);

      if (res.statusCode === EHttpStatusCode.SUCCESS) {
        toast({
          variant: "success",
          description: res.message,
        });
        setTicketById(res.data);
        setIsEditing(false);
      } else {
        toast({ variant: "error", description: res.message });
      }
    } catch (error) {
      if (error instanceof Error)
        toast({ variant: "error", description: error.message });
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
    if (ticketById?.id) {
      const res = await ticketApi.deleteTicket(ticketById?.id);

      if (res.statusCode === EHttpStatusCode.SUCCESS) {
        toast({
          variant: "success",
          description: res.message,
        });
        router.push("/tickets");
      } else {
        toast({ variant: "error", description: res.message });
      }
    } else {
      toast({ variant: "error", description: "This ticket not found." });
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
