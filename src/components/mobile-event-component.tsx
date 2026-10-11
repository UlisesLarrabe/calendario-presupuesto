import { Event } from "@/types/events-type";
import Link from "next/link";

export default function MobileEventComponent({ event }: { event: Event }) {
    return (
        <Link href={`/evento/${event.id}`}>
            <article className="p-4 rounded-2xl bg-[#F4F3F9] flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#D8E2FF]"></div>
                <div className="flex gap-2 justify-between w-full items-center">
                    <span className="font-semibold text-md text-gray-700">{event.title}</span>
                    <span className="font-bold">${event.amount.toLocaleString("es-ES")}</span>
                </div>
            </article>
        </Link>
    )
}