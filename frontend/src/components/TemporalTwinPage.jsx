// frontend/src/components/TemporalTwinPage.jsx
import React, { useEffect, useState } from "react";
import TimelineSlider from "./TimelineSlider";
import TwinCharts from "./TwinCharts";
import Heatmap from "./Heatmap";
import TemporalIntersection from "./TemporalIntersection";
import TwinControls from "./TwinControls";
import { fetchHistory, fetchPrediction } from "../api";

/*
  TemporalTwinPage: loads history and prediction, exposes interactive timeline.
  - history: array of cycle entries from backend /history
  - selectedIndex: index into history (0 = most recent)
*/
export default function TemporalTwinPage() {
  const [history, setHistory] = useState([]); // array of {timestamp, optimize,...}
  const [predicted, setPredicted] = useState({});
  const [selected, setSelected] = useState(0); // index into history; 0 is latest
  const [autoPlay, setAutoPlay] = useState(false);
  const [speed, setSpeed] = useState(1000); // ms per step

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchHistory();
        const h = Array.isArray(res.history) ? res.history : res.history || [];
        setHistory(h);
      } catch (e) {
        setHistory([]);
      }
      try {
        const p = await fetchPrediction();
        setPredicted(p);
      } catch (e) {
        setPredicted({});
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(() => {
      setSelected(s => (s + 1) % Math.max(1, history.length || 1));
    }, Math.max(300, speed));
    return () => clearInterval(id);
  }, [autoPlay, speed, history.length]);

  const selectedEntry = history[selected] || null;
  const present = history[0] || null; // most recent
  const future = predicted || {};

  return (
    <div className="twin-card">
      <div className="twin-header" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <div>
          <h2>Temporal Twin</h2>
          <div className="small muted">Compare Past → Present → Predicted future</div>
        </div>
        <TwinControls
          autoPlay={autoPlay}
          setAutoPlay={setAutoPlay}
          speed={speed}
          setSpeed={setSpeed}
        />
      </div>

      <div style={{marginTop:12, marginBottom:10}}>
        <TimelineSlider
          length={history.length}
          selected={selected}
          onChange={setSelected}
        />
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
        <div style={{display:"flex", flexDirection:"column", gap:12}}>
          <div className="panel-title">Temporal Heatmap (lane counts over last cycles)</div>
          <Heatmap history={history} />
          <div style={{height:12}} />
          <div className="panel-title">Time-series (counts & green-times)</div>
          <TwinCharts history={history} selectedIndex={selected} predicted={future} />
        </div>

        <div style={{display:"flex", flexDirection:"column", gap:12}}>
          <div className="panel-title">Selected timestamp</div>
          <div className="json-block" style={{minHeight:120}}>
            <pre style={{margin:0}}>{JSON.stringify(selectedEntry || present || {}, null, 2)}</pre>
          </div>
          <div style={{height:12}} />
          <div className="panel-title">Intersection Simulation</div>
          <TemporalIntersection entry={selectedEntry || present || {}} prediction={future} />
        </div>
      </div>
    </div>
  );
}