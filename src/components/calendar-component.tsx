"use client";

import useEventsContext from "@/hooks/use-events-context";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventComponent from "./event-component";

dayjs.locale("es");
const localizer = dayjsLocalizer(dayjs);

const CalendarComponent = () => {
  const { events } = useEventsContext();

  const messages = {
    previous: "Anterior",
    next: "Siguiente",
    today: "Hoy",
  };

  const components = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event: (props: any) => {
      const event = props.event;
      return <EventComponent event={event} />;
    },
  };

  return (
    <div>
      <Calendar
        events={events}
        localizer={localizer}
        style={{ height: "100dvh", width: "100%" }}
        messages={messages}
        selectable={true}
        // view="month"
        // views={["month"]}
        components={components}
      />
    </div>
  );
};
export default CalendarComponent;
