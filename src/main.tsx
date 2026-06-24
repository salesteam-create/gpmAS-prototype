import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { RoleProvider } from "./context/role";
import { StoreProvider } from "./context/store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <RoleProvider>
        <StoreProvider>
          <App />
        </StoreProvider>
      </RoleProvider>
    </HashRouter>
  </React.StrictMode>
);
