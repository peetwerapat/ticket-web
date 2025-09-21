"use client";

import { priorityOption, statusOption } from "../const/const";
import useHeader from "../hook/useHeader";
import { ETicketPriority, ETicketStatus } from "../type/ticket.enum";

import { Button } from "@/components/ui/button";
import { InputComponent } from "@/components/ui/featureComponents/InputComponent";
import { SelectorComponent } from "@/components/ui/featureComponents/SelectorComponent";

export default function Header() {
  // Hook
  const {
    searchValue,
    setSearchValue,
    statusValue,
    setStatusValue,
    priorityValue,
    setPriorityValue,
    handleClickCreateTicket,
    handleClickClearFilter,
  } = useHeader();

  return (
    <div className="flex justify-between items-center">
      <h1>Ticket lists</h1>

      <div className="flex gap-4 items-center">
        <InputComponent
          value={searchValue}
          placeHolder="Search title, description"
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-52"
        />

        <SelectorComponent
          value={statusValue ?? ""}
          options={statusOption}
          onChange={(value) => setStatusValue(value as ETicketStatus)}
          className="w-40"
          placeholder="status"
        />

        <SelectorComponent
          value={priorityValue ?? ""}
          options={priorityOption}
          onChange={(value) => setPriorityValue(value as ETicketPriority)}
          className="w-40"
          placeholder="priority"
        />

        <Button variant="soft-red" onClick={handleClickClearFilter}>
          Clear filter
        </Button>
      </div>

      <Button variant="soft-red" onClick={handleClickCreateTicket}>
        Create ticket
      </Button>
    </div>
  );
}
