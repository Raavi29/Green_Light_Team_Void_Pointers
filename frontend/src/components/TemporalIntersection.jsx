// frontend/src/components/TemporalIntersection.jsx
import React, { useEffect, useState } from "react";

/* Simple intersection sim that uses entry (past/present) counts and prediction plan */
export default function TemporalIntersection({ entry = {}, prediction = {} }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => (t+1)%1000), 600);
    return () => clearInterval(id);
  }, []);

  const counts = entry?.vision?.lane_counts || entry?.lane_counts || {};
  const plan = prediction?.green_times || entry?.optimize?.green_times || {};

  const lanes = Object.keys(counts).length ? Object.keys(counts) : ["N","E","S","W"];

  return (
    <div style={{display:"grid", placeItems:"center"}}>
      <div style={{width:300, height:300, background:"linear-gradient(#f5f7fb,#fff)", borderRadius:12, position:"relative", padding:12}}>
        {lanes.map((l, i) => {
          const cars = Math.min(10, Math.max(0, Math.round((counts[l] || 0)/2)));
          const green = (plan[l] && plan[l] > 0) ? (tick % 6 < 3) : (i%2===0 ? (tick%6<3) : (tick%6>=3));
          return (
            <div key={l} style={{
              position:"absolute",
              top: (150 + (i === 2 ? 60 : (i === 0 ? -60 : 0))),
              left: (150 + (i === 1 ? 60 : (i === 3 ? -60 : 0))),
              transform: `translate(-50%,-50%) rotate(${i*90}deg)`,
              width:130, height:40, display:"flex", alignItems:"center", justifyContent:"space-between", gap:8
            }}>
              <div style={{fontSize:12, color:"#333"}}>{l}</div>
              <div style={{display:"flex", gap:6}}>
                {Array.from({length:cars}).map((_, idx) => <div key={idx} style={{
                  width:14, height:8, background: green ? "#10b981" : "#ef4444", borderRadius:3, opacity:0.9
                }} />)}
              </div>
              <div style={{fontSize:14}}>{green ? "●" : "○"}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}