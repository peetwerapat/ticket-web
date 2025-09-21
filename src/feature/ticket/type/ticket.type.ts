import { ETicketPriority, ETicketStatus } from "./ticket.enum";

export type TTicket = {
  id: number;
  title: string;
  description: string;
  priority: ETicketPriority;
  status: ETicketStatus;
  createdAt: Date;
  updatedAt: Date;
};
