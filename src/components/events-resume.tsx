"use client";

import dayjs from "dayjs";
import useEventsContext from "@/hooks/use-events-context";
import { Event } from "@/types/events-type";
import EventSummary from "./event-summary";
import MonthSummary from "./month-summary";
const EventsResume = () => {
  const { events } = useEventsContext();
  const incomeEvents = events && events.length > 0
    ? events
      .filter((e) => e.type === "income")
      .sort((a, b) => (dayjs(a.start).isBefore(dayjs(b.start)) ? -1 : 1))
    : [];
  const outDatedOutcomeEvents = events && events.length > 0
    ? events
      .filter(
        (e: Event) => e.type === "outcome" && dayjs(e.start).isBefore(dayjs())
      )
      .sort((a, b) => (dayjs(a.start).isBefore(dayjs(b.start)) ? -1 : 1))
    : [];
  const incomeOutcomeEvents = events && events.length > 0
    ? events
      .filter(
        (e: Event) => e.type === "outcome" && dayjs(e.start).isAfter(dayjs())
      )
      .sort((a, b) => (dayjs(a.start).isBefore(dayjs(b.start)) ? -1 : 1))
    : [];

  return (
    <div className="flex flex-col gap-4">
      <EventSummary events={incomeEvents} title="Ingresos" />
      <EventSummary events={outDatedOutcomeEvents} title="Pagos vencidos" />
      <EventSummary
        events={incomeOutcomeEvents}
        title="Proximos vencimientos"
      />
      <MonthSummary />
    </div>
  );
};
export default EventsResume;
