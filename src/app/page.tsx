"use client";

import CalendarComponent from "@/components/calendar-component";
import CalendarIcon from "@/svgs/calendar-icon";
import PlusIcon from "@/svgs/plus-icon";
import useEventsContext from "@/hooks/use-events-context";
import Link from "next/link";

export default function Home() {
  const { events } = useEventsContext();
  console.log(events);
  return (
    <div>
      <header className="flex py-4 justify-between items-center p-2">
        <div className="flex items-center gap-2">
          <CalendarIcon />
          <h1 className="text-3xl">Calendario de Presupuesto</h1>
        </div>
        <div>
          <Link
            href="/agregar"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors cursor-pointer flex items-center gap-2"
          >
            <PlusIcon />
            Agregar Evento
          </Link>
        </div>
      </header>
      <CalendarComponent />
    </div>
  );
}
