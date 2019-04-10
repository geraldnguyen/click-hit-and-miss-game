import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { Board } from "./Board";

function App() {
  return <Board dimension={3} />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
