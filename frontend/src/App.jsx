// frontend/src/App.jsx
import React, { useEffect, useState, useRef } from "react";
import "./styles.css";
import "./styles.pro.css";
import LaneCounts from "./components/LaneCounts";
import CongestionIndicator from "./components/CongestionIndicator";
import SignalPlan from "./components/SignalPlan";
import CycleLog from "./components/CycleLog";
import VideoPlaceholder from "./components/VideoPlaceholder";
import TemporalTwinPage from "./components/TemporalTwinPage";
import ThemeToggle from "./components/ThemeToggle";
import { fetchLiveData } from "./api";

/*
  Hybrid Super Dashboard:
  - Left column: original dashboard (kept exactly)
  - Right column: Temporal Twin (new)
*/
export default function App() {
  const [live, setLive] = useState({vision:{}, prediction:{}, plan:{}, cycle_log:[]});
  const [viewMode, setViewMode] = useState("split"); // split | original-only | twin-only
  const pollMs = 1500;
  const pollingRef = useRef();

  useEffect(() => {
    async function refresh() {
      try {
        const data = await fetchLiveData();
        setLive({
          vision: data.vision || {},
          prediction: data.prediction?.predicted_congestion || data.prediction || {},
          plan: data.plan || {},
          cycle_log: data.cycle_log || []
        });
      } catch (e) {
        // ignore errors
      }
    }
    refresh();
    pollingRef.current = setInterval(refresh, pollMs);
    return () => clearInterval(pollingRef.current);
  }, []);

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
            <button className={viewMode === "original-only" ? "seg-active" : ""} onClick={() => setViewMode("original-only")}>Original</button>
            <button className={viewMode === "split" ? "seg-active" : ""} onClick={() => setViewMode("split")}>Split</button>
            <button className={viewMode === "twin-only" ? "seg-active" : ""} onClick={() => setViewMode("twin-only")}>Temporal Twin</button>
          </div>
        </div>
      </header>

      <main style={{ display: "flex", gap: 16 }}>
        {(viewMode === "original-only" || viewMode === "split") && (
          <div style={{ flex: viewMode === "split" ? 0.55 : 1 }}>
            <VideoPlaceholder onUpload={async (b) => { /* reuse upload */ }} />
            <div style={{height:12}} />
            <LaneCounts lane_counts={live.vision?.lane_counts || {}} />
            <div style={{height:12}} />
            <CongestionIndicator prediction={live.prediction || {}} />
            <div style={{height:12}} />
            <SignalPlan plan={live.plan || {}} />
            <div style={{height:12}} />
            <CycleLog log={live.cycle_log || []} />
          </div>
        )}

        {(viewMode === "twin-only" || viewMode === "split") && (
          <div style={{ flex: viewMode === "split" ? 0.45 : 1 }}>
            <TemporalTwinPage />
          </div>
        )}
      </main>
    </div>
  );
}