import { useState } from "react";

export default function StreamList() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = item.trim();
    if (!trimmed) return;
    console.log("StreamList input:", trimmed); 
    setItems((prev) => [...prev, trimmed]);
    setItem("");
  }

  return (
  <section className="card">
    <h1>StreamList</h1>
    <p className="muted">Add movies or shows. Each submit logs to the console.</p>

      <form onSubmit={handleSubmit} className="row gap">
        <input
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Ex. The Hobbit"
          aria-label="stream item"
        />
        <button type="submit" className="btn">
          <span className="material-symbols-outlined">add</span>
          Add
        </button>
      </form>

{items.length > 0 && (
  <ul className="list ticket-list">
    {items.map((it, i) => (
      <li key={i} className="ticket">
        <span className="ticket-chip">{String(i + 1).padStart(2, "0")}</span>
        <span className="ticket-title">
          <span className="material-symbols-outlined">confirmation_number</span>
          {it}
        </span>
        <span className="perf-edge" aria-hidden="true"></span>
      </li>
    ))}
  </ul>
)}
    </section>
  );
}
