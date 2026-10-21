import type { Category } from "../../types/campus-event";

interface EventFormProps {
  onSubmit: () => void;
}

const categoryOptions: Category[] = [
  "Seminer",
  "Atölye",
  "Söyleşi",
  "Yarışma",
];

function EventForm({ onSubmit }: EventFormProps) {
  return (
    <>
      <p>Bu sprintte form yalnızca gösterilir; kayıt yapılmaz.</p>

      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
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

        <button type="submit">Kaydet</button>
      </form>
    </>
  );
}

export default EventForm;