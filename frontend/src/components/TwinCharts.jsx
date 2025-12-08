// frontend/src/components/TwinCharts.jsx
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

/*
  TwinCharts props:
   - history: array of entries { timestamp, optimize: { green_times: {...} }, ... }
   - selectedIndex: selected index into history
   - predicted: predicted object (predicted_congestion / green_times)
*/
export default function TwinCharts({ history = [], selectedIndex = 0, predicted = {} }) {
  const series = (history || []).map(h => {
    const counts = h?.vision?.lane_counts || (h.optimize?.green_times ? h.optimize.green_times : {});
    return {
      name: new Date(h.timestamp || Date.now()).toLocaleTimeString(),
      ...counts
    };
  });

  const lanes = new Set();
  series.forEach(s => Object.keys(s).forEach(k => k !== "name" && lanes.add(k)));
  const laneKeys = Array.from(lanes);

  return (
    <div style={{height:200}}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={series}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {laneKeys.map((k,i)=>(
            <Line key={k} dataKey={k} stroke={["#0ea5e9","#f97316","#ef4444","#10b981","#8b5cf6"][i%5]} dot={false} strokeWidth={2}/>
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}