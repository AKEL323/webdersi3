
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import EventAddPage from "./pages/EventAddPage";
import EventUpdatePage from "./pages/EventUpdatePage";

import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  AboutPage,
  ContactPage,
  NotFoundPage,
} from "./pages/OtherPages";

function App() {
  useEffect(() => {
    document.title = "Kampüs etkinlikleri-Kariyer Günleri 2026";
  }, []);

  return (
    <div className="container">
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/etkinlikler" element={<EventsPage />} />

          <Route
            path="/etkinlik/:id"
            element={<EventDetailPage />}
          />

          <Route
            path="/etkinlik-ekle"
            element={<EventAddPage />}
          />

          <Route
            path="/etkinlik-guncelle/:id"
            element={<EventUpdatePage />}
          />

          <Route path="/giris" element={<LoginPage />} />

          <Route path="/kayit" element={<RegisterPage />} />

          <Route
            path="/sifremi-unuttum"
            element={<ForgotPasswordPage />}
          />

          <Route path="/hakkimizda" element={<AboutPage />} />

          <Route path="/iletisim" element={<ContactPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
