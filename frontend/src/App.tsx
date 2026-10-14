import { useEffect, useState } from "react";
import "./App.css";

import { events } from "./data/events";

import type {
  Category,
  CampusEvent,
} from "./types/campus-event";

import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

const categoryOptions: Category[] = [
  "Seminer",
  "Atölye",
  "Söyleşi",
  "Yarışma",
];

function formatDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number);

  return new Date(year, month - 1, day).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null): void {
    setPage(next);
    setSelectedId(id);
  }

  const selected = selectedId
    ? findEventById(events, selectedId)
    : undefined;

  const upcomingEvents = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const categories = [...new Set(events.map((event) => event.category))];

  const filteredEvents = filterByCategory(
    searchEvents(events, searchText),
    category
  );

  let heading: string;

  if (page === "home") {
    heading = "Kampüs Etkinlikleri";
  } else if (page === "events") {
    heading = "Tüm Etkinlikler";
  } else if (page === "detail") {
    heading = selected?.title ?? "Etkinlik Bulunamadı";
  } else if (page === "add") {
    heading = "Etkinlik Ekle";
  } else {
    heading = "Etkinlik Güncelle";
  }

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${heading}`;
  }, [heading]);

  const menuItems: { label: string; page: PageName }[] = [
    { label: "Ana Sayfa", page: "home" },
    { label: "Etkinlikler", page: "events" },
    { label: "Ekle", page: "add" },
  ];

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <span className="kategori">{event.category}</span>

        <h2>{event.title}</h2>

        <p>
          <strong>Tarih:</strong> {formatDate(event.date)}
        </p>

        <p>
          <strong>Saat:</strong> {event.time}
        </p>

        <p>
          <strong>Yer:</strong> {event.location}
        </p>

        <p>{event.description}</p>

        <button
          type="button"
          onClick={() => go("detail", event.id)}
        >
          Detayları gör
        </button>
      </article>
    );
  }

  return (
    <div className="container">
      <header className="site-baslik">
        <h1>{heading}</h1>

        <nav className="menu" aria-label="Ana menü">
          {menuItems.map((item) => (
            <a
              key={item.page}
              href={`#${item.page}`}
              aria-current={page === item.page ? "page" : undefined}
              onClick={(event) => {
                event.preventDefault();
                go(item.page);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {/* ANA SAYFA */}
        {page === "home" && (
          <>
            <p>Fakültedeki etkinlikleri tek yerden takip edin.</p>

            <strong>Yaklaşan 2 etkinlik</strong>

            <section className="kart-izgarasi ikili-grid">
              {upcomingEvents.map(renderCard)}
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

        {/* TÜM ETKİNLİKLER, ARAMA VE KATEGORİ FİLTRESİ */}
        {page === "events" && (
          <>
            <div className="filtre">
              <div className="filtre-alani">
                <label htmlFor="arama">Etkinlik ara</label>

                <input
                  id="arama"
                  type="search"
                  placeholder="Örn. atölye, kariyer..."
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                />
              </div>

              <div className="filtre-alani">
                <label htmlFor="kategori-filtre">Kategori</label>

                <select
                  id="kategori-filtre"
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value as Category | "")
                  }
                >
                  <option value="">Tümü</option>

                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p className="sonuc" aria-live="polite">
              {filteredEvents.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filteredEvents.length} etkinlik listeleniyor.`}
            </p>

            {filteredEvents.length > 0 ? (
              <section className="kart-izgarasi uclu-grid">
                {filteredEvents.map(renderCard)}
              </section>
            ) : (
              <p className="bulunamadi">
                Farklı bir kelime veya kategori deneyin.
              </p>
            )}
          </>
        )}

        {/* ETKİNLİK DETAYI */}
        {page === "detail" && (
          <>
            {!selected && (
              <div className="hata">
                <p>Böyle bir etkinlik bulunamadı.</p>

                <button type="button" onClick={() => go("events")}>
                  Listeye dön
                </button>
              </div>
            )}

            {selected && (
              <article className="detay-kapsayici">
                {selected.image && (
                  <figure className="afis-alani">
                    <img
                      className="afis"
                      src={selected.image}
                      alt={`${selected.title} afişi`}
                    />
                  </figure>
                )}

                <div className="bilgi-alani">
                  <h2>{selected.title}</h2>

                  <p>
                    <span className="kategori">{selected.category}</span>
                  </p>

                  <dl>
                    <dt>Tarih</dt>
                    <dd>{formatDate(selected.date)}</dd>

                    <dt>Saat</dt>
                    <dd>{selected.time}</dd>

                    <dt>Yer</dt>
                    <dd>{selected.location}</dd>

                    <dt>Kategori</dt>
                    <dd>{selected.category}</dd>

                    <dt>Kontenjan</dt>
                    <dd>{selected.capacity} kişi</dd>
                  </dl>

                  <h3>Açıklama</h3>
                  <p>{selected.description}</p>

                  <div className="buton-grubu">
                    <button
                      type="button"
                      onClick={() => go("update", selected.id)}
                    >
                      Bu etkinliği güncelle
                    </button>

                    <button
                      type="button"
                      className="ikincil"
                      onClick={() => go("events")}
                    >
                      Listeye dön
                    </button>
                  </div>
                </div>
              </article>
            )}
          </>
        )}

        {/* EKLEME VE GÜNCELLEME FORMLARI */}
        {(page === "add" || page === "update") && (
          <>
            <p>Etkinlik formu</p>

            <form
              key={page}
              className="form"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="form-row">
                <label htmlFor="title">Etkinlik adı</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  maxLength={80}
                  placeholder="Etkinlik adını girin"
                />
              </div>

              <div className="form-row">
                <label htmlFor="form-category">Kategori</label>

                <select
                  id="form-category"
                  name="category"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Seçiniz
                  </option>

                  {categoryOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <label htmlFor="date">Tarih</label>
                <input id="date" name="date" type="date" />
              </div>

              <div className="form-row">
                <label htmlFor="time">Saat</label>
                <input id="time" name="time" type="time" />
              </div>

              <div className="form-row">
                <label htmlFor="location">Yer</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Etkinlik yerini girin"
                />
              </div>

              <div className="form-row">
                <label htmlFor="capacity">Kontenjan</label>
                <input
                  id="capacity"
                  name="capacity"
                  type="number"
                  min={1}
                  max={1000}
                />
              </div>

              <div className="form-row">
                <label htmlFor="description">Açıklama</label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  placeholder="Etkinlik açıklaması"
                />
              </div>

              <button type="submit">
                {page === "add" ? "Kaydet" : "Güncelle"}
              </button>
            </form>
          </>
        )}
      </main>

      <footer>
        <small>Kampüs Etkinlikleri · Sprint 4</small>
      </footer>
    </div>
  );
}

export default App;