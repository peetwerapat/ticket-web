"use client";

import useTicketList from "../hook/useTicketLists";

import Header from "./Header";
import SkeletonTicketRow from "./SkeletonTicketRow";
import { TicketPriority, TicketStatus } from "./TicketInfo";

import { ControlledPaginate } from "@/components/ui/pagination/ControlledPagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icons } from "@/icons";
import { formatISOToDate } from "@/lib/formatDate";
import { useGlobalStore } from "@/store/globalStore";
import { useTicketStore } from "@/store/ticket/ticketStore";

export default function TicketLists() {
  // Global State
  const { tickets, getTicketParams } = useTicketStore((state) => ({
    tickets: state.tickets,
    getTicketParams: state.getTicketParams,
  }));
  const loading = useGlobalStore((state) => state.loading);

  // Hook
  const {
    headerList,
    handleSort,
    setPage,
    setPageSize,
    handleClickViewTicket,
  } = useTicketList();

  // Render Table
  const renderTableRows = () => {
    if (loading.value) {
      return Array.from({ length: getTicketParams().pageSize }).map(
        (_, idx) => <SkeletonTicketRow key={idx} />
      );
    }

    if (!tickets || tickets.length === 0) {
      return (
        <TableRow>
          <TableCell
            colSpan={10}
            className="text-center py-10 text-secondary-200"
          >
            No tickets found
          </TableCell>
        </TableRow>
      );
    }

    return tickets.map((ticket) => (
      <TableRow key={ticket.id}>
        <TableCell>{ticket.title}</TableCell>
        <TableCell>{ticket.description}</TableCell>
        <TableCell>{ticket.status && TicketStatus(ticket.status)}</TableCell>
        <TableCell>
          {ticket.priority && TicketPriority(ticket.priority)}
        </TableCell>
        <TableCell>
          {ticket.createdAt && formatISOToDate.toShortFormat(ticket.createdAt)}
        </TableCell>
        <TableCell>
          {ticket.updatedAt && formatISOToDate.toShortFormat(ticket.updatedAt)}
        </TableCell>
        <TableCell>
          <Icons
            name="EyeOutline"
            className="w-5 h-5 cursor-pointer"
            onClick={() => handleClickViewTicket(ticket.id)}
          />
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div className="flex flex-col gap-3">
      <Header />

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            {headerList.map((head, idx) => (
              <TableHead key={idx}>
                <span className="flex items-center gap-1">
                  {head.label}
                  <Icons
                    name="SwapOutline"
                    className="cursor-pointer w-4 h-4"
                    onClick={() => handleSort(head.key)}
                  />
                </span>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>{renderTableRows()}</TableBody>
      </Table>

      {/* Pagination */}
      {!loading.value && tickets && tickets.length > 0 && (
        <div className="flex justify-end">
          <ControlledPaginate
            configPagination={{
              page: getTicketParams().page,
              pageSize: getTicketParams().pageSize,
              totalPages: getTicketParams().totalPages,
              totalCounts: getTicketParams().totalCounts,
            }}
            setPage={setPage}
            setPageSize={setPageSize}
          />
        </div>
      )}
    </div>
  );
}
