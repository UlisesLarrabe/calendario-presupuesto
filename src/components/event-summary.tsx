"use client";
import { Event } from "@/types/events-type";
import { createClient } from "@/utils/supabase/client";
import dayjs from "dayjs";
import useEventsContext from "@/hooks/use-events-context";
import { useState } from "react";
const EventSummary = ({
  events,
  title,
}: {
  events: Event[];
  title: string;
}) => {
  const { getEventsByMonth } = useEventsContext();
  const [isLoading, setIsLoading] = useState(false);
  if (events.length === 0) return null;
  // Nueva paleta y estilos modernos
  const colorsIncome = {
    backgroundDetails: "bg-green-100 border border-green-200 shadow-md",
    backgroundArticle: "bg-white hover:bg-green-50 transition-colors duration-200 border border-green-100",
    backgroundSummary: "bg-green-50",
    colorText: "text-green-900",
    colorButton: "bg-green-500 hover:bg-green-600 text-white shadow-md",
    colorButtonHover: "opacity-80 cursor-not-allowed",
  };
  const colorsOutcome = {
    backgroundDetails: "bg-red-100 border border-red-200 shadow-md",
    backgroundArticle: "bg-white hover:bg-red-50 transition-colors duration-200 border border-red-100",
    backgroundSummary: "bg-red-50",
    colorText: "text-red-900",
    colorButton: "bg-red-500 hover:bg-red-600 text-white shadow-md",
    colorButtonHover: "opacity-80 cursor-not-allowed",
  };
  const colorsIncomeOutcome = {
    backgroundDetails: "bg-yellow-50 border border-yellow-200 shadow-md",
    backgroundArticle: "bg-white hover:bg-yellow-50 transition-colors duration-200 border border-yellow-100",
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

  const supabase = createClient();
  const handleMarkAsDone = async (event: Event) => {
    setIsLoading(true);
    if (!event.id) return;
    const { error } = await supabase
      .from("events")
      .update({ isDone: !event.isDone })
      .eq("id", event.id);
    if (error) {
      throw new Error("Error al marcar como completado");
    }
    getEventsByMonth(dayjs().month() + 1, dayjs().year());
    setIsLoading(false);
  };
  return (
    <details
      className={`border w-[95%] border-gray-200 rounded-lg ${colors.backgroundDetails}`}
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
          <article
            key={event.id}
            className={`p-4 rounded-2xl flex flex-col gap-3 shadow-lg border transition-all duration-200 ${colors.backgroundArticle}`}
          >
            <header className="flex justify-between items-center mb-1">
              <h3 className="text-lg font-semibold tracking-tight text-gray-800 flex-1">
                {event.title}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm border select-none transition-colors duration-200
                  ${
                    event.isDone
                    ? "bg-green-200 text-green-900 border-green-300"
                    : "bg-orange-200 text-orange-900 border-orange-300"
                  }
                `}
              >
                {event.isDone ? "Completado" : "Pendiente"}
              </span>
            </header>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-600 font-medium">
                {event.category}
              </span>
              <span className="text-base font-bold text-gray-700">
                ${event.amount}
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600">
                {dayjs(event.start).format("DD/MM/YYYY")}
              </span>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => handleMarkAsDone(event)}
                disabled={isLoading}
                className={`px-4 py-2 rounded-full font-semibold text-sm shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 disabled:opacity-60 disabled:cursor-not-allowed ${
                  colors.colorButton
                } ${event.isDone && colors.colorButtonHover}`}
              >
                {isLoading
                  ? "Cargando..."
                  : event.isDone
                  ? "Marcar como pendiente"
                  : "Marcar como completado"}
              </button>
            </div>
          </article>
        ))}
      </div>
    </details>
  );
};
export default EventSummary;
