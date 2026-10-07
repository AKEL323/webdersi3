import { events } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");
const arama = document.querySelector("#arama");
const kategoriFiltre = document.querySelector("#kategori-filtre");
const sonucSatiri = document.querySelector("#sonuc");

function createCard(event) {
    const dateObj = new Date(event.date);

    const formattedDate = dateObj.toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    return `
        <article class="kart">
            <span class="kategori">${event.category}</span>

            <h2>${event.title}</h2>

            <p>
                <strong>Tarih:</strong>
                ${formattedDate}
            </p>

            <p>
                <strong>Saat:</strong>
                ${event.time}
            </p>

            <p>
                <strong>Yer:</strong>
                ${event.location}
            </p>

            <a href="etkinlik-detay.html?id=${event.id}">
                Detayları Gör
            </a>
        </article>
    `;
}

function render(dizi) {

    if (dizi.length === 0) {

        list.innerHTML = `
            <p class="bulunamadi">
                Aramanıza uygun etkinlik bulunamadı.
            </p>
        `;

    } else {

        list.innerHTML = dizi.map(createCard).join("");
    }

    if (sonucSatiri) {
        sonucSatiri.textContent =
            `${dizi.length} etkinlik listeleniyor.`;
    }
}


if (list) {

    /*
     * ANA SAYFA
     * data-limit varsa sadece yaklaşan etkinlikleri göster
     */
    if (list.dataset.limit) {

        const yaklasanlar = [...events]
            .sort((a, b) => a.date.localeCompare(b.date))
            .slice(0, Number(list.dataset.limit));

        render(yaklasanlar);

    }

    /*
     * ETKİNLİKLER SAYFASI
     */
    else {

        render(events);

        /*
         * Kategorileri data.js içinden otomatik oluştur
         */
        if (kategoriFiltre) {

            const kategoriler = [
                ...new Set(events.map(event => event.category))
            ];

            kategoriler.forEach(kategori => {

                const option = document.createElement("option");

                option.value = kategori;
                option.textContent = kategori;

                kategoriFiltre.appendChild(option);
            });
        }


        /*
         * ARAMA + KATEGORİ FİLTRESİ
         */
        function filtrele() {

            const aranan = arama.value
                .toLocaleLowerCase("tr-TR")
                .trim();

            const secilenKategori = kategoriFiltre.value;

            const sonuc = events.filter(event => {

                const metinUyuyor =
                    event.title
                        .toLocaleLowerCase("tr-TR")
                        .includes(aranan);

                const kategoriUyuyor =
                    secilenKategori === "" ||
                    event.category === secilenKategori;

                return metinUyuyor && kategoriUyuyor;
            });

            render(sonuc);
        }


        /*
         * Yazarken ara
         */
        if (arama) {
            arama.addEventListener("input", filtrele);
        }


        /*
         * Kategori değişince filtrele
         */
        if (kategoriFiltre) {
            kategoriFiltre.addEventListener("change", filtrele);
        }
    }
}