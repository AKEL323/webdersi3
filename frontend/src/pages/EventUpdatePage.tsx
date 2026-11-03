import { Link, useNavigate, useParams } from "react-router-dom";

import {
  useEvents,
  type EventInput,
} from "../context/EventContext";

import { findEventById } from "../utils/filter-events";
import EventForm from "../components/forms/EventForm";

function EventUpdatePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { events, updateEvent } = useEvents();

  const event = id ? findEventById(events, id) : undefined;

  if (!event) {
    return (
      <div className="hata">
        <p>Güncellenecek etkinlik bulunamadı.</p>
        <Link to="/etkinlikler">
          Etkinlik listesine dön
        </Link>
      </div>
    );
  }

  const eventId = event.id;

  function handleSubmit(data: EventInput) {
    updateEvent(eventId, data);
    navigate(`/etkinlik/${eventId}`);
  }

  return (
    <>
      <h2>Etkinlik Güncelle</h2>

      <EventForm
        key={eventId}
        initialEvent={event}
        onSubmit={handleSubmit}
        submitLabel="Değişiklikleri kaydet"
      />
    </>
  );
}

export default EventUpdatePage;