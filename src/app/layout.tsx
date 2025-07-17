import type { Metadata } from "next";
import "@fontsource-variable/onest";
import "./globals.css";
import { EventsContextProvider } from "@/context/events-context";

export const metadata: Metadata = {
  title: "Calendario de Presupuesto",
  description: "Calendario de Presupuesto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased w-full h-full">
        <EventsContextProvider>
          {children}
        </EventsContextProvider>
      </body>
    </html>
  );
}
