import dayjs from "dayjs";
import { Event } from "@/types/events-type";

const EventComponent = ({ event }: { event: Event }) => {
  const isDone = event.isDone;
  const dateOfEvent = dayjs(event.start);
  const isBefore = dayjs().isBefore(dateOfEvent);
  const typeOfEvent = event.type;
  return (
    <article
      className={`${
        typeOfEvent === "outcome"
          ? "bg-orange-400"
          : isDone
          ? "bg-green-400"
          : !isBefore
          ? "bg-red-400"
          : "bg-blue-300"
      } overflow-hidden p-1 rounded-sm cursor-pointer `}
    >
      <h3 className={`text-white text-sm`}>
        {event.title} - ${event.amount}
      </h3>
    </article>
  );
};
export default EventComponent;
