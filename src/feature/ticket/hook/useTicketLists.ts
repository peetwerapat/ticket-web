import { useState } from "react";
import { useRouter } from "next/navigation";

import { useToast } from "@/components/ui/toast/use-toast";
import { ticketApi } from "@/services/ticket/ticketApi";
import { useGlobalStore } from "@/store/globalStore";
import { useTicketStore } from "@/store/ticket/ticketStore";
import { ESortDirection } from "@/types/enum";

interface keyHeaderListProps {
  title: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
}

export default function useTicketList() {
  // Global State
  const { setTickets, getTicketParams, setTicketParams } = useTicketStore(
    (state) => ({
      setTickets: state.setTickets,
      getTicketParams: state.getTicketParams,
      setTicketParams: state.setTicketParams,
    })
  );
  const setLoading = useGlobalStore((state) => state.setLoading);

  // Local State
  const [sorting, setSorting] = useState<{
    key: keyof keyHeaderListProps | "";
    direction: ESortDirection;
  }>({ key: "", direction: ESortDirection.ASC });

  // Hook
  const { toast } = useToast();
  const router = useRouter();

  // Function
  const headerList: {
    key: keyof keyHeaderListProps | "";
    label: string;
  }[] = [
    { key: "title", label: "Title" },
    { key: "description", label: "Description" },
    { key: "status", label: "Status" },
    { key: "priority", label: "Priority" },
    { key: "createdAt", label: "Created At" },
    { key: "updatedAt", label: "Updated At" },
  ];

  const handleSort = async (key: keyof keyHeaderListProps | "") => {
    setSorting((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === ESortDirection.ASC
          ? ESortDirection.DESC
          : ESortDirection.ASC,
    }));

    try {
      const res = await ticketApi.getAllTickets({
        ...getTicketParams(),
        page: 1,
        sort: sorting.key,
        order: sorting.direction,
        pageSize: getTicketParams().pageSize,
        search: getTicketParams().search,
        status: getTicketParams().status,
        priority: getTicketParams().priority,
      });
      setTickets(res.data);
      setTicketParams({
        ...res.pagination,
        search: getTicketParams().search,
        status: getTicketParams().status,
        priority: getTicketParams().priority,
        sort: sorting.key,
        order: sorting.direction,
      });
    } catch (err: any) {
      toast({
        variant: "error",
        description: err.message || "An unknown error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  const setPage = async (page: number) => {
    setLoading(true);
    try {
      const res = await ticketApi.getAllTickets({
        page,
        pageSize: getTicketParams().pageSize,
        search: getTicketParams().search,
        status: getTicketParams().status,
        priority: getTicketParams().priority,
        sort: getTicketParams().sort,
        order: getTicketParams().order,
      });
      setTickets(res.data);
      setTicketParams({
        ...res.pagination,
        search: getTicketParams().search,
        status: getTicketParams().status,
        priority: getTicketParams().priority,
        sort: getTicketParams().sort,
        order: getTicketParams().order,
      });
    } catch (err: any) {
      toast({
        variant: "error",
        description: err.message || "An unknown error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  const setPageSize = async (pageSize: number) => {
    setLoading(true);
    try {
      const res = await ticketApi.getAllTickets({
        page: 1,
        pageSize,
        search: getTicketParams().search,
        status: getTicketParams().status,
        priority: getTicketParams().priority,
        sort: getTicketParams().sort,
        order: getTicketParams().order,
      });
      setTickets(res.data);
      setTicketParams({
        ...res.pagination,
        search: getTicketParams().search,
        status: getTicketParams().status,
        priority: getTicketParams().priority,
        sort: getTicketParams().sort,
        order: getTicketParams().order,
      });
    } catch (err: any) {
      toast({
        variant: "error",
        description: err.message || "An unknown error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClickViewTicket = (ticketId: number) => {
    router.push(`/tickets/${ticketId}`);
  };

  return {
    headerList,
    handleSort,
    setPage,
    setPageSize,
    handleClickViewTicket,
  };
}
