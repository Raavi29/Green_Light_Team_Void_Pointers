// frontend/src/App.jsx
import React, { useEffect, useState } from "react";
import LaneCounts from "./LaneCounts";
import CongestionIndicator from "./CongestionIndicator";
import SignalPlan from "./SignalPlan";
import CycleLog from "./CycleLog";
import VideoPlaceholder from "./VideoPlaceholder";
import TemporalTwinPremium from "./TemporalTwinPremium";
import ThemeToggle from "./ThemeToggle";
import { fetchLiveData, fetchHistory, fetchPrediction } from "../api";

/* Minimal changes: keep original dashboard logic intact.
   Add new UI controls to toggle split/preview/full Twin.
*/

export default function App() {
  const [live, setLive] = useState({ vision: {}, prediction: {}, plan: {}, cycle_log: [] });
  const [pollMs] = useState(1500);
  const [view, setView] = useState("original"); // original | split | twin
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState({});

  useEffect(() => {
    async function startPolling() {
      try {
        const data = await fetchLiveData();
        setLive({
          vision: data.vision || {},
          prediction: data.prediction?.predicted_congestion || data.prediction || {},
          plan: data.plan || {},
          cycle_log: data.cycle_log || []
        });
      } catch (e) {
        // ignore
      }
    }
    startPolling();
    const id = setInterval(startPolling, pollMs);
    return () => clearInterval(id);
  }, [pollMs]);

  async function loadTwinData() {
    const h = await fetchHistory().catch(() => []);
    const p = await fetchPrediction().catch(() => ({}));
    setHistory(h);
    setFuture(p);
  }

  // layout: keep original dashboard UI exactly as before; add split/twin modes
  return (
    <div className="container-pro">
      <header className="topbar">
        <div className="brand">
          <h1>Reflex AI Traffic</h1>
          <div className="small muted">Live overview · counts · optimized signals</div>
        </div>

        <div className="controls">
          <ThemeToggle />
          <div className="segmented">
            <button className={view === "original" ? "seg-active" : ""} onClick={() => setView("original")}>Original</button>
            <button className={view === "split" ? "seg-active" : ""} onClick={() => { setView("split"); loadTwinData(); }}>Split View</button>
            <button className={view === "twin" ? "seg-active" : ""} onClick={async () => { setView("twin"); await loadTwinData(); }}>Twin Full</button>
          </div>
        </div>
      </header>

      {view === "original" && (
        <>
          <div className="grid-pro">
            <div className="col-left">
              <VideoPlaceholder onUpload={async (b) => { /* reuse existing upload flow */ }} />
              <div style={{height:12}} />
              <LaneCounts lane_counts={live.vision?.lane_counts || {}} />
              <div style={{height:12}} />
              <CongestionIndicator prediction={live.prediction || {}} />
            </div>

            <div className="col-right">
              <SignalPlan plan={live.plan || {}} />
              <div style={{height:16}} />
              <CycleLog log={live.cycle_log || []} />
            </div>
          </div>
        </>
      )}

      {view === "split" && (
        <div className="split-view">
          <div className="split-left">
            {/* ORIGINAL DASHBOARD LEFT (unchanged internals) */}
            <VideoPlaceholder onUpload={async (b) => {}} />
            <div style={{height:12}} />
            <LaneCounts lane_counts={live.vision?.lane_counts || {}} />
            <div style={{height:12}} />
            <CongestionIndicator prediction={live.prediction || {}} />
            <div style={{height:12}} />
            <SignalPlan plan={live.plan || {}} />
            <div style={{height:12}} />
            <CycleLog log={live.cycle_log || []} />
          </div>

          <div className="split-right">
            <TemporalTwinPremium past={history?.[0] || {}} present={live} future={future} />
          </div>
        </div>
      )}

      {view === "twin" && (
        <div style={{ padding: 12 }}>
          <TemporalTwinPremium past={history?.[0] || {}} present={live} future={future} full />
        </div>
      )}
    </div>
  );
}