import { apiDelete, apiGet, apiPatch, apiPost } from "../common";

import {
  ETicketPriority,
  ETicketStatus,
} from "@/feature/ticket/type/ticket.enum";
import { TTicket, TUpdateTicket } from "@/feature/ticket/type/ticket.type";
import { CreateTicketForm } from "@/feature/ticket/validate/create.ticket.validate";
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
  // API GET
  getAllTickets: async (
    getAllParams: ticketParams
  ): Promise<IResponseWithPaginate<TTicket[]>> => {
    const params = new URLSearchParams();
    params.set("page", getAllParams.page.toString());
    params.set("pageSize", getAllParams.pageSize.toString());

    if (getAllParams.search)
      params.set("search", getAllParams.search.toString());

    if (getAllParams.sort) params.set("sort", getAllParams.sort);
    if (getAllParams.order) params.set("order", getAllParams.order);

    if (getAllParams.status) params.set("status", getAllParams.status);
    if (getAllParams.priority) params.set("priority", getAllParams.priority);

    const response = apiGet("/tickets", params.toString());

    return response;
  },

  getTicketById: async (id: number): Promise<IBaseResponseData<TTicket>> => {
    const response = await apiGet(`/tickets/${id}`);

    return response;
  },

  // API POST
  createTicket: async (
    data: CreateTicketForm
  ): Promise<IBaseResponseData<TTicket>> => {
    const response = await apiPost("/tickets", data);

    return response;
  },

  // API PATCH
  updateTicket: async (
    id: number,
    data: TUpdateTicket
  ): Promise<IBaseResponseData<TTicket>> => {
    const response = await apiPatch(`/tickets/${id}`, data);

    return response;
  },

  // API DELETE
  deleteTicket: async (id: number): Promise<IBaseResponseData<TTicket>> => {
    const response = await apiDelete(`/tickets/${id}`);

    return response;
  },
};
