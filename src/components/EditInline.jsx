import { useEffect, useState } from "react";

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

export default EditInline;
