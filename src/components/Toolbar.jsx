import React from 'react';

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

export default Toolbar;