import { ETicketPriority, ETicketStatus } from "../type/ticket.enum";

export const statusOption: { value: ETicketStatus; label: string }[] = [
  {
    value: ETicketStatus.OPEN,
    label: "Open",
  },
  {
    value: ETicketStatus.IN_PROGRESS,
    label: "In progress",
  },
  {
    value: ETicketStatus.RESOLVED,
    label: "Resolved",
  },
];

export const priorityOption: { value: ETicketPriority; label: string }[] = [
  {
    value: ETicketPriority.LOW,
    label: "Low",
  },
  {
    value: ETicketPriority.MEDIUM,
    label: "Medium",
  },
  {
    value: ETicketPriority.HIGH,
    label: "High",
  },
];
