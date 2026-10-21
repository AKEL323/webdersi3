import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  category: Category | "";
  categories: Category[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: Category | "") => void;
}

function EventFilter({
  searchText,
  category,
  categories,
  onSearchChange,
  onCategoryChange,
}: EventFilterProps) {
  return (
    <div className="filtre">
      <div className="filtre-alani">
        <label htmlFor="arama">Etkinlik ara</label>

        <input
          id="arama"
          type="search"
          placeholder="Örn. atölye, kariyer..."
          value={searchText}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
        />
      </div>

      <div className="filtre-alani">
        <label htmlFor="kategori-filtre">Kategori</label>

        <select
          id="kategori-filtre"
          value={category}
          onChange={(event) =>
            onCategoryChange(
              event.target.value as Category | ""
            )
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
  );
}

export default EventFilter;