// services/ticket/ticketApi.ts
import { apiDelete, apiGet, apiPatch, apiPost } from "../common";

import {
  ETicketPriority,
  ETicketStatus,
} from "@/feature/ticket/type/ticket.enum";
import { TTicket } from "@/feature/ticket/type/ticket.type";
import { CreateTicketForm } from "@/feature/ticket/validate/create.ticket.validate";
import { UpdateTicketForm } from "@/feature/ticket/validate/update.ticket.validate";
import {
  IBaseParams,
  IBaseResponseData,
  IResponseWithPaginate,
} from "@/types/globalType";

export interface ticketParams extends IBaseParams {
  status?: ETicketStatus;
  priority?: ETicketPriority;
}

export const ticketApi = {
  getAllTickets: async (
    getAllParams: ticketParams
  ): Promise<IResponseWithPaginate<TTicket[]>> => {
    const params = new URLSearchParams();

    params.set("page", getAllParams.page.toString());
    params.set("pageSize", getAllParams.pageSize.toString());

    if (getAllParams.search) params.set("search", getAllParams.search);
    if (getAllParams.sort) params.set("sort", getAllParams.sort);
    if (getAllParams.order) params.set("order", getAllParams.order);
    if (getAllParams.status) params.set("status", getAllParams.status);
    if (getAllParams.priority) params.set("priority", getAllParams.priority);

    return await apiGet<IResponseWithPaginate<TTicket[]>>(
      "/tickets",
      params.toString()
    );
  },

  getTicketById: async (id: number): Promise<IBaseResponseData<TTicket>> => {
    return await apiGet<IBaseResponseData<TTicket>>(`/tickets/${id}`);
  },

  createTicket: async (
    data: CreateTicketForm
  ): Promise<IBaseResponseData<TTicket>> => {
    return await apiPost<IBaseResponseData<TTicket>, CreateTicketForm>(
      "/tickets",
      data
    );
  },

  updateTicket: async (
    id: number,
    data: UpdateTicketForm
  ): Promise<IBaseResponseData<TTicket>> => {
    return await apiPatch<IBaseResponseData<TTicket>, UpdateTicketForm>(
      `/tickets/${id}`,
      data
    );
  },

  deleteTicket: async (id: number): Promise<IBaseResponseData<TTicket>> => {
    return await apiDelete<IBaseResponseData<TTicket>>(`/tickets/${id}`);
  },
};
