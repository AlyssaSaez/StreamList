import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const linkClass = ({ isActive }) =>
  "nav-link" + (isActive ? " nav-link-active" : "");

export default function NavBar() {
  const [open, setOpen] = useState(false);

  // Close the menu when route changes (ESC or click outside not needed for Week 1)
  useEffect(() => {
    const closeOnResize = () => setOpen(false);
    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  return (
    <header className="nav">
      <div className="brand">
        <span className="material-symbols-outlined" aria-hidden>theaters</span>
        <span>StreamList</span>
      </div>

      <button
        className="mobile-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(v => !v)}
      >
        <span className="material-symbols-outlined" aria-hidden>
          {open ? "close" : "menu"}
        </span>
      </button>

      <nav className={open ? "nav-links open" : "nav-links"}>
        <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>
          <span className="material-symbols-outlined" aria-hidden>home</span>
          Home
        </NavLink>
        <NavLink to="/movies" className={linkClass} onClick={() => setOpen(false)}>
          <span className="material-symbols-outlined" aria-hidden>movie</span>
          Movies
        </NavLink>
        <NavLink to="/cart" className={linkClass} onClick={() => setOpen(false)}>
          <span className="material-symbols-outlined" aria-hidden>shopping_cart</span>
          Cart
        </NavLink>
        <NavLink to="/about" className={linkClass} onClick={() => setOpen(false)}>
          <span className="material-symbols-outlined" aria-hidden>info</span>
          About
        </NavLink>
      </nav>
    </header>
  );
}
