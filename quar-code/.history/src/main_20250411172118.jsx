import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import QrCodeGenerator from "./QrCodeGenerator";


createRoot(document.getElementById("root")).render(
  <div>
    <QrCodeGenerator />
  </div>,
);
