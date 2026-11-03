
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent | undefined;
  onBack: () => void;
  onEdit: (id: string) => void;
  onDelete: () => void;
}

function EventDetail({
  event,
  onBack,
  onEdit,
  onDelete,
}: EventDetailProps) {
  if (!event) {
    return (
      <div className="hata">
        <p>Böyle bir etkinlik bulunamadı.</p>
        <button type="button" onClick={onBack}>
          Listeye dön
        </button>
      </div>
    );
  }

  return (
    <article className="detay-kapsayici">
      {event.image && (
        <figure className="afis-alani">
          <img
            className="afis"
            src={event.image}
            alt={`${event.title} afişi`}
          />
        </figure>
      )}

      <div className="bilgi-alani">
        <h2>{event.title}</h2>

        <p>
          <span className="kategori">{event.category}</span>
        </p>

        <dl>
          <dt>Tarih</dt>
          <dd>{formatDate(event.date)}</dd>

          <dt>Saat</dt>
          <dd>{event.time}</dd>

          <dt>Yer</dt>
          <dd>{event.location}</dd>

          <dt>Kategori</dt>
          <dd>{event.category}</dd>

          <dt>Kontenjan</dt>
          <dd>{event.capacity} kişi</dd>
        </dl>

        <h3>Açıklama</h3>
        <p>{event.description}</p>

        <div className="buton-grubu">
          <button
            type="button"
            onClick={() => onEdit(event.id)}
          >
            Bu etkinliği güncelle
          </button>

          <button
            type="button"
            className="ikincil"
            onClick={onDelete}
          >
            Etkinliği sil
          </button>

          <button
            type="button"
            className="ikincil"
            onClick={onBack}
          >
            Listeye dön
          </button>
        </div>
      </div>
    </article>
  );
}

export default EventDetail;
