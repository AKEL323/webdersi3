import type { PageName } from "../../types/page";
import Navigation from "./Navigation";

interface HeaderProps {
  currentPage: PageName;
  onNavigate: (page: PageName) => void;
}

function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <header>
      <h1>KARİYER GÜNLERİ 2026</h1>

      <Navigation
        currentPage={currentPage}
        onNavigate={onNavigate}
      />
    </header>
  );
}

export default Header;