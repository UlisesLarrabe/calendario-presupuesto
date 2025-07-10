import { useContext } from "react";
import { EventsContext } from "../context/events-context";

const useEventsContext = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error(
      "useEventsContext must be used within an EventsContextProvider"
    );
  }
  return context;
};

export default useEventsContext;
