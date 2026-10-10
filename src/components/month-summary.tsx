"use client";
import useEventsContext from "@/hooks/use-events-context";
import { useMemo } from "react";

const MonthSummary = () => {
  const { events: monthEvents } = useEventsContext();

  // Agrupar por categoría
  const groupByCategory = (type: string) => {
    if (!monthEvents || monthEvents.length === 0) return {};
    const filtered = monthEvents.filter((e) => e.type === type);
    const grouped: Record<string, { total: number }> = {};
    filtered.forEach((e) => {
      if (!grouped[e.category]) grouped[e.category] = { total: 0 };
      grouped[e.category].total += e.amount;
    });
    return grouped;
  };
  const incomesByCat = useMemo(() => groupByCategory("income"), [monthEvents]);
  const outcomesByCat = useMemo(
    () => groupByCategory("outcome"),
    [monthEvents]
  );

  // Totales
  const totalIngresado =
    monthEvents && monthEvents.length > 0
      ? monthEvents
        .filter((e) => e.type === "income" && e.isDone)
        .reduce((acc, e) => acc + e.amount, 0)
      : 0;
  const totalPagado =
    monthEvents && monthEvents.length > 0
      ? monthEvents
        .filter((e) => e.type === "outcome" && e.isDone)
        .reduce((acc, e) => acc + e.amount, 0)
      : 0;
  const faltaCobrar =
    monthEvents && monthEvents.length > 0
      ? monthEvents
        .filter((e) => e.type === "income" && !e.isDone)
        .reduce((acc, e) => acc + e.amount, 0)
      : 0;
  const faltaPagar =
    monthEvents && monthEvents.length > 0
      ? monthEvents
        .filter((e) => e.type === "outcome" && !e.isDone)
        .reduce((acc, e) => acc + e.amount, 0)
      : 0;

  // Colores blancos y suaves
  const colors = {
    backgroundDetails: "bg-white border border-gray-200 shadow-sm",
    backgroundSummary: "bg-[#F9FAFB]",
    backgroundArticle: "bg-[#F4F4F5]",
    colorText: "text-black",
  };

  const InfoContainer = ({ title, value, color }: { title: string; value: number, color: string }) => {
    return (
      <div className="flex flex-col justify-center bg-white rounded-2xl p-4">
        <span className="text-xs text-gray-500 uppercase">{title}</span>
        <span className={`${color} font-bold text-lg`}>
          ${value.toLocaleString("es-ES")}
        </span>
      </div>
    );
  };

  return (
    <details
      className={`w-full md:w-[95%] rounded-lg ${colors.backgroundDetails} mb-2`}
      open
    >
      <summary
        className={`text-lg font-semibold p-4 cursor-pointer ${colors.colorText} flex items-center`}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-2"></div>
        Resumen mensual
      </summary>
      <div
        className={`flex flex-col gap-4 w-full bg-white p-4`}
      >
        {/* Totales */}
        <section className="grid grid-cols-2 gap-2 p-4 bg-[#F9F9FB] rounded-lg">
          <InfoContainer
            title="Total ingresado"
            value={totalIngresado}
            color="text-green-600"
          />
          <InfoContainer
            title="Total pagado"
            value={totalPagado}
            color="text-red-600"
          />
          <InfoContainer
            title="Falta cobrar"
            value={faltaCobrar}
            color="text-yellow-600"
          />
          <InfoContainer
            title="Falta pagar"
            value={faltaPagar}
            color="text-orange-600"
          />

        </section>
        {/* Ingresos por categoría */}
        <section className="border-t w-full border-gray-200 pt-4">
          <div className="flex justify-between">
            <h3 className={`text-md font-semibold mb-2 ${colors.colorText}`}>
              Ingresos por categoría
            </h3>
            <p className="text-gray-500 text-sm font-medium">{monthEvents.filter((e) => e.type === "income").length} movimientos</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(incomesByCat).length === 0 && (
              <div className="flex justify-center items-center p-3 rounded-3xl w-full bg-gray-100 border-dashed border border-gray-300">
                <span className="text-gray-400">Sin ingresos</span>
              </div>
            )}
            {Object.entries(incomesByCat).map(([cat, { total }]) => {
              return (
                <div
                  key={cat}
                  className={`rounded-lg px-3 py-2 ${colors.backgroundArticle} border border-green-100`}
                >
                  <span className="font-semibold">{cat}:</span> $
                  {total.toLocaleString("es-ES")}
                </div>
              )
            })}
          </div>
        </section>
        {/* Egresos por categoría */}
        <section>
          <h3 className={`text-md font-semibold mb-2 ${colors.colorText}`}>
            Egresos por categoría
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(outcomesByCat).length === 0 && (
              <div className="flex justify-center items-center p-3 rounded-3xl w-full bg-gray-100 border-dashed border border-gray-300">
                <span className="text-gray-400">Sin egresos</span>
              </div>
            )}
            {Object.entries(outcomesByCat).map(([cat, { total }]) => {
              const randomColors = ["bg-red-300", "bg-yellow-300", "bg-blue-300", "bg-green-300", "bg-purple-300", "bg-pink-300", "bg-orange-300", "bg-gray-300"]
              const randomColor = randomColors[Math.floor(Math.random() * randomColors.length)]
              return (
                <div
                  key={cat}
                  className={`flex gap-2 justify-center items-center rounded-2xl px-3 py-2 ${colors.backgroundArticle} border border-red-100`}
                >
                  <span className="text-sm flex gap-2 justify-center items-center"><div className={`w-2 h-2 rounded-full ${randomColor}`}></div> {cat}:</span>
                  <span className="font-semibold"> ${total.toLocaleString("es-ES")}</span>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </details>
  );
};

export default MonthSummary;
