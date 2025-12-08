import React from "react";

export default function CycleLog({ log = [] }) {
  return (
    <div className="card">
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h3>Last cycles</h3>
        <div className="small">recent</div>
      </div>
      <div style={{marginTop:8, maxHeight:240, overflowY:"auto"}}>
        {log.length===0 && <div className="small">No cycles yet</div>}
        {log.map((c, i) => (
          <div key={i} className="log-item">
            <div style={{display:"flex", justifyContent:"space-between"}}>
              <div className="small">{new Date(c.timestamp).toLocaleString()}</div>
            </div>
            <div style={{marginTop:6, fontSize:13}}>
              <strong>Plan:</strong> {c.optimize?.green_times ? JSON.stringify(c.optimize.green_times) : JSON.stringify(c.optimize)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}