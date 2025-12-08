// frontend/src/components/SignalPlan.jsx
import React from "react";

/**
 * Simple presentational component for optimized green times.
 * Keep minimal — matches the import used in App.jsx
 */
export default function SignalPlan({ plan = {} }) {
  const items = plan.green_times ? Object.entries(plan.green_times) : Object.entries(plan);
  return (
    <div className="card">
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h3>Signal plan</h3>
        <div className="small">optimized green times (s)</div>
      </div>
      <div style={{marginTop:8}}>
        {items.length===0 && <div className="small">No plan yet</div>}
        {items.map(([lane, seconds]) => (
          <div key={lane} className="lane-item">
            <div>{lane}</div>
            <div style={{fontWeight:700}}>{Number(seconds).toFixed(1)} s</div>
          </div>
        ))}
      </div>
    </div>
  );
}
