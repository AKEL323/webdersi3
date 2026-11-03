
import { useNavigate } from "react-router-dom";

import {
  useEvents,
  type EventInput,
} from "../context/EventContext";

import EventForm from "../components/forms/EventForm";

function EventAddPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  function handleSubmit(data: EventInput) {
    const newEvent = addEvent(data);
    navigate(`/etkinlik/${newEvent.id}`);
  }

  return (
    <>
      <h2>Etkinlik Ekle</h2>
      <EventForm
        onSubmit={handleSubmit}
        submitLabel="Etkinliği kaydet"
      />
    </>
  );
}

export default EventAddPage;
