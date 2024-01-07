import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import "normalize.css";
import { NotificationProvider } from "./contexts/NotificationContext.tsx";
import { UsedKeysProvider } from "./contexts/UsedKeysContext.tsx";
import { CorrectWordProvider } from "./contexts/CorrectWordContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CorrectWordProvider>
      <NotificationProvider>
        <UsedKeysProvider>
          <App />
        </UsedKeysProvider>
      </NotificationProvider>
    </CorrectWordProvider>
  </React.StrictMode>
);
