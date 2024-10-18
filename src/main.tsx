import ReactDOM from "react-dom/client";
import "./index.css";
import AppWrapper from "./App";
import "./App.scss";
import { RecoilRoot } from "recoil";

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <RecoilRoot>
      <AppWrapper />
    </RecoilRoot>
  </BrowserRouter>
);
