"use client";
import { useState } from "react";

export default function CookieBanner({
  setHasAcceptedCookies,
}: {
  setHasAcceptedCookies: (value: boolean) => void;
}) {
  const [show, setShow] = useState(true);

  const handleChoice = (accept: boolean) => {
    setHasAcceptedCookies(accept);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 mx-auto max-w-md bg-white border border-gray-300 rounded-lg px-6 py-4 shadow-lg text-sm z-50 flex flex-col items-center">
      <span>
        Este sitio utiliza cookies para mejorar la experiencia del usuario. Si
        no se aceptan, no se podrá acceder al sitio.
      </span>
      <div className="mt-3 flex gap-3">
        <button
          className="px-4 py-1 rounded bg-green-600 text-white hover:bg-green-700 transition"
          onClick={() => handleChoice(true)}
        >
          Aceptar
        </button>
        <button
          className="px-4 py-1 rounded bg-red-600 text-white hover:bg-red-700 transition"
          onClick={() => handleChoice(false)}
        >
          Rechazar
        </button>
      </div>
    </div>
  );
}
