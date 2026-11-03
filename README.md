
# Kariyer Günleri 2026 – Kampüs Etkinlikleri

## Proje Hakkında

Kampüs Etkinlikleri, öğrencilerin üniversitede düzenlenen etkinlikleri görüntüleyebilmeleri, arayabilmeleri ve kategorilere göre filtreleyebilmeleri için geliştirilmiş bir web uygulamasıdır.

## Kullanılan Teknolojiler

- React
- TypeScript
- Vite
- React Router DOM
- Context API
- HTML
- CSS

## Özellikler

- Ana sayfa ve etkinlik listesi
- Etkinlik detaylarını görüntüleme
- Etkinlik ekleme
- Etkinlik güncelleme
- Etkinlik silme ve silme onayı
- Etkinlik arama
- Kategoriye göre filtreleme
- Giriş ve kayıt formları
- Şifremi unuttum formu
- Hakkımızda ve iletişim sayfaları
- Mobil uyumlu tasarım

## Proje Yapısı

```text
frontend/
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── pages/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── App.css
│   └── main.tsx
├── package.json
└── vite.config.ts
```

## Kurulum

Projeyi bilgisayarınıza indirin:

```bash
git clone https://github.com/AKEL323/webdersi3.git
```

Frontend klasörüne geçin:

```bash
cd webdersi3/frontend
```

Bağımlılıkları yükleyin:

```bash
npm install
```

Uygulamayı başlatın:

```bash
npm run dev
```

## Production Build

```bash
npm run build
```

## Sayfa Yönlendirmeleri

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

## Veri ve Kimlik Doğrulama Hakkında

Etkinlik verileri Context API üzerinden uygulama belleğinde yönetilmektedir. Kalıcı bir veritabanı bağlantısı bulunmamaktadır.

Giriş, kayıt ve şifre sıfırlama formları istemci tarafında doğrulama yapmaktadır. Gerçek kullanıcı kimlik doğrulaması ve e-posta gönderimi için backend bağlantısı gereklidir.

## Canlı Proje

Vercel: https://furkanakel-frontend.vercel.app

## GitHub

https://github.com/AKEL323/webdersi3
