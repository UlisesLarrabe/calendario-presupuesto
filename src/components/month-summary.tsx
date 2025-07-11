"use client";
import useEventsContext from "@/hooks/use-events-context";

const MonthSummary = () => {
  const { events: monthEvents } = useEventsContext();

  // Agrupar por categoría
  const groupByCategory = (type: string) => {
    const filtered = monthEvents.filter((e) => e.type === type);
    const grouped: Record<string, { total: number }> = {};
    filtered.forEach((e) => {
      if (!grouped[e.category]) grouped[e.category] = { total: 0 };
      grouped[e.category].total += e.amount;
    });
    return grouped;
  };
  const incomesByCat = groupByCategory("income");
  const outcomesByCat = groupByCategory("outcome");

  // Totales
  const totalIngresado = monthEvents
    .filter((e) => e.type === "income" && e.isDone)
    .reduce((acc, e) => acc + e.amount, 0);
  const totalPagado = monthEvents
    .filter((e) => e.type === "outcome" && e.isDone)
    .reduce((acc, e) => acc + e.amount, 0);
  const faltaCobrar = monthEvents
    .filter((e) => e.type === "income" && !e.isDone)
    .reduce((acc, e) => acc + e.amount, 0);
  const faltaPagar = monthEvents
    .filter((e) => e.type === "outcome" && !e.isDone)
    .reduce((acc, e) => acc + e.amount, 0);

  // Colores blancos y suaves
  const colors = {
    backgroundDetails: "bg-white border border-gray-200 shadow-sm",
    backgroundSummary: "bg-[#F9FAFB]",
    backgroundArticle: "bg-[#F4F4F5]",
    colorText: "text-black",
  };

  return (
    <details
      className={`w-[95%] rounded-lg ${colors.backgroundDetails} mb-2`}
      open
    >
      <summary
        className={`text-lg font-semibold p-4 cursor-pointer ${colors.colorText}`}
      >
        Resumen mensual
      </summary>
      <div
        className={`flex flex-col gap-4 w-full ${colors.backgroundSummary} p-4`}
      >
        {/* Totales */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-2 p-2 rounded-lg border bg-white">
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500">Total ingresado</span>
            <span className="text-green-600 font-bold text-lg">
              ${totalIngresado}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500">Total pagado</span>
            <span className="text-red-600 font-bold text-lg">
              ${totalPagado}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500">Falta cobrar</span>
            <span className="text-yellow-600 font-bold text-lg">
              ${faltaCobrar}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500">Falta pagar</span>
            <span className="text-orange-500 font-bold text-lg">
              ${faltaPagar}
            </span>
          </div>
        </section>
        {/* Ingresos por categoría */}
        <section>
          <h3 className={`text-md font-semibold mb-2 ${colors.colorText}`}>
            Ingresos por categoría
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(incomesByCat).length === 0 && (
              <span className="text-gray-400">Sin ingresos</span>
            )}
            {Object.entries(incomesByCat).map(([cat, { total }]) => (
              <div
                key={cat}
                className={`rounded-lg px-3 py-2 ${colors.backgroundArticle} border border-green-100`}
              >
                <span className="font-semibold">{cat}:</span> ${total}
              </div>
            ))}
          </div>
        </section>
        {/* Egresos por categoría */}
        <section>
          <h3 className={`text-md font-semibold mb-2 ${colors.colorText}`}>
            Egresos por categoría
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(outcomesByCat).length === 0 && (
              <span className="text-gray-400">Sin egresos</span>
            )}
            {Object.entries(outcomesByCat).map(([cat, { total }]) => (
              <div
                key={cat}
                className={`rounded-lg px-3 py-2 ${colors.backgroundArticle} border border-red-100`}
              >
                <span className="font-semibold">{cat}:</span> ${total}
              </div>
            ))}
          </div>
        </section>
      </div>
    </details>
  );
};

export default MonthSummary;
