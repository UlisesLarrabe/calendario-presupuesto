"use client";

import useEventsContext from "@/hooks/use-events-context";
import dayjs from "dayjs";
import "dayjs/locale/es";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventComponent from "./event-component";
import { Event } from "@/types/events-type";

dayjs.locale("es");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
const localizer = dayjsLocalizer(dayjs);

const CalendarComponent = () => {
  const { events, getEventsByMonth } = useEventsContext();
  const eventsWithTimezone = events.map((event) => {
    return {
      ...event,
      start: dayjs(event.start).tz("America/Argentina/Buenos_Aires").toDate(),
      end: dayjs(event.end).tz("America/Argentina/Buenos_Aires").toDate(),
    };
  });

  const messages = {
    previous: "Anterior",
    next: "Siguiente",
    today: "Hoy",
    month: "Mes",
    week: "Semana",
    day: "Dia",
    agenda: "Agenda",
  };

  const components = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event: (props: any) => {
      const event = props.event;
      return <EventComponent event={event} />;
    },
  };

  const handleNavigate = ({ date }: { date: Date }) => {
    const month = dayjs(date).month() + 1;
    const year = dayjs(date).year();
    getEventsByMonth(month, year);
  };

  const handleDoubleClickEvent = (event: Event) => {
    window.location.href = `/evento/${event.id}`;
  };

  return (
    <div>
      <Calendar
        events={eventsWithTimezone}
        localizer={localizer}
        style={{ height: "100dvh", width: "100%" }}
        messages={messages}
        selectable={true}
        // view="month"
        // views={["month"]}
        components={components}
        onNavigate={(newDate) => handleNavigate({ date: newDate })}
        onDoubleClickEvent={handleDoubleClickEvent}
      />
    </div>
  );
};
export default CalendarComponent;
