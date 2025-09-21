import { z } from "zod";

import { ETicketPriority } from "../type/ticket.enum";

export const createTicketSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z
    .string()
    .min(1, { message: "Description must be at least 1 characters" })
    .max(5000, { message: "Description cannot exceed 5000 characters" }),
  priority: z.nativeEnum(ETicketPriority, {
    errorMap: () => ({ message: "Priority must be Low, Medium, or High" }),
  }),
});

export type CreateTicketForm = z.infer<typeof createTicketSchema>;
