// frontend/src/api.js
const BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export async function fetchLiveData() {
  const res = await fetch(`${BASE}/live_data`);
  return res.json();
}

export async function fetchHistory() {
  const res = await fetch(`${BASE}/history`);
  return res.json();
}

export async function fetchPrediction() {
  const res = await fetch(`${BASE}/predict`);
  return res.json();
}

// existing uploadFrame etc. remain
export async function uploadFrame(base64) {
  const res = await fetch(`${BASE}/upload_frame`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({frame: base64})
  });
  return res.json();
}