export default function About() {
  return (
    <section className="container">
      <div className="card">
        <h1>About StreamList</h1>
        <p className="muted">
          StreamList is a lightweight, installable web app (PWA) for tracking
          movies and shows you want to watch. It works offline and stores data
          in your browser using LocalStorage—no account required.
        </p>

        <h2 style={{marginTop:".75rem"}}>What you can do</h2>
        <ul className="list" style={{marginTop:".5rem"}}>
          <li className="list-item">Add, edit, complete, and delete items on your StreamList.</li>
          <li className="list-item">Search movies via the TMDB API and add them to your list.</li>
          <li className="list-item">Install StreamList to your desktop or phone and use it offline.</li>
        </ul>

        <h2 style={{marginTop:"1rem"}}>How your data is handled</h2>
        <p className="muted">
          All items are stored locally on your device via <code>localStorage</code>.
          Nothing is uploaded to a server. You can clear your list at any time.
        </p>

        <h2 style={{marginTop:"1rem"}}>Tech</h2>
        <ul className="list">
          <li className="list-item">React + Vite</li>
          <li className="list-item">React Router</li>
          <li className="list-item">PWA (manifest + service worker)</li>
          <li className="list-item">TMDB API for search</li>
        </ul>

        <p className="muted" style={{marginTop:"1rem"}}>
          Movie data and images courtesy of The Movie Database (TMDB).
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
      </div>
    </section>
  );
}
