import type {
  Category,
  CampusEvent,
} from "../types/campus-event";

// Etkinlik başlığında veya açıklamasında arama yapar.
export function searchEvents(
  list: CampusEvent[],
  text: string
): CampusEvent[] {
  const q = text.trim().toLocaleLowerCase("tr-TR");

  return list.filter((event) => {
    const title = event.title.toLocaleLowerCase("tr-TR");
    const description = event.description.toLocaleLowerCase("tr-TR");

    return title.includes(q) || description.includes(q);
  });
}

// Kategori boşsa bütün etkinlikleri döndürür.
export function filterByCategory(
  list: CampusEvent[],
  category: Category | ""
): CampusEvent[] {
  if (category === "") {
    return list;
  }

  return list.filter((event) => event.category === category);
}

// Verilen ID'ye sahip etkinliği bulur.
// Bulunamazsa undefined döndürür.
export function findEventById(
  list: CampusEvent[],
  id: string
): CampusEvent | undefined {
  return list.find((event) => event.id === id);
}