import React from "react";

export default function CongestionIndicator({ prediction = {} }) {
  // prediction could be { "laneA": "low", "laneB": "high", ... } or numbers
  const lanes = Object.keys(prediction);
  return (
    <div className="card">
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h3>Congestion</h3>
        <div className="small">predicted</div>
      </div>
      <div style={{marginTop:8}}>
        {lanes.length === 0 && <div className="small">No prediction</div>}
        {lanes.map(l => {
          const val = prediction[l];
          const color = val === "high" ? "#ff6b6b" : val === "medium" ? "#f59e0b" : "#10b981";
          return (
            <div key={l} className="lane-item" style={{alignItems:"center"}}>
              <div>{l}</div>
              <div style={{display:"flex", alignItems:"center", gap:8}}>
                <div style={{width:10,height:10, borderRadius:6, background:color}} />
                <div style={{minWidth:60}}>{String(val)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}