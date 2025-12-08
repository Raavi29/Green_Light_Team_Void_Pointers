// frontend/src/components/IntersectionSim.jsx
import React, { useEffect, useState } from "react";

/* Lightweight CSS-driven intersection simulation.
   counts: {laneA: n, laneB: n, ...}
   plan: {laneA: seconds, laneB: seconds, ...}
*/
export default function IntersectionSim({ counts = {}, plan = {} }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => (t + 1) % 1000), 600);
    return () => clearInterval(id);
  }, []);

  const lanes = Object.keys(counts).length ? Object.keys(counts) : ["N", "E", "S", "W"];

  return (
    <div className="sim-outer">
      <div className="intersection">
        {lanes.map((l, i) => {
          const cars = Math.min(8, Math.max(0, Math.floor((counts[l] || 0) / 2)));
          const green = (Object.keys(plan).length && plan[l] && plan[l] > 5) ? true : (tick % 8 < 4);
          return (
            <div key={l} className={`lane lane-${i} ${green ? "green" : "red"}`}>
              <div className="lane-label">{l}</div>
              <div className="cars">
                {Array.from({ length: cars }).map((_, ci) => (
                  <div key={ci} className="car" style={{ left: `${(ci * 8) % 80}%`, transform: `translateY(${(ci * 6) % 12}px)` }} />
                ))}
              </div>
              <div className="signal">{green ? "●" : "○"}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}