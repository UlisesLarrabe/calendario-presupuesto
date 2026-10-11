"use client";
import { Event } from "@/types/events-type";
import dayjs from "dayjs";
import Header from "./header";
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
      <div className="pt-24 pb-8 px-2 min-h-screen bg-gradient-to-br ">
        <article
          className={
            "max-w-lg mx-auto rounded-2xl  bg-white/80  text-gray-900 relative overflow-hidden border border-gray-300"
          }
          aria-labelledby="event-title"
        >
          <header className="flex items-center gap-3 p-6 border-b border-white/20">
            <div className="w-20 h-20 bg-[#D3111A] rounded-2xl flex items-center justify-center">
              <p className="text-4xl font-extrabold text-white">{event.title.split(" ")[0][0]}</p>
            </div>
            <div className="flex justify-between w-full">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight mb-1 drop-shadow-lg">
                  {event.title}
                </h2>
                <div className="text-xs opacity-80 font-semibold tracking-wide text-gray-500">
                  {event.category}
                </div>
              </div>
              <div className={`flex items-center gap-2 px-2 py-1 rounded-2xl text-xs font-semibold ${event.isDone ? "bg-green-600/80" : "bg-[#FFFBEC]"} border border-yellow-300`}>
                <div className={`w-3 h-3 ${event.isDone ? "bg-green-600/80" : "bg-yellow-500/70"} rounded-full`}></div>
                <span className="font-medium">
                  {event.isDone ? "Completado" : "Pendiente"}
                </span>
              </div>
            </div>
          </header>
          <div className="p-6 grid grid-cols-1 gap-3 text-base">
            <div className="flex justify-between p-6 bg-[#FBFBFD] border border-gray-300 rounded-2xl">
              <div className="flex flex-col">
                <span className="text-gray-500">Monto</span>
                <span className="opacity-90 text-2xl font-extrabold">
                  ${event.amount.toLocaleString("es-ES")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={` ${event.type === "income" ? "bg-green-600/80" : "bg-red-200"} p-2 rounded-xl text-xs font-semibold`}>
                  {event.type === "income" ? "Ingreso" : "Egreso"}
                </span>
              </div>

            </div>
            <div className="flex flex-col gap-2 p-3 border border-gray-200 rounded-2xl  w-full">
              <div className="flex justify-between">
                <span className="text-gray-500 flex gap-2 justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#607d8b"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                    <path d="M6 21v-2a4 4 0 0 1 4 -4h3" />
                    <path d="M21 15h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
                    <path d="M19 21v1m0 -8v1" />
                  </svg>
                  Persona</span>
                <span className="opacity-90">{event.person}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2">
                <span className="text-gray-500 flex gap-2 justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#607d8b"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M13 21h-7a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v3" />
                    <path d="M16 3v4" />
                    <path d="M8 3v4" />
                    <path d="M4 11h12.5" />
                    <path d="M21 15h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
                    <path d="M19 21v1m0 -8v1" />
                  </svg>
                  Fecha</span>
                <span className="opacity-90">
                  {dayjs(event.start).format("DD/MM/YYYY HH:mm")}
                </span>
              </div>
            </div>


          </div>
          <div className="flex flex-col sm:flex-row gap-4 px-6 pb-6">
            <Link
              href={`/modificar/${event.id}`}
              className="flex-1 px-4 py-2 rounded-lg bg-white/80 text-indigo-700 font-bold shadow hover:bg-indigo-100 hover:text-indigo-900 transition border border-white/30"
            >
              <span className="inline-flex items-center gap-2">
                <EditIcon />
                Modificar
              </span>
            </Link>
            <Link
              href={`/repetir/${event.id}`}
              className="flex-1 px-4 py-2 rounded-lg bg-white/80 text-green-700 font-bold shadow hover:bg-green-100 hover:text-green-900 transition border border-white/30"
            >
              <span className="inline-flex items-center gap-2">
                <RepeatIcon />
                Repetir
              </span>
            </Link>
            <button
              className="flex-1 px-4 py-2 rounded-lg bg-white/80 text-red-700 font-bold shadow hover:bg-red-100 hover:text-red-900 transition border border-white/30 disabled:opacity-50 cursor-pointer"
              onClick={handleDelete}
              disabled={loading}
            >
              <span className="inline-flex items-center gap-2">
                <XIcon />
                Eliminar
              </span>
            </button>
          </div>
        </article>
      </div>
    </>
  );
};

export default EventInfo;
