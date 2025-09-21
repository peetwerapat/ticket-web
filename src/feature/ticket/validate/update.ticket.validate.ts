import z from "zod";

import { ETicketPriority, ETicketStatus } from "../type/ticket.enum";

export const updateTicketSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z
    .string()
    .min(1, { message: "Description must be at least 1 characters" })
    .max(5000, { message: "Description cannot exceed 5000 characters" }),
  priority: z.nativeEnum(ETicketPriority, {
    errorMap: () => ({ message: "Priority must be LOW, MEDIUM, or HIGH" }),
  }),
  status: z.nativeEnum(ETicketStatus, {
    errorMap: () => ({
      message: "Status must be OPEN, IN_PROGRESS, or RESOLVED",
    }),
  }),
});

export type UpdateTicketForm = z.infer<typeof updateTicketSchema>;
