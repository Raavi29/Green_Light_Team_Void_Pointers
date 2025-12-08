// frontend/src/components/Heatmap.jsx
import React from "react";

/* Heatmap: draw rows = cycles, columns = lanes, color = count intensity */
export default function Heatmap({ history = [] }) {
  const rows = history || [];
  // collect lane keys in consistent order
  const laneSet = new Set();
  rows.forEach(r => {
    const c = r?.vision?.lane_counts || (r.optimize?.green_times || {});
    Object.keys(c).forEach(k => laneSet.add(k));
  });
  const lanes = Array.from(laneSet);

  // compute max for scale
  let maxVal = 1;
  rows.forEach(r => {
    const c = r?.vision?.lane_counts || (r.optimize?.green_times || {});
    Object.values(c).forEach(v => { if (typeof v === "number" && v > maxVal) maxVal = v; });
  });

  return (
    <div style={{ overflowX:"auto" }}>
      <div style={{ display:"grid", gridTemplateColumns:`120px repeat(${lanes.length}, 1fr)`, gap:6, alignItems:"center" }}>
        <div style={{fontWeight:700}}>Time</div>
        {lanes.map(l => <div key={l} style={{fontWeight:700, textAlign:"center"}}>{l}</div>)}
        {rows.map(r => {
          const time = new Date(r.timestamp || Date.now()).toLocaleTimeString();
          const counts = r?.vision?.lane_counts || (r.optimize?.green_times || {});
          return <>
            <div style={{padding:6, fontSize:12}}>{time}</div>
            {lanes.map(ln => {
              const v = Number(counts[ln] || 0);
              const intensity = Math.min(1, v / Math.max(1, maxVal));
              const bg = `linear-gradient(90deg, rgba(14,165,233,${intensity}), rgba(14,165,233,${intensity*0.2}))`;
              return <div key={ln} style={{height:28, borderRadius:6, margin:4, background:bg}} />;
            })}
          </>;
        })}
      </div>
    </div>
  );
}