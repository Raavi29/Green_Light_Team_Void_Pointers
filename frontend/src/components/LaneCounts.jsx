import React from "react";

export default function LaneCounts({ lane_counts = {} }) {
  const lanes = Object.keys(lane_counts).sort();
  return (
    <div className="card">
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h3>Vehicle counts</h3>
        <div className="small">per lane</div>
      </div>
      <div style={{marginTop:8}}>
        {lanes.length === 0 && <div className="small">No data yet</div>}
        {lanes.map(l => (
          <div key={l} className="lane-item">
            <div>{l}</div>
            <div className="badge">{lane_counts[l]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}