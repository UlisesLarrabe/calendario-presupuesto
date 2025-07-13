"use client";

import { Event } from "@/types/events-type";
import { createClient } from "@/utils/supabase/client";
import { createContext, useEffect, useState } from "react";
import dayjs from "dayjs";

interface EventsContextType {
  events: Event[];
  setEvents: (events: Event[]) => void;
  getEventsByMonth: (month: number, year: number) => Promise<void>;
  addEvent: (event: Event) => Promise<void>;
  getEventsByMonthAndCategory: (
    month: number,
    year: number,
    category: string
  ) => Promise<Event[]>;
  getEventsByMonthAndType: (
    month: number,
    year: number,
    type: string
  ) => Promise<Event[]>;
  getOutDatedOutcomeEvents: () => Promise<Event[]>;
  getIncomeOutcomeEvents: () => Promise<Event[]>;
  updateEvent: (id: string, event: Event) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
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
    const { data: events, error } = await supabase
      .from("events")
      .select("*")
      .eq("month", month)
      .eq("year", year);
    if (error) {
      console.error(error);
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

  const getEventsByMonthAndCategory = async (
    month: number,
    year: number,
    category: string
  ) => {
    const { data: events, error } = await supabase
      .from("events")
      .select("*")
      .eq("month", month)
      .eq("year", year)
      .eq("category", category);
    if (error) {
      throw new Error("Error al obtener eventos con la categoria " + category);
    }
    return events as Event[];
  };

  const getEventsByMonthAndType = async (
    month: number,
    year: number,
    type: string
  ) => {
    const { data: events, error } = await supabase
      .from("events")
      .select("*")
      .eq("month", month)
      .eq("year", year)
      .eq("type", type);
    if (error) {
      throw new Error("Error al obtener eventos con el tipo " + type);
    }
    return events as Event[];
  };

  const getOutDatedOutcomeEvents = async () => {
    const { data: events, error } = await supabase
      .from("events")
      .select("*")
      .eq("month", dayjs().month() + 1)
      .eq("year", dayjs().year())
      .eq("type", "outcome")
      .lt("start", dayjs().format("YYYY-MM-DD"));
    if (error) {
      throw new Error("Error al obtener eventos");
    }
    return events as Event[];
  };

  const getIncomeOutcomeEvents = async () => {
    const { data: events, error } = await supabase
      .from("events")
      .select("*")
      .eq("month", dayjs().month() + 1)
      .eq("year", dayjs().year())
      .eq("type", "outcome")
      .gt("start", dayjs().format("YYYY-MM-DD"));
    if (error) {
      throw new Error("Error al obtener eventos");
    }
    return events as Event[];
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
        getEventsByMonthAndCategory,
        getEventsByMonthAndType,
        getOutDatedOutcomeEvents,
        getIncomeOutcomeEvents,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
