
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

export function LoginPage() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(
      "Form doğrulandı. Gerçek giriş için sunucu tarafı kimlik doğrulaması gerekir."
    );
  }

  return (
    <>
      <h2>Giriş Yap</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="login-email">E-posta</label>
          <input id="login-email" name="email" type="email" required />
        </div>

        <div className="form-row">
          <label htmlFor="login-password">Şifre</label>
          <input
            id="login-password"
            name="password"
            type="password"
            minLength={8}
            required
          />
        </div>

        <button type="submit">Giriş Yap</button>
      </form>

      <p><Link to="/kayit">Hesap oluştur</Link></p>
      <p><Link to="/sifremi-unuttum">Şifremi unuttum</Link></p>

      {message && <p role="status">{message}</p>}
    </>
  );
}

export function RegisterPage() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const password = form.get("password");
    const confirmation = form.get("confirmation");

    if (password !== confirmation) {
      setMessage("Şifreler birbiriyle eşleşmiyor.");
      return;
    }

    setMessage(
      "Form doğrulandı. Gerçek hesap oluşturmak için sunucu bağlantısı gerekir."
    );
  }

  return (
    <>
      <h2>Kayıt Ol</h2>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="register-name">Ad Soyad</label>
          <input id="register-name" name="name" required />
        </div>

        <div className="form-row">
          <label htmlFor="register-email">E-posta</label>
          <input
            id="register-email"
            name="email"
            type="email"
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="register-password">Şifre</label>
          <input
            id="register-password"
            name="password"
            type="password"
            minLength={8}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="register-confirmation">Şifre Tekrar</label>
          <input
            id="register-confirmation"
            name="confirmation"
            type="password"
            minLength={8}
            required
          />
        </div>

        <button type="submit">Kayıt Ol</button>
      </form>

      {message && <p role="status">{message}</p>}
    </>
  );
}

export function ForgotPasswordPage() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(
      "E-posta alanı doğrulandı. Gerçek şifre sıfırlama için sunucu ve e-posta hizmeti gerekir."
    );
  }

  return (
    <>
      <h2>Şifremi Unuttum</h2>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="forgot-email">E-posta</label>
          <input
            id="forgot-email"
            name="email"
            type="email"
            required
          />
        </div>

        <button type="submit">Gönder</button>
      </form>

      {message && <p role="status">{message}</p>}
      <p><Link to="/giris">Giriş sayfasına dön</Link></p>
    </>
  );
}

export function AboutPage() {
  return (
    <>
      <h2>Hakkımızda</h2>
      <p>
        Kampüs Etkinlikleri, öğrencilerin kampüste düzenlenen
        etkinlikleri takip edebilmeleri için hazırlanmış bir projedir.
      </p>
    </>
  );
}

export function ContactPage() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(
      "Form alanları doğrulandı. Mesajın gönderilmesi için sunucu bağlantısı gerekir."
    );
  }

  return (
    <>
      <h2>İletişim</h2>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="contact-name">Ad Soyad</label>
          <input id="contact-name" name="name" required />
        </div>

        <div className="form-row">
          <label htmlFor="contact-email">E-posta</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="contact-message">Mesaj</label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
          />
        </div>

        <button type="submit">Mesajı gönder</button>
      </form>

      {message && <p role="status">{message}</p>}
    </>
  );
}

export function NotFoundPage() {
  return (
    <div className="hata">
      <h2>404 - Sayfa Bulunamadı</h2>
      <p>Aradığınız sayfa mevcut değil.</p>
      <Link to="/">Ana sayfaya dön</Link>
    </div>
  );
}
