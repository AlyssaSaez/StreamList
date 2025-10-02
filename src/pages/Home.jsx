import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <section className="container">
      <div className="card" style={{ textAlign: "center", padding: "2rem" }}>
        <h1>StreamList</h1>
        <p className="muted" style={{ maxWidth: 640, margin: "0 auto" }}>
          Create your personal streaming watch list, browse movies, and shop subscriptions
          and accessories. Install the app and use it offline.
        </p>

        <div style={{ display: "flex", gap: ".6rem", justifyContent: "center", marginTop: "1rem", flexWrap: "wrap" }}>
          <NavLink className="btn" to="/watchlist">
            <span className="material-symbols-outlined" aria-hidden>playlist_add</span>
            Open Watch List
          </NavLink>
          <NavLink className="btn" to="/movies">
            <span className="material-symbols-outlined" aria-hidden>movie</span>
            Browse Movies
          </NavLink>
          <NavLink className="btn" to="/subscriptions">
            <span className="material-symbols-outlined" aria-hidden>subscriptions</span>
            Subscriptions
          </NavLink>
          <NavLink className="btn" to="/accessories">
            <span className="material-symbols-outlined" aria-hidden>headphones</span>
            Accessories
          </NavLink>
        </div>
      </div>
    </section>
  );
}
