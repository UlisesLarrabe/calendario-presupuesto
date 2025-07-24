"use client";

import useEventsContext from "@/hooks/use-events-context";
import { BarChart } from "@mui/x-charts";
import dayjs from "dayjs";
import { useEffect, useState, useMemo } from "react";

interface Summary {
  type: string;
  month: number;
  total: number;
}

interface ChartDataItem {
  income: number;
  outcome: number;
  month: string;
  [key: string]: string | number;
}

export default function ChartSummary() {
  const [summary, setSummary] = useState<Summary[]>([]);
  const { getSummaryPerMonth, events } = useEventsContext();

  useEffect(() => {
    getSummaryPerMonth(dayjs().year()).then((res: Summary[]) =>
      setSummary(res)
    );
  }, [getSummaryPerMonth, events]);

  const chartData = useMemo(() => {
    if (!summary || summary.length === 0) return [];

    const monthsData: Record<number, ChartDataItem> = {};

    for (let i = 1; i <= 12; i++) {
      monthsData[i] = {
        income: 0,
        outcome: 0,
        month: getMonthName(i),
      };
    }

    summary.forEach((item) => {
      if (item.type === "income") {
        monthsData[item.month].income = item.total;
      } else {
        monthsData[item.month].outcome = item.total;
      }
    });

    return Object.values(monthsData);
  }, [summary]);

  function getMonthName(monthNumber: number): string {
    const months = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];
    return months[monthNumber - 1];
  }

  const chartSetting = {
    yAxis: [
      {
        label: "Monto ($)",
        width: 60,
      },
    ],
    height: 300,
  };

  function valueFormatter(value: number | null) {
    return `$${value?.toLocaleString("es-ES") || 0}`;
  }

  return (
    <details className="group bg-white/90 w-[95%] shadow-lg rounded-lg border border-blue-100 overflow-hidden">
      <summary className="p-4 cursor-pointer hover:bg-blue-50/50 transition-colors flex items-center justify-between">
        <h2 className="text-xl font-bold text-blue-700">
          Resumen Financiero Anual
        </h2>
        <span className="text-blue-500 text-sm group-open:rotate-180 transition-transform">
          ▼
        </span>
      </summary>
      <div className="p-4 pt-0 border-t border-blue-100">
        {chartData.length > 0 ? (
          <BarChart
            dataset={chartData}
            xAxis={[{ dataKey: "month" }]}
            series={[
              {
                dataKey: "income",
                label: "Ingresos",
                valueFormatter,
                color: "#10b981",
              },
              {
                dataKey: "outcome",
                label: "Egresos",
                valueFormatter,
                color: "#ef4444",
              },
            ]}
            {...chartSetting}
          />
        ) : (
          <p className="text-gray-500 text-center py-8 bg-blue-50/50 rounded-lg border border-blue-100">
            No hay datos disponibles para mostrar
          </p>
        )}
      </div>
    </details>
  );
}
