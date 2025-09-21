import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";

import { ETicketPriority, ETicketStatus } from "../type/ticket.enum";

import { useToast } from "@/components/ui/toast/use-toast";
import { ticketApi } from "@/services/ticket/ticketApi";
import { useGlobalStore } from "@/store/globalStore";
import { useTicketStore } from "@/store/ticket/ticketStore";
import { EHttpStatusCode } from "@/types/enum";

export default function useHeader() {
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
  const [searchValue, setSearchValue] = useState<string>("");
  const [statusValue, setStatusValue] = useState<ETicketStatus>();
  const [priorityValue, setPriorityValue] = useState<ETicketPriority>();

  // Hook
  const router = useRouter();
  const { toast } = useToast();
  const debouncedSearch = useCallback(
    debounce(() => {
      const searchData = async () => {
        setLoading(true);
        try {
          const res = await ticketApi.getAllTickets({
            ...getTicketParams(),
            page: 1,
            search: searchValue,
            status: statusValue,
            priority: priorityValue,
          });

          if (res.statusCode === EHttpStatusCode.SUCCESS) {
            setTickets(res.data);
            setTicketParams(res.pagination);
          } else {
            toast({
              variant: "error",
              description: res.message,
            });
          }
        } catch (err) {
          if (err instanceof Error) {
            toast({
              variant: "error",
              description: err.message,
            });
          } else {
            toast({
              variant: "error",
              description: "An unknown error occurred.",
            });
          }
        } finally {
          setLoading(false);
        }
      };

      searchData();
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
