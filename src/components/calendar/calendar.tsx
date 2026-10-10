"use client";

import { useState, useMemo } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  addMonths,
  subMonths,
  isSameMonth,
  isWeekend,
  isSameDay
} from "date-fns";
import { es } from "date-fns/locale/es";
import { Event } from "@/types/events-type";

interface CalendarProps {
  events: Event[];
  renderEvent: (event: Event) => React.ReactNode;
}

const DAYS_OF_WEEK = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

export function Calendar({ events, renderEvent }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  const { days, currentMonthName } = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);

    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const allDays = eachDayOfInterval({ start: startDate, end: endDate });

    const weekdaysOnly = allDays.filter((day) => !isWeekend(day));

    return {
      days: weekdaysOnly,
      currentMonthName: format(currentDate, "MMMM yyyy", { locale: es }),
    };
  }, [currentDate]);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, Event[]>();

    events.forEach((event) => {
      const key = event.start.toISOString().split("T")[0];

      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key)!.push(event);
    });

    return map;
  }, [events]);

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Cabecera de Navegación */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold capitalize text-gray-900">
          {currentMonthName}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentDate((prev) => subMonths(prev, 1))}
            className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700 transition"
          >
            Anterior
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700 transition"
          >
            Hoy
          </button>
          <button
            onClick={() => setCurrentDate((prev) => addMonths(prev, 1))}
            className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700 transition"
          >
            Siguiente
          </button>
        </div>
      </div>

      {/* Días de la semana (Cabecera) */}
      <div className="grid grid-cols-5 border-b border-gray-200 bg-gray-50/50">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="py-2.5 text-center text-xs font-medium text-gray-500 uppercase"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Grilla del Mes */}
      <div className="grid grid-cols-5 h-[calc(100vh-200px)] auto-rows-fr divide-x divide-y divide-gray-200 bg-gray-200">
        {days.map((day) => {
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isCurrentDay = isSameDay(day, today);

          // Esto es O(1). No hay loops anidados.
          const dayKey = format(day, "yyyy-MM-dd");
          const dayEvents = eventsByDate.get(dayKey) || [];

          return (
            <div
              key={dayKey}
              className={`min-h-30 p-2 bg-white flex flex-col gap-1 ${!isCurrentMonth
                ? "bg-gray-50/60 text-gray-400"
                : "text-gray-900"
                }`}
            >
              {/* Número del día */}
              <span
                className={`${isCurrentDay ? 'border-2 border-blue-500 rounded-full w-6 h-6 flex items-center justify-center' : ''} text-xs font-semibold self-start mb-1 ${!isCurrentMonth ? "text-gray-300" : "text-gray-700"
                  }`}
              >
                {format(day, "d")}
              </span>

              {/* Inyección de Eventos Personalizados */}
              <div className="flex flex-col gap-1.5 overflow-y-auto h-45">
                {dayEvents.map((event) => (
                  <div key={event.id}>{renderEvent(event)}</div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
