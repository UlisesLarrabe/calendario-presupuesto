"use client";
import { Event } from "@/types/events-type";
import dayjs from "dayjs";
import Header from "./header";
import ArrowDown from "@/svgs/arrow-down";
import ArrowUp from "@/svgs/arrow-up";
import EditIcon from "@/svgs/edit-icon";
import RepeatIcon from "@/svgs/repeat-icon";
import XIcon from "@/svgs/x-icon";
import Link from "next/link";
import useEventsContext from "@/hooks/use-events-context";
import { useState } from "react";

const EventInfo = ({ event }: { event: Event }) => {
  const { deleteEvent } = useEventsContext();
  const [loading, setLoading] = useState(false);

  if (!event)
    return (
      <div className="text-center text-gray-500">Evento no encontrado</div>
    );
  const handleDelete = async () => {
    if (!event.id) return;
    setLoading(true);
    await deleteEvent(event.id);
    setLoading(false);
    window.location.href = "/";
  };
  return (
    <>
      <Header />
      <div className="pt-24 pb-8 px-2 min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
        <article
          className={
            "max-w-lg mx-auto rounded-2xl shadow-2xl bg-white/80 backdrop-blur-md text-gray-900 relative overflow-hidden border border-white/60"
          }
          style={{ boxShadow: "0 8px 40px 0 rgba(0,0,0,0.10)" }}
          aria-labelledby="event-title"
        >
          <header className="flex items-center gap-3 p-6 border-b border-white/20">
            <span className="inline-flex items-center justify-center bg-white/20 rounded-full w-12 h-12">
              {event.type === "income" ? <ArrowDown /> : <ArrowUp />}
            </span>
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight mb-1 drop-shadow-lg">
                {event.title}
              </h2>
              <div className="text-xs opacity-80 font-semibold tracking-wide">
                {event.category}
              </div>
            </div>
          </header>
          <div className="p-6 grid grid-cols-1 gap-3 text-base">
            <div className="flex items-center gap-2">
              <span className="font-bold">Persona:</span>
              <span className="opacity-90">{event.person}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">Fecha:</span>
              <span className="opacity-90">
                {dayjs(event.start).format("DD/MM/YYYY HH:mm")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">Monto:</span>
              <span className="opacity-90">
                ${event.amount.toLocaleString("es-ES")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">Tipo:</span>
              <span className="opacity-90">
                {event.type === "income" ? "Ingreso" : "Egreso"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">Estado:</span>
              <span
                className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                  event.isDone ? "bg-green-600/80" : "bg-yellow-500/70"
                }`}
              >
                {event.isDone ? "Completado" : "Pendiente"}
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 px-6 pb-6">
            <Link
              href={`/modificar/${event.id}`}
              className="flex-1 px-4 py-2 rounded-lg bg-white/80 text-indigo-700 font-bold shadow hover:bg-indigo-100 hover:text-indigo-900 transition border border-white/30"
            >
              <span className="inline-flex items-center gap-2">
                <EditIcon />
                Modificar evento
              </span>
            </Link>
            <Link
              href={`/repetir/${event.id}`}
              className="flex-1 px-4 py-2 rounded-lg bg-white/80 text-green-700 font-bold shadow hover:bg-green-100 hover:text-green-900 transition border border-white/30"
            >
              <span className="inline-flex items-center gap-2">
                <RepeatIcon />
                Repetir evento
              </span>
            </Link>
            <button
              className="flex-1 px-4 py-2 rounded-lg bg-white/80 text-red-700 font-bold shadow hover:bg-red-100 hover:text-red-900 transition border border-white/30 disabled:opacity-50 cursor-pointer"
              onClick={handleDelete}
              disabled={loading}
            >
              <span className="inline-flex items-center gap-2">
                <XIcon />
                Eliminar evento
              </span>
            </button>
          </div>
        </article>
      </div>
    </>
  );
};

export default EventInfo;
