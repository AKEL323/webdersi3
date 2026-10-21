import { useEffect, useState } from "react";
import "./App.css";

import { events } from "./data/events";

import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";

import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";

import EventForm from "./components/forms/EventForm";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  useEffect(() => {
    document.title = "Kampüs etkinlikleri-Kariyer Günleri 2026";
  }, []);

  function go(
    next: PageName,
    id: string | null = null
  ): void {
    setPage(next);
    setSelectedId(id);
    window.scrollTo(0, 0);
  }

  const selected = selectedId
    ? findEventById(events, selectedId)
    : undefined;

  const upcomingEvents = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const categories: Category[] = [
    ...new Set(events.map((event) => event.category)),
  ];

  const filteredEvents = filterByCategory(
    searchEvents(events, searchText),
    category
  );

  function handleSelectEvent(id: string): void {
    go("detail", id);
  }

  function handleEditEvent(_id: string): void {
    go("update", _id);
  }

  function handleFormSubmit(): void {
    window.scrollTo(0, 0);
  }

  return (
    <div className="container">
      <Header
        currentPage={page}
        onNavigate={go}
      />

      <main>
        {page === "home" && (
          <>
            <p>
              Fakültedeki etkinlikleri tek yerden takip edin.
            </p>

            <strong>Yaklaşan 2 etkinlik</strong>

            <section className="kart-izgarasi ikili-grid">
              <EventList
                events={upcomingEvents}
                onShowDetail={handleSelectEvent}
              />
            </section>

            <p>
              <a
                href="#events"
                onClick={(event) => {
                  event.preventDefault();
                  go("events");
                }}
              >
                Tüm etkinlikleri gör →
              </a>
            </p>
          </>
        )}

        {page === "events" && (
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
                onShowDetail={handleSelectEvent}
                emptyText="Aramanıza uygun etkinlik bulunamadı."
              />
            </section>
          </>
        )}

        {page === "detail" && (
          <EventDetail
            event={selected}
            onBack={() => go("events")}
            onEdit={handleEditEvent}
          />
        )}

        {(page === "add" || page === "update") && (
          <EventForm onSubmit={handleFormSubmit} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;