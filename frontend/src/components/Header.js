import React from "react";
import logo from "../images/logo.svg";
import { LoggedInContext } from "../contexts/LoggedInContext";
import { Link, useLocation  } from "react-router-dom";

export default function Header({currentEmail, signOut}) {
  const loggedIn = React.useContext(LoggedInContext);
  const location = useLocation();
  const linkText = location.pathname === "/sign-up" ? "Войти" : "Регистрация";
  const newLocation = location.pathname === "/sign-up" ? "/sign-in" : "/sign-up";
  return (
    <header className="header">
      <a href="/">
        <img src={logo} alt="логотип" className="header__logo link-hover" />
      </a>
      <nav className="menu">
        {loggedIn ? (
          <>
            <Link to="/" className="menu__link">
              {currentEmail}
            </Link>
            <Link to="/sign-in" className="menu__link" onClick={signOut}>
              Выйти
            </Link>
          </>
        ) : (
          <Link to={newLocation} className="menu__link">
            {linkText}
          </Link>
        )}
      </nav>
    </header>
  );
}
