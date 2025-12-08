// frontend/src/components/TimelineSlider.jsx
import React from "react";

export default function TimelineSlider({ length = 0, selected = 0, onChange }) {
  // length = number of historical entries; we map slider 0..length-1
  const max = Math.max(0, length - 1);
  const value = Math.min(max, selected || 0);

  return (
    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
      <div className="small muted">Old</div>
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        style={{flex:1}}
      />
      <div className="small muted">Now</div>
    </div>
  );
}