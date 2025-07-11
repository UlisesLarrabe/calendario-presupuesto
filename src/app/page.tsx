import CalendarComponent from "@/components/calendar-component";
import CalendarIcon from "@/svgs/calendar-icon";
import PlusIcon from "@/svgs/plus-icon";
import Link from "next/link";
import EventsResume from "@/components/events-resume";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const verifyCookies = await cookies();
  const token = verifyCookies.has("auth");
  if (!token) {
    redirect("/login");
  }
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
      <main className="w-full flex gap-4 ">
        <div className="w-2/3">
          <CalendarComponent />
        </div>
        <div className="w-1/3">
          <EventsResume />
        </div>
      </main>
    </div>
  );
}
