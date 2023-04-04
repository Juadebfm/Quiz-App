import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/materialize-css/dist/css/materialize.min.css";
// import "../node_modules/materialize-css/dist/js/materialize.min.js";
import "./styles/style.scss";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
