import { Link, NavLink } from "react-router";
import "./header.css";
import LogoutButton from "../../pages/auth/logout-button";

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <picture>
          <source media="(min-width: 768px)" srcSet="/icons/ZOCO-recto.svg" />
          <source srcSet="/icons/ZOCO-cuadrado.svg" />
          <img
            className="logo"
            src="/icons/ZOCO-cuadrado.svg"
            alt="ZOCO-logo"
          />
        </picture>
      </Link>
      <nav className="nav">
        <ul className="nav-btns">
          <li>
            <NavLink className="nav-btn" to="/adverts/new">
              CREATE AD
            </NavLink>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
