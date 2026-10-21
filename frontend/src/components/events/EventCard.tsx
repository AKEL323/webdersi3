import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    <article className="kart">
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
        onClick={() => onShowDetail(event.id)}
      >
        Detayları gör
      </button>
    </article>
  );
}

export default EventCard;