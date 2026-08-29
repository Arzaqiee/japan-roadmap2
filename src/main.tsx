import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./app/App";
import "./index.css";

// HashRouter, not BrowserRouter: Capacitor serves the app from a local
// file/scheme origin with no server-side rewrite, so path-based routing
// (BrowserRouter) 404s on refresh/deep link inside the WebView.
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
