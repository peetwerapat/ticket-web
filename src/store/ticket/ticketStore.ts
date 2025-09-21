import { create } from "zustand";

import { TTicket } from "@/feature/ticket/type/ticket.type";
import { ticketParams } from "@/services/ticket/ticketApi";

type ticketStore = {
  // Params
  ticketParams: ticketParams;
  getTicketParams: () => ticketParams;
  setTicketParams: (getAllParams: ticketParams) => void;

  // State
  tickets: TTicket[] | null;

  // Function
  setTickets: (tickets: TTicket[]) => void;
};

const defaultTicketParams: ticketParams = {
  page: 1,
  pageSize: 10,
};

export const useTicketStore = create<ticketStore>((set, get) => ({
  // Params
  ticketParams: defaultTicketParams,
  getTicketParams: () => get().ticketParams,
  setTicketParams: (getAllParams: ticketParams) => {
    set((state) => ({
      ticketParams: {
        ...state.ticketParams,
        page: getAllParams.page ?? 1,
        pageSize: getAllParams.pageSize ?? 10,
        totalCounts: getAllParams.totalCounts ?? 0,
        totalPages: getAllParams.totalPages ?? 10,
      },
    }));
  },

  // State
  tickets: null,

  // Function
  setTickets: (tickets: TTicket[]) => set({ tickets }),
}));
