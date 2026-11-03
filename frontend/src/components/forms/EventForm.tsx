
import { useState, type FormEvent } from "react";

import type { Category, CampusEvent } from "../../types/campus-event";
import type { EventInput } from "../../context/EventContext";

interface EventFormProps {
  onSubmit: (data: EventInput) => void;
  initialEvent?: CampusEvent;
  submitLabel?: string;
}

const categoryOptions: Category[] = [
  "Seminer",
  "Atölye",
  "Söyleşi",
  "Yarışma",
];

function EventForm({
  onSubmit,
  initialEvent,
  submitLabel = "Kaydet",
}: EventFormProps) {
  const [title, setTitle] = useState(initialEvent?.title ?? "");
  const [category, setCategory] = useState<Category | "">(
    initialEvent?.category ?? ""
  );
  const [date, setDate] = useState(initialEvent?.date ?? "");
  const [time, setTime] = useState(initialEvent?.time ?? "");
  const [location, setLocation] = useState(
    initialEvent?.location ?? ""
  );
  const [capacity, setCapacity] = useState(
    String(initialEvent?.capacity ?? 100)
  );
  const [description, setDescription] = useState(
    initialEvent?.description ?? ""
  );
  const [image, setImage] = useState(initialEvent?.image ?? "");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!category) {
      return;
    }

    const eventData: EventInput = {
      title: title.trim(),
      category,
      date,
      time,
      location: location.trim(),
      capacity: Number(capacity),
      description: description.trim(),
      image: image.trim() || undefined,
    };

    onSubmit(eventData);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="title">Etkinlik adı</label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={80}
          required
          placeholder="Etkinlik adını girin"
        />
      </div>

      <div className="form-row">
        <label htmlFor="form-category">Kategori</label>
        <select
          id="form-category"
          name="category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value as Category | "")
          }
          required
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
        <input
          id="date"
          name="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="time">Saat</label>
        <input
          id="time"
          name="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="location">Yer</label>
        <input
          id="location"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          placeholder="Etkinlik yerini girin"
        />
      </div>

      <div className="form-row">
        <label htmlFor="capacity">Kontenjan</label>
        <input
          id="capacity"
          name="capacity"
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          min={1}
          max={1000}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="description">Açıklama</label>
        <textarea
          id="description"
          name="description"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="Etkinlik açıklaması"
        />
      </div>

      <div className="form-row">
        <label htmlFor="image">Afiş yolu (isteğe bağlı)</label>
        <input
          id="image"
          name="image"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Örn. /afis.svg"
        />
      </div>

      <button type="submit">{submitLabel}</button>
    </form>
  );
}

export default EventForm;
