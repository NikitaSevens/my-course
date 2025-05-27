import fs from "fs";
import path from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generateDocxFromTemplate(data, outputPath) {
  const templatePath = path.join(__dirname, "../templates/child-under-14.docx");

  const content = fs.readFileSync(templatePath, "binary");
  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    delimiters: {
      start: "{{",
      end: "}}",
    },
  });

  try {
    doc.render(data); // ⬅️ передаем данные прямо сюда
  } catch (error) {
    console.error("Ошибка генерации DOCX:", error);
    throw error;
  }

  const buffer = doc.getZip().generate({ type: "nodebuffer" });

  // Создаем папку output, если ее нет
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputPath, buffer);
}
