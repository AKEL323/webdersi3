
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { CampusEvent } from "../types/campus-event";
import { events as initialEvents } from "../data/events";

export type EventInput = Omit<CampusEvent, "id">;

interface EventContextType {
  events: CampusEvent[];
  addEvent: (event: EventInput) => CampusEvent;
  updateEvent: (id: string, event: EventInput) => void;
  deleteEvent: (id: string) => void;
}

const EventContext = createContext<EventContextType | undefined>(
  undefined
);

interface EventProviderProps {
  children: ReactNode;
}

export function EventProvider({ children }: EventProviderProps) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  function addEvent(eventData: EventInput): CampusEvent {
    const newEvent: CampusEvent = {
      ...eventData,
      id: `event-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    };

    setEvents((currentEvents) => [...currentEvents, newEvent]);

    return newEvent;
  }

  function updateEvent(id: string, eventData: EventInput): void {
    setEvents((currentEvents) =>
      currentEvents.map((event) =>
        event.id === id ? { ...eventData, id } : event
      )
    );
  }

  function deleteEvent(id: string): void {
    setEvents((currentEvents) =>
      currentEvents.filter((event) => event.id !== id)
    );
  }

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvents(): EventContextType {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error(
      "useEvents, EventProvider içerisinde kullanılmalıdır."
    );
  }

  return context;
}
