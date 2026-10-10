import dayjs from "dayjs";
import { Event } from "@/types/events-type";
import Link from "next/link";

const EventComponent = ({ event }: { event: Event }) => {
  const isDone = event.isDone;
  const dateOfEvent = dayjs(event.start);
  const isBefore = dayjs().isBefore(dateOfEvent);
  const typeOfEvent = event.type;
  return (
    <Link
      href={`/evento/${event.id}`}
      className="hover:opacity-80 "
    >
      <article
        className={`${typeOfEvent === "outcome"
          ? "bg-orange-400"
          : isDone
            ? "bg-green-400"
            : !isBefore
              ? "bg-red-400"
              : "bg-blue-300"
          } overflow-hidden p-1 rounded-sm cursor-pointer `}
      >
        <h3 className={`text-white text-sm`}>
          {event.title} ({event.person}) - ${event.amount.toLocaleString("es-ES")}
        </h3>
      </article>
    </Link>
  );
};
export default EventComponent;
