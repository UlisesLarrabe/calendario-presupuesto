"use client";

import dayjs from "dayjs";
import useEventsContext from "@/hooks/use-events-context";
import { Event } from "@/types/events-type";
import EventSummary from "./event-summary";
import MonthSummary from "./month-summary";
import ChartSummary from "./chart-summary";
const EventsResume = () => {
  const { events } = useEventsContext();
  const incomeEvents =
    events && events.length > 0
      ? events.filter((e) => e.type === "income")
      : [];
  const outDatedOutcomeEvents =
    events && events.length > 0
      ? events.filter(
          (e: Event) => e.type === "outcome" && dayjs(e.start).isBefore(dayjs())
        )
      : [];
  const incomeOutcomeEvents =
    events && events.length > 0
      ? events.filter(
          (e: Event) => e.type === "outcome" && dayjs(e.start).isAfter(dayjs())
        )
      : [];

  return (
    <div className="flex flex-col gap-4">
      <MonthSummary />
      <ChartSummary />
      <EventSummary events={incomeEvents} title="Ingresos" />
      <EventSummary events={outDatedOutcomeEvents} title="Pagos vencidos" />
      <EventSummary
        events={incomeOutcomeEvents}
        title="Proximos vencimientos"
      />
    </div>
  );
};
export default EventsResume;
