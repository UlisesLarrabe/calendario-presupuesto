"use client";

import dayjs from "dayjs";
import useEventsContext from "@/hooks/use-events-context";
import { useState, useEffect } from "react";
import { Event } from "@/types/events-type";
import EventSummary from "./event-summary";
import MonthSummary from "./month-summary";
const EventsResume = () => {
  const {
    getEventsByMonthAndType,
    getOutDatedOutcomeEvents,
    getIncomeOutcomeEvents,
    events,
  } = useEventsContext();
  const [incomeEvents, setIncomeEvents] = useState<Event[]>([]);
  const [incomeOutcomeEvents, setIncomeOutcomeEvents] = useState<Event[]>([]);
  const [outDatedOutcomeEvents, setOutDatedOutcomeEvents] = useState<Event[]>(
    []
  );

  useEffect(() => {
    getEventsByMonthAndType(dayjs().month() + 1, dayjs().year(), "income").then(
      (events) => setIncomeEvents(events)
    );
    getOutDatedOutcomeEvents().then((events) =>
      setOutDatedOutcomeEvents(events)
    );
    getIncomeOutcomeEvents().then((events) => setIncomeOutcomeEvents(events));
  }, [events]);
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
