
import { NavLink } from "react-router-dom";

const menuItems: {
  label: string;
  to: string;
  end?: boolean;
}[] = [
  { label: "Ana Sayfa", to: "/", end: true },
  { label: "Etkinlikler", to: "/etkinlikler" },
  { label: "Ekle", to: "/etkinlik-ekle" },
  { label: "Hakkımızda", to: "/hakkimizda" },
  { label: "İletişim", to: "/iletisim" },
  { label: "Giriş", to: "/giris" },
  { label: "Kayıt", to: "/kayit" },
];

function Navigation() {
  return (
    <nav className="menu" aria-label="Ana menü">
      {menuItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navigation;
