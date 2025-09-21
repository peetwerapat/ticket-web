import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusColor: Record<string, string> = {
  OPEN: "bg-green-100 text-green-800",
  IN_PROGRESS: "bg-yellow-100 text-yellow-800",
  RESOLVED: "bg-blue-100 text-blue-800",
};

const priorityColor: Record<string, string> = {
  LOW: "bg-green-100 text-green-800",
  MEDIUM: "bg-orange-100 text-orange-800",
  HIGH: "bg-red-100 text-red-800",
};

function formatLabel(str: string) {
  return str
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());
}

export function TicketStatus(status: string) {
  return (
    <Badge className={cn("px-3 py-1 rounded-lg", statusColor[status])}>
      {formatLabel(status)}
    </Badge>
  );
}

export function TicketPriority(priority: string) {
  return (
    <Badge className={cn("px-3 py-1 rounded-lg", priorityColor[priority])}>
      {formatLabel(priority)}
    </Badge>
  );
}
