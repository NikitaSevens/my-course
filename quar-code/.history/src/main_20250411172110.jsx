import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./Layout";
import Layout from "./Layout";
import QrCodeGenerator from "./QrCodeGenerator";


createRoot(document.getElementById("root")).render(
  <div>
    Test

    <QrCodeGenerator />
  </div>,
);
