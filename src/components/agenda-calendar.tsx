"use client";

import React from "react";
import { Event } from "@/types/events-type";
import dayjs from "dayjs";
import ArrowUp from "@/svgs/arrow-up";
import ArrowDown from "@/svgs/arrow-down";
import HeaderAgenda from "./header-agenda";

const AgendaCalendar = ({
  events,
  setShowAgenda,
}: {
  events: Event[];
  setShowAgenda: (show: boolean) => void;
}) => {
  if (!events || events.length === 0) {
    return (
      <section className="p-4 bg-white/90 shadow-lg rounded-lg border border-blue-100">
        <HeaderAgenda setShowAgenda={setShowAgenda} />
        <p className="text-gray-500 text-center py-8 bg-blue-50/50 rounded-lg border border-blue-100">
          No hay eventos para mostrar
        </p>
      </section>
    );
  }

  return (
    <section className="p-4 bg-white/90 shadow-lg rounded-lg border border-blue-100 overflow-x-auto">
      <HeaderAgenda setShowAgenda={setShowAgenda} />
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-blue-50 border-b-2 border-blue-200">
            <th className="py-3 px-4 text-left font-semibold text-blue-700 uppercase text-sm tracking-wider">
              Título
            </th>
            <th className="py-3 px-4 text-left font-semibold text-blue-700 uppercase text-sm tracking-wider">
              Fecha
            </th>
            <th className="py-3 px-4 text-left font-semibold text-blue-700 uppercase text-sm tracking-wider">
              Tipo
            </th>
            <th className="py-3 px-4 text-left font-semibold text-blue-700 uppercase text-sm tracking-wider">
              Estado
            </th>
            <th className="py-3 px-4 text-right font-semibold text-blue-700 uppercase text-sm tracking-wider">
              Monto
            </th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr
              onDoubleClick={() =>
                (window.location.href = `/evento/${event.id}`)
              }
              key={event.id}
              className={`border-b border-gray-300 hover:bg-blue-50 transition-colors ${
                event.isDone ? "bg-green-50" : ""
              }`}
            >
              <td className="py-4 px-4 text-gray-800">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center justify-center rounded-full w-7 h-7 ${
                      event.type === "income"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {event.type === "income" ? <ArrowUp /> : <ArrowDown />}
                  </span>
                  <span className="font-medium">{event.title}</span>
                  {event.person && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {event.person}
                    </span>
                  )}
                </div>
              </td>
              <td className="py-4 px-4 text-gray-600">
                <span className="bg-blue-50 px-2 py-1 rounded text-sm font-medium">
                  {dayjs(event.start).format("DD/MM/YYYY")}
                </span>
              </td>
              <td className="py-4 px-4">
                <span
                  className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                    event.type === "income"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {event.type === "income" ? "Ingreso" : "Egreso"}
                </span>
              </td>
              <td className="py-4 px-4">
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-sm border
                  ${
                    event.isDone
                      ? "bg-green-100 text-green-800 border-green-300"
                      : "bg-orange-100 text-orange-800 border-orange-300"
                  }`}
                >
                  {event.isDone ? "Completado" : "Pendiente"}
                </span>
              </td>
              <td className="py-4 px-4 text-right font-bold">
                <span
                  className={`px-3 py-1.5 inline-block rounded ${
                    event.type === "income"
                      ? "text-green-700 bg-green-50"
                      : "text-red-700 bg-red-50"
                  }`}
                >
                  ${event.amount.toLocaleString("es-ES")}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default AgendaCalendar;
