"use client";

import { Event } from "@/types/events-type";
import { createClient } from "@/utils/supabase/client";
import { createContext, useEffect, useState } from "react";
import dayjs from "dayjs";

interface Summary {
  type: string;
  month: number;
  total: number;
}

interface EventsContextType {
  events: Event[];
  setEvents: (events: Event[]) => void;
  getEventsByMonth: (month: number, year: number) => Promise<void>;
  addEvent: (event: Event) => Promise<void>;
  updateEvent: (id: string, event: Event) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  getSummaryPerMonth: (year: number) => Promise<Summary[]>;
}

export const EventsContext = createContext<EventsContextType | null>(null);

export const EventsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const supabase = createClient();
  const [events, setEvents] = useState<Event[]>([]);

  const getEventsByMonth = async (month: number, year: number) => {
    const { data: events, error } = await supabase.rpc(
      "get_events_by_month_and_year",
      {
        month_input: month,
        year_input: year,
      }
    );
    if (error) {
      throw new Error(error?.message || "Error al cargar los eventos");
    }
    setEvents(events as Event[]);
  };

  const addEvent = async (event: Event) => {
    const { data, error } = await supabase
      .from("events")
      .insert(event)
      .select();
    if (error) {
      throw new Error("Error al agregar un evento");
    }
    setEvents((prevEvents) => [...prevEvents, data[0]]);
  };

  const updateEvent = async (id: string, event: Event) => {
    const { data, error } = await supabase
      .from("events")
      .update(event)
      .eq("id", id)
      .select();
    if (error) {
      throw new Error("Error al actualizar un evento");
    }
    setEvents((prevEvents) =>
      prevEvents.map((event) => (event.id === id ? data[0] : event))
    );
  };

  const deleteEvent = async (id: string) => {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) {
      throw new Error("Error al eliminar un evento");
    }
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  const getSummaryPerMonth = async (year: number) => {
    const { data: summary, error } = await supabase.rpc(
      "get_summary_per_month",
      {
        year_input: year,
      }
    );

    if (error) {
      throw new Error(error?.message || "Error al cargar el resumen");
    }

    return summary;
  };

  useEffect(() => {
    getEventsByMonth(dayjs().month() + 1, dayjs().year());
  }, []);

  return (
    <EventsContext.Provider
      value={{
        events,
        setEvents,
        getEventsByMonth,
        addEvent,
        updateEvent,
        deleteEvent,
        getSummaryPerMonth,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
