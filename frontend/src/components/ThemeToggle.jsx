// frontend/src/components/ThemeToggle.jsx
import React, { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => window.localStorage.getItem("theme") === "dark");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    window.localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button className="theme-toggle" onClick={() => setDark(d => !d)}>
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}