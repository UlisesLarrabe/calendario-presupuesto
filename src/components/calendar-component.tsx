"use client";

import useEventsContext from "@/hooks/use-events-context";
import dayjs from "dayjs";
import "dayjs/locale/es";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import EventComponent from "./event-component";
import { Calendar as NewCalendar } from '@components/calendar/calendar'
import { MobileCalendar } from "./calendar/mobile-calendar";

dayjs.locale("es");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const CalendarComponent = () => {
  const { events } = useEventsContext();
  const eventsWithTimezone = events.map((event) => {
    return {
      ...event,
      start: dayjs(event.start).tz("America/Argentina/Buenos_Aires").toDate(),
      end: dayjs(event.end).tz("America/Argentina/Buenos_Aires").toDate(),
    };
  });



  return (
    <div>
      <div className="justify-center items-center p-2 hidden md:flex">
        <NewCalendar
          events={eventsWithTimezone}
          renderEvent={(event) => <EventComponent event={event} />}

        />
      </div>
      <div className="justify-center items-center p-2 md:hidden flex">
        <MobileCalendar
          events={eventsWithTimezone}
          renderEvent={(event) => <EventComponent event={event} />}
        />
      </div>
    </div>
  );
};
export default CalendarComponent;
