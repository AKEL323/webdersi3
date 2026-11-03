
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <small>
        Kampüs Etkinlikleri · Sprint 5
        {" | "}
        <Link to="/hakkimizda">Hakkımızda</Link>
        {" | "}
        <Link to="/iletisim">İletişim</Link>
      </small>
    </footer>
  );
}

export default Footer;
