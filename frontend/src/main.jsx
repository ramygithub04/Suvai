import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Ensure this file exists

console.log("✅ React is running...");
console.log("✅ Root element:", document.getElementById("root"));

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("❌ Root element not found. Check index.html!");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
