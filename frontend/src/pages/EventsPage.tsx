
import { useState } from "react";

import { useEvents } from "../context/EventContext";
import type { Category } from "../types/campus-event";

import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";

import {
  filterByCategory,
  searchEvents,
} from "../utils/filter-events";

function EventsPage() {
  const { events } = useEvents();

  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const categories: Category[] = [
    ...new Set(events.map((event) => event.category)),
  ];

  const filteredEvents = filterByCategory(
    searchEvents(events, searchText),
    category
  );

  return (
    <>
      <EventFilter
        searchText={searchText}
        category={category}
        categories={categories}
        onSearchChange={setSearchText}
        onCategoryChange={setCategory}
      />

      <p className="sonuc" aria-live="polite">
        {filteredEvents.length === 0
          ? "Aramanıza uygun etkinlik bulunamadı."
          : `${filteredEvents.length} etkinlik listeleniyor.`}
      </p>

      <section className="kart-izgarasi uclu-grid">
        <EventList
          events={filteredEvents}
          emptyText="Aramanıza uygun etkinlik bulunamadı."
        />
      </section>
    </>
  );
}

export default EventsPage;
