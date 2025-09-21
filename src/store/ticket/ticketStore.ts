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
        page: getAllParams.page,
        pageSize: getAllParams.pageSize,
        totalCounts: getAllParams.totalCounts,
        totalPages: getAllParams.totalPages,
        search: getAllParams.search,
        status: getAllParams.status,
        sort: getAllParams.sort,
        order: getAllParams.order,
      },
    }));
  },

  // State
  tickets: null,

  // Function
  setTickets: (tickets: TTicket[]) => set({ tickets }),
}));
