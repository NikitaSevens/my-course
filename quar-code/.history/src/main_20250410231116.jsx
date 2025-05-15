import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./Layout";
import Layout from "./Layout";


createRoot(document.getElementById("root")).render(
  <div>
    Test
    <Layout />
  </div>,
);
