import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesajAlani = document.querySelector("#form-mesaj");


/*
 * GÜNCELLEME MODU
 */
if (form && form.dataset.mode === "guncelle") {

    const id = new URLSearchParams(
        window.location.search
    ).get("id");

    const etkinlik = events.find(
        event => event.id === id
    );


    /*
     * ETKİNLİK BULUNDU
     */
    if (etkinlik) {

        form.elements.ad.value =
            etkinlik.title;

        form.elements.kategori.value =
            etkinlik.category;

        form.elements.tarih.value =
            etkinlik.date;

        form.elements.saat.value =
            etkinlik.time;

        form.elements.yer.value =
            etkinlik.location;

        form.elements.aciklama.value =
            etkinlik.description;

        form.elements.kontenjan.value =
            etkinlik.capacity;
    }


    /*
     * ETKİNLİK BULUNAMADI
     */
    else {

        form.outerHTML = `
            <div class="hata-kutusu">
                Güncellenecek etkinlik seçilmedi
                veya geçersiz ID!
            </div>

            <br>

            <a href="etkinlikler.html">
                Etkinliklere Git
            </a>
        `;
    }
}


/*
 * FORM GÖNDERME
 */
if (form) {

    form.addEventListener("submit", (e) => {

        e.preventDefault();


        /*
         * Önce eski hataları temizle
         */
        const tumInputs =
            form.querySelectorAll(
                "input, select, textarea"
            );

        tumInputs.forEach(input => {
            input.removeAttribute("aria-invalid");
        });


        const hataKutulari =
            form.querySelectorAll(".hata-mesaji");

        hataKutulari.forEach(kutu => {
            kutu.textContent = "";
        });


        /*
         * Form verilerini al
         */
        const fd = new FormData(form);


        const data = {

            title: fd.get("ad").trim(),

            category: fd.get("kategori"),

            date: fd.get("tarih"),

            time: fd.get("saat"),

            location: fd.get("yer").trim(),

            description: fd.get("aciklama").trim(),

            capacity: Number(
                fd.get("kontenjan")
            )
        };


        /*
         * HATALAR
         */
        const errors = {};


        if (data.title.length < 3) {

            errors.ad =
                "En az 3 karakter giriniz.";
        }


        if (!data.category) {

            errors.kategori =
                "Lütfen bir kategori seçiniz.";
        }


        if (!data.date) {

            errors.tarih =
                "Lütfen geçerli bir tarih seçiniz.";
        }


        if (!data.time) {

            errors.saat =
                "Lütfen saati belirtiniz.";
        }


        if (data.location.length < 3) {

            errors.yer =
                "Yer bilgisi en az 3 karakter olmalıdır.";
        }


        if (data.description.length < 10) {

            errors.aciklama =
                "Açıklama en az 10 karakter olmalıdır.";
        }


        if (
            !data.capacity ||
            data.capacity < 1 ||
            data.capacity > 1000
        ) {

            errors.kontenjan =
                "Kontenjan 1-1000 arası olmalıdır.";
        }


        /*
         * HATA VARSA
         */
        if (Object.keys(errors).length > 0) {

            for (const key in errors) {

                const alan =
                    form.elements[key];

                if (alan) {

                    alan.setAttribute(
                        "aria-invalid",
                        "true"
                    );
                }


                const hata =
                    document.querySelector(
                        `#hata-${key}`
                    );

                if (hata) {

                    hata.textContent =
                        errors[key];
                }
            }

            return;
        }


        /*
         * BAŞARILI
         */
        mesajAlani.innerHTML = `

            <div class="basari-kutusu">

                <h3>
                    ${
                        form.dataset.mode === "guncelle"
                            ? "Güncelleme Başarılı"
                            : "Gönderim Başarılı"
                    }
                </h3>

                <pre>${JSON.stringify(
                    data,
                    null,
                    2
                )}</pre>

            </div>
        `;
    });
}