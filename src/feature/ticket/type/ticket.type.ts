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

export type TCreateTicket = {
  title: string;
  description: string;
  priority: ETicketPriority;
};

export type TUpdateTicket = Partial<TCreateTicket> & {
  status?: ETicketStatus;
};
