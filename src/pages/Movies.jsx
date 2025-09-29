import { useEffect, useMemo, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;
const IMG = (path, size = "w342") => path ? `https://image.tmdb.org/t/p/${size}${path}` : "";

export default function Movies() {
  const [query, setQuery] = useLocalStorage("tmdb-query", "spirited away");
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState(null);
  const [page, setPage] = useLocalStorage("tmdb-page", 1);
  const [totalPages, setTotalPages] = useState(1);

  const canSearch = useMemo(() => query.trim().length >= 2, [query]);

  useEffect(() => {
    if (!canSearch) { setResults([]); return; }
    let cancelled = false;
    async function run() {
      setStatus("loading"); setError(null);
      try {
        const url = new URL("https://api.themoviedb.org/3/search/movie");
        url.searchParams.set("api_key", TMDB_KEY);
        url.searchParams.set("query", query.trim());
        url.searchParams.set("include_adult", "false");
        url.searchParams.set("language", "en-US");
        url.searchParams.set("page", String(page));

        const res = await fetch(url);
        if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
        const data = await res.json();
        if (cancelled) return;

        setResults(data.results ?? []);
        setTotalPages(data.total_pages ?? 1);
        setStatus("success");
      } catch (e) {
        if (cancelled) return;
        setError(e.message);
        setStatus("error");
      }
    }
    run();
    return () => { cancelled = true; };
  }, [query, page]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSearch) return;
    setPage(1);
  }

  return (
    <section className="card">
      <h1>Movie Search</h1>
      <p className="muted">Search TMDB and browse results. Type at least 2 characters.</p>

      <form onSubmit={handleSubmit} className="row gap" style={{ marginBottom: ".75rem" }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies (e.g., Totoro)"
          aria-label="Search movies"
        />
        <button type="submit" className="btn">
          <span className="material-symbols-outlined" aria-hidden>search</span>
          Search
        </button>
      </form>

      <Toolbar status={status} error={error} page={page} totalPages={totalPages}
               onPrev={() => setPage(p => Math.max(1, p - 1))}
               onNext={() => setPage(p => Math.min(totalPages, p + 1))} />

      <div className="grid cards">
        {results.map(m => (
          <article key={m.id} className="movie-card">
            <div className="poster-wrap">
              {IMG(m.poster_path) ? (
                <img src={IMG(m.poster_path)} alt={m.title} loading="lazy" />
              ) : (
                <div className="poster-fallback">No Image</div>
              )}
            </div>
            <div className="movie-body">
              <h3 title={m.title}>{m.title}</h3>
              <p className="muted small">
                {m.release_date ? new Date(m.release_date).getFullYear() : "—"}
                {" · "}
                ⭐ {m.vote_average?.toFixed(1) ?? "—"}
              </p>
              {m.overview && <p className="overview">{m.overview}</p>}
              <div className="card-actions">
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    const raw = localStorage.getItem("streamlist-items");
                    const current = raw ? JSON.parse(raw) : [];
                    const exists = current.some(x => x.tmdb_id === m.id);
                    if (!exists) {
                      current.unshift({
                        id: Math.random().toString(36).slice(2, 9),
                        text: m.title,
                        completed: false,
                        editing: false,
                        tmdb_id: m.id
                      });
                      localStorage.setItem("streamlist-items", JSON.stringify(current));
                      alert(`Added “${m.title}” to StreamList`);
                    } else {
                      alert("Already in your StreamList");
                    }
                  }}
                >
                  <span className="material-symbols-outlined" aria-hidden>playlist_add</span>
                  Add to StreamList
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Toolbar({ status, error, page, totalPages, onPrev, onNext }) {
  return (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:".75rem"}}>
      <span className="muted">
        {status === "idle" && "Enter a query to search TMDB"}
        {status === "loading" && "Loading…"}
        {status === "error" && `Error: ${error}`}
        {status === "success" && `Page ${page} of ${totalPages}`}
      </span>
      <div style={{display:"flex",gap:".5rem"}}>
        <button type="button" className="icon-btn" onClick={onPrev} title="Previous page" disabled={page<=1}>
          <span className="material-symbols-outlined" aria-hidden>chevron_left</span>
        </button>
        <button type="button" className="icon-btn" onClick={onNext} title="Next page" disabled={page>=totalPages}>
          <span className="material-symbols-outlined" aria-hidden>chevron_right</span>
        </button>
      </div>
    </div>
  );
}
