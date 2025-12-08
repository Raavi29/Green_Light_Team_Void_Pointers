// frontend/src/components/TwinControls.jsx
import React from "react";

export default function TwinControls({ autoPlay, setAutoPlay, speed, setSpeed }) {
  return (
    <div style={{display:"flex", gap:8, alignItems:"center"}}>
      <button onClick={() => setAutoPlay(a => !a)} style={{padding:"8px 10px", borderRadius:8}}>
        {autoPlay ? "Pause" : "Play"}
      </button>
      <label className="small muted">Speed</label>
      <input type="range" min={300} max={2000} value={speed} onChange={(e)=>setSpeed(Number(e.target.value))} />
    </div>
  );
}