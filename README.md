

\# Kariyer Günleri 2026 – Kampüs Etkinlikleri



\## Proje Hakkında

Üniversite öğrencilerinin kampüs etkinliklerini görüntüleyebildiği, arayabildiği, filtreleyebildiği ve yönetebildiği web uygulaması.



\## Kullanılan Teknolojiler

\- React

\- TypeScript

\- Vite

\- React Router DOM

\- Context API

\- CSS



\## Özellikler

\- Etkinlikleri listeleme ve detaylarını görüntüleme

\- Etkinlik ekleme, güncelleme ve silme

\- Silme işlemi öncesinde onay

\- Etkinlik arama ve kategori filtreleme

\- Giriş, kayıt ve şifre sıfırlama formları

\- Hakkımızda ve iletişim sayfaları

\- Mobil uyumlu tasarım

\- 10 adet React Router rotası



\## Sayfa Yönlendirmeleri



| Sayfa | URL |

|---|---|

| Ana Sayfa | `/` |

| Etkinlikler | `/etkinlikler` |

| Etkinlik Detay | `/etkinlik/:id` |

| Etkinlik Ekle | `/etkinlik-ekle` |

| Etkinlik Güncelle | `/etkinlik-guncelle/:id` |

| Giriş | `/giris` |

| Kayıt | `/kayit` |

| Şifremi Unuttum | `/sifremi-unuttum` |

| Hakkımızda | `/hakkimizda` |

| İletişim | `/iletisim` |



\## Kurulum



```bash

git clone https://github.com/AKEL323/webdersi3.git

cd webdersi3/frontend

npm install

npm run dev

```



\## Production Build



```bash

npm run build

```



\## Veri Yönetimi

Etkinlik verileri Context API ile uygulama belleğinde yönetilir. Kalıcı veritabanı bağlantısı bulunmamaktadır.



Giriş, kayıt ve şifre sıfırlama formları istemci tarafında doğrulama yapar. Gerçek kullanıcı doğrulaması için backend bağlantısı gereklidir.



\## Canlı Proje



https://furkanakel-frontend.vercel.app



\## GitHub



https://github.com/AKEL323/webdersi3



