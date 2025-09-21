import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";

import { ETicketPriority, ETicketStatus } from "../type/ticket.enum";

import { ticketApi } from "@/services/ticket/ticketApi";
import { useGlobalStore } from "@/store/globalStore";
import { useTicketStore } from "@/store/ticket/ticketStore";

export default function useHeader() {
  // Global State
  const { setTickets, getTicketParams, setTicketParams } = useTicketStore(
    (state) => ({
      setTickets: state.setTickets,
      getTicketParams: state.getTicketParams,
      setTicketParams: state.setTicketParams,
    })
  );
  const { setLoading, setError } = useGlobalStore((state) => ({
    setLoading: state.setLoading,
    setError: state.setError,
  }));

  // Local State
  const [searchValue, setSearchValue] = useState<string>("");
  const [statusValue, setStatusValue] = useState<ETicketStatus>();
  const [priorityValue, setPriorityValue] = useState<ETicketPriority>();

  // Hook
  const router = useRouter();
  const debouncedSearch = useCallback(
    debounce(async () => {
      setLoading(true);
      try {
        const res = await ticketApi.getAllTickets({
          ...getTicketParams(),
          page: 1,
          search: searchValue,
          status: statusValue,
          priority: priorityValue,
        });

        setTickets(res.data);
        setTicketParams({
          ...res.pagination,
          search: searchValue,
          status: statusValue,
          priority: priorityValue,
        });
      } catch (err: any) {
        const message =
          err instanceof Error ? err.message : "An unknown error occurred";

        setError(message);
      } finally {
        setLoading(false);
      }
    }, 300),
    [searchValue, statusValue, priorityValue]
  );

  // Use Effect
  useEffect(() => {
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchValue, statusValue, priorityValue]);

  // Function
  const handleClickCreateTicket = () => {
    router.push("/tickets/create");
  };

  const handleClickClearFilter = () => {
    setSearchValue("");
    setStatusValue(undefined);
    setPriorityValue(undefined);
  };

  return {
    searchValue,
    setSearchValue,
    statusValue,
    setStatusValue,
    priorityValue,
    setPriorityValue,
    handleClickCreateTicket,
    handleClickClearFilter,
  };
}
