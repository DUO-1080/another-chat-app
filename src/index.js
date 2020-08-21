import React from "react";
import { render } from "react-dom";

import App from "./App";

import reducer, { initialState } from "./context/reducer";
import { StateProvider } from "./context/StateContext";

render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>,
  document.getElementById("root")
);
