import { Link, useNavigate, useParams } from "react-router-dom";

import { useEvents } from "../context/EventContext";
import { findEventById } from "../utils/filter-events";
import EventDetail from "../components/events/EventDetail";

function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { events, deleteEvent } = useEvents();

  const selectedEvent = id
    ? findEventById(events, id)
    : undefined;

  if (!selectedEvent) {
    return (
      <div className="hata">
        <p>Böyle bir etkinlik bulunamadı.</p>

        <Link to="/etkinlikler">
          Etkinlik listesine dön
        </Link>
      </div>
    );
  }

  // Etkinlik bilgilerini sabit değişkenlere alıyoruz.
  const eventId = selectedEvent.id;
  const eventTitle = selectedEvent.title;

  function handleDelete() {
    const confirmed = window.confirm(
      `"${eventTitle}" etkinliğini silmek istediğinize emin misiniz?`
    );

    if (confirmed) {
      deleteEvent(eventId);
      navigate("/etkinlikler");
    }
  }

  return (
    <EventDetail
      event={selectedEvent}
      onBack={() => navigate("/etkinlikler")}
      onEdit={(eventId) =>
        navigate(`/etkinlik-guncelle/${eventId}`)
      }
      onDelete={handleDelete}
    />
  );
}

export default EventDetailPage;