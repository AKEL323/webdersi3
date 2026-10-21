import type { PageName } from "../../types/page";

interface NavigationProps {
  currentPage: PageName;
  onNavigate: (page: PageName) => void;
}

const menuItems: { label: string; page: PageName }[] = [
  { label: "Ana Sayfa", page: "home" },
  { label: "Etkinlikler", page: "events" },
  { label: "Ekle", page: "add" },
];

function Navigation({
  currentPage,
  onNavigate,
}: NavigationProps) {
  return (
    <nav className="menu" aria-label="Ana menü">
      {menuItems.map((item) => (
        <a
          key={item.page}
          href={`#${item.page}`}
          aria-current={
            currentPage === item.page ? "page" : undefined
          }
          onClick={(event) => {
            event.preventDefault();
            onNavigate(item.page);
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export default Navigation;