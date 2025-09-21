import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { ETicketPriority } from "../type/ticket.enum";
import {
  CreateTicketForm,
  createTicketSchema,
} from "../validate/create.ticket.validate";

import { useToast } from "@/components/ui/toast/use-toast";
import { ticketApi } from "@/services/ticket/ticketApi";

export default function useCreateTicket() {
  // Hook
  const router = useRouter();
  const { toast } = useToast();
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    register,
  } = useForm<CreateTicketForm>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "" as ETicketPriority,
    },
  });

  // Function
  const handleClickCreate = async (data: CreateTicketForm) => {
    try {
      const res = await ticketApi.createTicket(data);
      toast({
        variant: "success",
        description: res.message,
      });
      router.back();
    } catch (err: any) {
      toast({
        variant: "error",
        description: err.message || "An unknown error occurred",
      });
    }
  };

  return {
    register,
    errors,
    watch,
    setValue,
    handleSubmit,
    handleClickCreate,
  };
}
