import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import useCartCount from "../hooks/useCartCount"; // 👈 new

const linkClass = ({ isActive }) =>
  "nav-link" + (isActive ? " nav-link-active" : "");

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const count = useCartCount(); // 👈 new

  // Close the menu when window resizes
  useEffect(() => {
    const closeOnResize = () => setOpen(false);
    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  return (
    <header className="nav">
      <div className="brand">
        <span className="material-symbols-outlined" aria-hidden>
          theaters
        </span>
        <span>StreamList</span>
      </div>

      <button
        className="mobile-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="material-symbols-outlined" aria-hidden>
          {open ? "close" : "menu"}
        </span>
      </button>

      <nav className={open ? "nav-links open" : "nav-links"}>
        <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>
          <span className="material-symbols-outlined" aria-hidden>
            home
          </span>
          Home
        </NavLink>
        <NavLink
          to="/watchlist"
          className={linkClass}
          onClick={() => setOpen(false)}
        >
          <span className="material-symbols-outlined" aria-hidden>
            playlist_add
          </span>
          Watch List
        </NavLink>
        <NavLink
          to="/movies"
          className={linkClass}
          onClick={() => setOpen(false)}
        >
          <span className="material-symbols-outlined" aria-hidden>
            movie
          </span>
          Movies
        </NavLink>
        <NavLink
          to="/subscriptions"
          className={linkClass}
          onClick={() => setOpen(false)}
        >
          <span className="material-symbols-outlined" aria-hidden>
            subscriptions
          </span>
          Subscriptions
        </NavLink>
        <NavLink
          to="/accessories"
          className={linkClass}
          onClick={() => setOpen(false)}
        >
          <span className="material-symbols-outlined" aria-hidden>
            headphones
          </span>
          Accessories
        </NavLink>
        <NavLink
          to="/cart"
          className={linkClass}
          onClick={() => setOpen(false)}
        >
          <span className="material-symbols-outlined" aria-hidden>
            shopping_cart
          </span>
          {`Cart${count > 0 ? ` (${count})` : ""}`} {/* 👈 new */}
        </NavLink>
        <NavLink
          to="/about"
          className={linkClass}
          onClick={() => setOpen(false)}
        >
          <span className="material-symbols-outlined" aria-hidden>
            info
          </span>
          About
        </NavLink>
      </nav>
    </header>
  );
}
