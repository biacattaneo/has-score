import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppWrapper from "./App";
import "./App.scss";

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  </React.StrictMode>
);
