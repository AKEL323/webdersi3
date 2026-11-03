
import { Link } from "react-router-dom";
import { useEvents } from "../context/EventContext";
import EventList from "../components/events/EventList";

function HomePage() {
  const { events } = useEvents();

  const upcomingEvents = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  return (
    <>
      <p>Fakültedeki etkinlikleri tek yerden takip edin.</p>
      <strong>Yaklaşan 2 etkinlik</strong>

      <section className="kart-izgarasi ikili-grid">
        <EventList events={upcomingEvents} />
      </section>

      <p>
        <Link to="/etkinlikler">Tüm etkinlikleri gör →</Link>
      </p>
    </>
  );
}

export default HomePage;
