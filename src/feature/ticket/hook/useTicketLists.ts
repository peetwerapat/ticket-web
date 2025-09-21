import { useState } from "react";
import { useRouter } from "next/navigation";

import { useToast } from "@/components/ui/toast/use-toast";
import { ticketApi } from "@/services/ticket/ticketApi";
import { useGlobalStore } from "@/store/globalStore";
import { useTicketStore } from "@/store/ticket/ticketStore";
import { EHttpStatusCode, ESortDirection } from "@/types/enum";

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

    const res = await ticketApi.getAllTickets({
      ...getTicketParams(),
      page: 1,
      sort: sorting.key,
      order: sorting.direction,
    });
    if (res.statusCode === EHttpStatusCode.SUCCESS) {
      setTickets(res.data);
    } else {
      toast({
        variant: "error",
        description: res.message,
      });
    }
  };

  const setPage = async (page: number) => {
    const newSearchParams = {
      ...getTicketParams(),
      page,
    };

    setLoading(true);

    try {
      const res = await ticketApi.getAllTickets(newSearchParams);
      if (res.statusCode === EHttpStatusCode.SUCCESS) {
        setTickets(res.data);
        setTicketParams(res.pagination);
      } else {
        toast({
          variant: "error",
          description: res.message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const setPageSize = async (pageSize: number) => {
    const newSearchParams = {
      ...getTicketParams(),
      page: 1,
      pageSize,
    };

    setLoading(true);

    try {
      const res = await ticketApi.getAllTickets(newSearchParams);
      if (res.statusCode === EHttpStatusCode.SUCCESS) {
        setTickets(res.data);
        setTicketParams(res.pagination);
      } else {
        toast({
          variant: "error",
          description: res.message,
        });
      }
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
