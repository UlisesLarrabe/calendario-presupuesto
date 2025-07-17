"use client";
import { Event } from "@/types/events-type";
import EventSummaryInfo from "./event-summary-info";
const EventSummary = ({
  events,
  title,
}: {
  events: Event[];
  title: string;
}) => {
  if (events.length === 0) return null;
  // Nueva paleta y estilos modernos
  const colorsIncome = {
    backgroundDetails: "bg-green-100 border border-green-200 shadow-md",
    backgroundArticle:
      "bg-white hover:bg-green-50 transition-colors duration-200 border border-green-100",
    backgroundSummary: "bg-green-50",
    colorText: "text-green-900",
    colorButton: "bg-green-500 hover:bg-green-600 text-white shadow-md",
    colorButtonHover: "opacity-80 cursor-not-allowed",
  };
  const colorsOutcome = {
    backgroundDetails: "bg-red-100 border border-red-200 shadow-md",
    backgroundArticle:
      "bg-white hover:bg-red-50 transition-colors duration-200 border border-red-100",
    backgroundSummary: "bg-red-50",
    colorText: "text-red-900",
    colorButton: "bg-red-500 hover:bg-red-600 text-white shadow-md",
    colorButtonHover: "opacity-80 cursor-not-allowed",
  };
  const colorsIncomeOutcome = {
    backgroundDetails: "bg-yellow-50 border border-yellow-200 shadow-md",
    backgroundArticle:
      "bg-white hover:bg-yellow-50 transition-colors duration-200 border border-yellow-100",
    backgroundSummary: "bg-yellow-50",
    colorText: "text-yellow-900",
    colorButton: "bg-yellow-400 hover:bg-yellow-500 text-white shadow-md",
    colorButtonHover: "opacity-80 cursor-not-allowed",
  };

  const colors =
    events[0].type === "income"
      ? colorsIncome
      : title === "Proximos vencimientos"
      ? colorsIncomeOutcome
      : colorsOutcome;

  return (
    <details
      className={`border md:w-[95%] w-full border-gray-200 rounded-lg ${colors.backgroundDetails}`}
    >
      <summary
        className={`text-lg font-semibold p-4 cursor-pointer ${colors.colorText}`}
      >
        {title} ({events.length})
      </summary>
      <div
        className={`flex flex-col gap-2 w-full ${colors.backgroundSummary} p-2`}
      >
        {events.map((event) => (
          <EventSummaryInfo event={event} colors={colors} key={event.id} />
        ))}
      </div>
    </details>
  );
};
export default EventSummary;
