import { events } from "./data.js";

const container = document.querySelector("#detay-container");
const id = new URLSearchParams(window.location.search).get("id");

const event = events.find(e => e.id === id);

if (!event) {
  container.innerHTML = `
    <div class="hata">Böyle bir etkinlik bulunamadı.</div>
    <a href="etkinlikler.html">Tüm Etkinliklere Dön</a>
  `;
} else {
  document.title = event.title;
  const dateObj = new Date(event.date);
  const formattedDate = dateObj.toLocaleDateString("tr-TR", { day: 'numeric', month: 'long', year: 'numeric' });

  container.innerHTML = `
    <article class="detay-kart">
      <h1>${event.title}</h1>
      <span>${event.category}</span>
      <ul>
        <li><strong>Tarih:</strong> ${formattedDate}</li>
        <li><strong>Saat:</strong> ${event.time}</li>
        <li><strong>Yer:</strong> ${event.location}</li>
        <li><strong>Kontenjan:</strong> ${event.capacity} Kişi</li>
      </ul>
      <p>${event.description}</p>
      <br>
      <a href="etkinlik-guncelle.html?id=${event.id}">Bu Etkinliği Güncelle</a>
    </article>
  `;
}