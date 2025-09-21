export default function TicketLayOut({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-sreen max-w-[1440px] mx-auto px-10">{children}</main>
  );
}
