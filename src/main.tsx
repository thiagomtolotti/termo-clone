import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import "normalize.css";
import { NotificationProvider } from "./contexts/NotificationContext.tsx";
import { UsedKeysProvider } from "./contexts/UsedKeysContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NotificationProvider>
      <UsedKeysProvider>
        <App />
      </UsedKeysProvider>
    </NotificationProvider>
  </React.StrictMode>
);
