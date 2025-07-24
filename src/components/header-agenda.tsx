import React from "react";

const HeaderAgenda = ({
  setShowAgenda,
}: {
  setShowAgenda: (show: boolean) => void;
}) => {
  return (
    <div className="flex justify-between items-center py-2">
      <h2 className="text-xl font-bold text-blue-700 mb-4">
        Agenda de Eventos
      </h2>
      <button
        className="p-2 border rounded cursor-pointer"
        onClick={() => setShowAgenda(false)}
      >
        Ocultar agenda
      </button>
    </div>
  );
};

export default HeaderAgenda;
