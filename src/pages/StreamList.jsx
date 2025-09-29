import { useEffect, useMemo, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export default function StreamList() {
  const [item, setItem] = useState("");

  const [items, setItems] = useLocalStorage("streamlist-items", []);

  const remaining = useMemo(
    () => items.filter((i) => !i.completed).length,
    [items]
  );

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = item.trim();
    if (!trimmed) return;
    const newItem = {
      id: uid(),
      text: trimmed,
      completed: false,
      editing: false,
    };
    console.log("StreamList input:", trimmed);
    setItems((prev) => [newItem, ...prev]);
    setItem(""); // clear input
  }

  function toggleComplete(id) {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, completed: !it.completed } : it
      )
    );
  }

  function startEdit(id) {
    setItems((prev) => prev.map((it) => ({ ...it, editing: it.id === id })));
  }

  function cancelEdit() {
    setItems((prev) => prev.map((it) => ({ ...it, editing: false })));
  }

  function saveEdit(id, newText) {
    const t = newText.trim();
    if (!t) return cancelEdit();
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, text: t, editing: false } : it
      )
    );
  }

  function remove(id) {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  return (
    <section className="card">
      <h1>StreamList</h1>
      <p className="muted">
        Add a movie or show. You can mark it complete, edit, or delete.
      </p>

      {/* Add form */}
      <form onSubmit={handleSubmit} className="row gap">
        <input
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Ex. Spirited Away"
          aria-label="stream item"
        />
        <button type="submit" className="btn">
          <span className="material-symbols-outlined" aria-hidden>
            add
          </span>
          Add
        </button>
      </form>

      {/* Toolbar */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: ".75rem" }}>
        <span className="muted">
          {remaining === 0 ? "Nice! All caught up!" : `${remaining} remaining`}
        </span>
        <button
          type="button"
          className="btn"
          onClick={() => setItems((prev) => prev.filter((i) => !i.completed))}
          title="Clear completed"
        >
          <span className="material-symbols-outlined" aria-hidden>
            delete_sweep
          </span>
          Clear Completed
        </button>
      </div>

      {/* List */}
      <ul className="list" style={{ marginTop: "1rem" }}>
        {items.length === 0 && (
          <li className="list-item muted">No items yet. Add your first pick.</li>
        )}

        {items.map((it) => (
          <li key={it.id} className="list-item" style={{ alignItems: "stretch" }}>
            {/* Complete toggle */}
            <button
              type="button"
              className="icon-btn"
              title={it.completed ? "Mark as not completed" : "Mark as completed"}
              onClick={() => toggleComplete(it.id)}
              aria-pressed={it.completed}
            >
              <span className="material-symbols-outlined" aria-hidden>
                {it.completed ? "check_circle" : "radio_button_unchecked"}
              </span>
            </button>

            {/* Text or edit field */}
            <div style={{ display: "flex", flex: 1, alignItems: "center", gap: ".5rem" }}>
              {it.editing ? (
                <EditInline
                  initial={it.text}
                  onCancel={cancelEdit}
                  onSave={(val) => saveEdit(it.id, val)}
                />
              ) : (
                <span
                  style={{
                    textDecoration: it.completed ? "line-through" : "none",
                    opacity: it.completed ? 0.65 : 1,
                  }}
                >
                  {it.text}
                </span>
              )}
            </div>

            {/* Action buttons */}
            {!it.editing ? (
              <div style={{ display: "flex", gap: ".35rem" }}>
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => startEdit(it.id)}
                  title="Edit"
                >
                  <span className="material-symbols-outlined" aria-hidden>
                    edit
                  </span>
                </button>
                <button
                  type="button"
                  className="icon-btn danger"
                  onClick={() => remove(it.id)}
                  title="Delete"
                >
                  <span className="material-symbols-outlined" aria-hidden>
                    delete
                  </span>
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", gap: ".35rem" }}>
                <button type="button" className="icon-btn" onClick={cancelEdit} title="Cancel">
                  <span className="material-symbols-outlined" aria-hidden>
                    close
                  </span>
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function EditInline({ initial, onCancel, onSave }) {
  const [val, setVal] = useState(initial);

  useEffect(() => {
    setVal(initial);
  }, [initial]);

  function handleKey(e) {
    if (e.key === "Escape") onCancel();
    if (e.key === "Enter") onSave(val);
  }

  return (
    <div style={{ display: "flex", gap: ".5rem", width: "100%" }}>
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={handleKey}
        aria-label="Edit item"
        autoFocus
      />
      <button type="button" className="btn" onClick={() => onSave(val)}>
        <span className="material-symbols-outlined" aria-hidden>
          save
        </span>
        Save
      </button>
    </div>
  );
}
