import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./Layout";

import QrCodeGenerator from "./QrCodeGenerator";


createRoot(document.getElementById("root")).render(
  <div>
    <QrCodeGenerator />
  </div>,
);
