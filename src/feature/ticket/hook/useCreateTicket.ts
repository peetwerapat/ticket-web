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
import { EHttpStatusCode } from "@/types/enum";

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
    const res = await ticketApi.createTicket(data);

    if (res.statusCode === EHttpStatusCode.CREATED) {
      toast({
        variant: "success",
        description: res.message,
      });
      router.back();
    } else {
      toast({
        variant: "error",
        description: res.message,
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
