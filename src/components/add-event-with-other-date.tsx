"use client";

import { Event } from "@/types/events-type";
import useEventsContext from "@/hooks/use-events-context";
import dayjs from "dayjs";
import { useState } from "react";
import Header from "./header";
import toast, { Toaster } from "react-hot-toast";
import ArrowUp from "@/svgs/arrow-up";
import ArrowDown from "@/svgs/arrow-down";

const AddEventWithOtherDate = ({ event }: { event: Event | undefined }) => {
  const { addEvent } = useEventsContext();
  const [date, setDate] = useState(dayjs(event?.start).add(1, "month"));
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;
    setLoading(true);
    await addEvent({
      title: event.title,
      start: date.toDate(),
      end: date.toDate(),
      month: date.month() + 1,
      year: date.year(),
      allDay: event.allDay,
      category: event.category,
      amount: event.amount,
      type: event.type,
      isDone: false,
      person: event.person,
    });
    toast.success("Evento agregado exitosamente");
    setLoading(false);
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 p-4 justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      <Header />
      <Toaster position="top-center" reverseOrder={false} />
      <section className="w-full max-w-md flex flex-col gap-4 p-4 justify-center items-center">
        <h2 className="text-3xl font-extrabold text-blue-700 drop-shadow-sm">
          Repetir evento
        </h2>
        {event && (
          <div className="w-full mb-2">
            <div className="rounded-xl shadow bg-white/95 border border-blue-100 p-4 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center bg-blue-100 rounded-full w-10 h-10">
                  {event.type === "income" ? <ArrowUp /> : <ArrowDown />}
                </span>
                <div>
                  <div className="text-lg font-bold text-gray-800">
                    {event.title}
                  </div>
                  <div className="text-xs text-gray-500">{event.category}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-sm text-gray-600 pl-2">
                <span className="bg-blue-50 px-2 py-0.5 rounded">
                  {dayjs(event.start).format("DD/MM/YYYY")}
                </span>
                {event.amount && (
                  <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded font-semibold">
                    ${event.amount}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
        <form
          className="flex flex-col gap-4 bg-white/90 shadow-xl backdrop-blur-md rounded-xl p-6 border border-blue-100 w-full"
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="date"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Fecha del evento
          </label>
          <input
            id="date"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            type="date"
            value={date.format("YYYY-MM-DD")}
            onChange={(e) => setDate(dayjs(e.target.value))}
          />
          <button
            className="w-full p-2 mt-2 bg-blue-500 hover:bg-blue-600 transition text-white rounded font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Agregar evento"}
          </button>
        </form>
      </section>
    </div>
  );
};
export default AddEventWithOtherDate;
