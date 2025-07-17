"use client";
import useEventsContext from "@/hooks/use-events-context";
import { Event } from "@/types/events-type";
import { createClient } from "@/utils/supabase/client";
import dayjs from "dayjs";
import React, { useState } from "react";

interface Colors {
  backgroundArticle: string;
  colorButton: string;
  colorButtonHover: string;
}

const EventSummaryInfo = ({
  event,
  colors,
}: {
  event: Event;
  colors: Colors;
}) => {
  const { getEventsByMonth } = useEventsContext();
  const [isLoading, setIsLoading] = useState(false);
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
  );
};

export default EventSummaryInfo;
