"use client";

import { useState, useMemo } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { es } from "date-fns/locale/es";
import { Event } from "@/types/events-type";

interface MobileCalendarProps {
  events: Event[];
  renderEvent: (event: Event) => React.ReactNode;
}

const DAYS_OF_WEEK = ["L", "M", "M", "J", "V", "S", "D"];

export function MobileCalendar({ events, renderEvent }: MobileCalendarProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(false);

  const { days, currentMonthName } = useMemo(() => {
    let startDate, endDate;

    if (isExpanded) {
      const monthStart = startOfMonth(selectedDate);
      const monthEnd = endOfMonth(monthStart);
      startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
      endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
    } else {
      startDate = startOfWeek(selectedDate, { weekStartsOn: 1 });
      endDate = endOfWeek(selectedDate, { weekStartsOn: 1 });
    }

    const allDays = eachDayOfInterval({ start: startDate, end: endDate });

    return {
      days: allDays,
      currentMonthName: format(selectedDate, "MMMM yyyy", { locale: es }),
    };
  }, [selectedDate, isExpanded]);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, Event[]>();
    events.forEach((event) => {
      const key = event.start.toISOString().split('T')[0];
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(event);
    });
    return map;
  }, [events]);

  const handlePrevious = () => {
    setSelectedDate((prev) =>
      isExpanded ? subMonths(prev, 1) : subWeeks(prev, 1),
    );
  };

  const handleNext = () => {
    setSelectedDate((prev) =>
      isExpanded ? addMonths(prev, 1) : addWeeks(prev, 1),
    );
  };

  const selectedDayKey = format(selectedDate, "yyyy-MM-dd");
  const selectedDayEvents = eventsByDate.get(selectedDayKey) || [];

  return (
    <div className="w-full flex flex-col gap-4 font-sans text-gray-800">
      {/* CONTENEDOR DEL CALENDARIO */}
      <div className="relative mt-4">
        <div className="bg-white rounded-3xl pt-10 pb-4 px-4 shadow-sm border border-gray-100">
          {/* Cabecera y Navegación */}
          <div className="flex justify-between items-center mb-6 pl-20">
            <div>
              <h2 className="text-lg font-medium capitalize">
                {currentMonthName}
              </h2>
              <p className="text-sm text-gray-500">Mi Calendar</p>
            </div>
            {/* Flechas de navegación */}
            <div className="flex gap-2">
              <button
                onClick={handlePrevious}
                className="bg-gray-100 p-2 rounded-xl text-gray-600 hover:bg-gray-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="bg-gray-100 p-2 rounded-xl text-gray-600 hover:bg-gray-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Días de la semana (L M M J V S D) */}
          <div className="grid grid-cols-7 text-center mb-2">
            {DAYS_OF_WEEK.map((day, i) => (
              <div key={i} className="text-gray-500 text-sm mb-2 font-medium">
                {day}
              </div>
            ))}
          </div>

          {/* Grilla de Días Dinámica */}
          <div className="grid grid-cols-7 text-center gap-y-2 mb-4">
            {days.map((day) => {
              const dayKey = format(day, "yyyy-MM-dd");
              const hasEvents = eventsByDate.has(dayKey);
              const isSelected = isSameDay(day, selectedDate);
              const isCurrentMonth = isSameMonth(day, selectedDate);

              return (
                <button
                  key={dayKey}
                  onClick={() => setSelectedDate(day)}
                  className={`flex flex-col items-center justify-center py-1 relative ${!isCurrentMonth && isExpanded
                    ? "text-gray-300"
                    : "text-gray-700"
                    }`}
                >
                  <span
                    className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${isSelected
                      ? "bg-[#0b1c3c] text-white font-medium shadow-md"
                      : "hover:bg-gray-100"
                      }`}
                  >
                    {format(day, "d")}
                  </span>

                  {/* Puntito indicador de eventos */}
                  {hasEvents && !isSelected && (
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full absolute bottom-0"></span>
                  )}
                  {hasEvents && isSelected && (
                    <span className="w-1.5 h-1.5 bg-white rounded-full absolute bottom-0"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Botón Expandir/Contraer */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full text-center text-sm text-gray-600 flex items-center justify-center gap-1 mt-2 hover:text-gray-900 transition-colors"
          >
            {isExpanded ? "Contraer mes" : "Expandir mes"}
            <svg
              className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* LISTA DE EVENTOS DEL DÍA SELECCIONADO */}
      <div className="flex flex-col gap-3 mt-2 p-4 bg-white rounded-2xl">
        <div className="flex justify-between items-center px-2">
          <h3 className="text-gray-800 font-medium capitalize flex justify-center items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-300"></div>
            {format(selectedDate, "EEEE d", { locale: es })} de {format(selectedDate, "MMMM", { locale: es })}
          </h3>
          <span className=" text-gray-700 text-sm px-3 py-1 rounded-full">
            {selectedDayEvents.length}{" "}
            {selectedDayEvents.length === 1 ? "Evento" : "Eventos"}
          </span>
        </div>

        {/* Renderizado de eventos inyectados por prop */}
        <div className="flex flex-col gap-3">
          {selectedDayEvents.length > 0 ? (
            selectedDayEvents.map((event) => (
              <div key={event.id}>{renderEvent(event)}</div>
            ))
          ) : (
            <p className="text-center text-gray-400 py-8 text-sm">
              No hay eventos para este día.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
