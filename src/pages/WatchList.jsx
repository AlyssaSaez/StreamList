import StreamList from "./StreamList.jsx";

export default function WatchList() {
  return (
    <section className="container">
      <div className="card">
        <h1>Watch List</h1>
        <p className="muted">Track movies and shows you plan to watch.</p>
        <StreamList />
      </div>
    </section>
  );
}
