"use client";

import Header from "@/components/header";
import useEventsContext from "@/hooks/use-events-context";
import { Event } from "@/types/events-type";
import { createClient } from "@/utils/supabase/client";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AddEvent = ({ id }: { id?: string }) => {
  const persons = ["GAL", "MEL"];

  const { addEvent, updateEvent } = useEventsContext();
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(dayjs());
  const [end, setEnd] = useState(dayjs());
  const allDay = true;
  const isDone = false;
  const [category, setCategory] = useState("Otros");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("income");
  const [loading, setLoading] = useState(false);
  const [person, setPerson] = useState(persons[0]);

  useEffect(() => {
    if (id) {
      const supabase = createClient();
      supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single()
        .then(({ data }) => {
          setTitle(data.title);
          setStart(dayjs(data.start));
          setEnd(dayjs(data.end));
          setCategory(data.category);
          setAmount(data.amount);
          setType(data.type);
          setPerson(data.person);
        });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const event: Event = {
      title,
      start: start.toDate(),
      end: end.toDate(),
      allDay,
      category,
      amount,
      month: start.month() + 1,
      year: start.year(),
      type,
      isDone,
      person,
    };
    if (id) {
      await updateEvent(id, event);
      toast.success("Evento actualizado exitosamente");
    } else {
      await addEvent(event);
      toast.success("Evento agregado exitosamente");
    }
    setLoading(false);
    setTitle("");
    setStart(dayjs());
    setEnd(dayjs());
    setCategory("Otros");
    setAmount(0);
    setType("income");
  };

  const categories = [
    "Gastos",
    "Ingresos Brutos",
    "IVA",
    "Tarjeta Visa P",
    "Tarjeta Visa G",
    "Tarjeta Mastercard P",
    "Tarjeta Mastercard G",
    "Luz",
    "Gas",
    "Internet",
    "Claro G",
    "Claro E",
    "Patente",
    "Estrada",
    "Imp Inmobiliario",
    "Autonomos",
    "Caja Pcia CPBA",
    "Expensas",
    "Cintia M",
    "Lourdes L",
    "Del Fabbro M",
  ];

  return (
    <>
      <Toaster position="bottom-center" />
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen bg-white p-4 pt-24">
        <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-purple-700">
            Agregar un nuevo evento
          </h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Nombre del evento
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Monto
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
                min={0}
                step={0.01}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Tipo
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              >
                <option value="income">Ingreso</option>
                <option value="outcome">Pago</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Categoría
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              >
                <option value="Otros">Otros</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Persona
              </label>
              <select
                value={person}
                onChange={(e) => setPerson(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              >
                {persons.map((person) => (
                  <option key={person} value={person}>
                    {person}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition-colors shadow-md disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar evento"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
};
export default AddEvent;
