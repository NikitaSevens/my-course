import fs from "fs";
import path from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generateDocxFromTemplate(data, outputPath) {
  const templatePath = path.join(__dirname, "../templates/template.docx");

  // Чтение шаблона
  const content = fs.readFileSync(templatePath, "binary");

  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    delimiters: {
      start: '{{', // начало тега
      end: '}}',   // конец тега
    }
  });

  // Подставляем данные
  doc.setData(data);

  try {
    doc.render(); // обработка шаблона
  } catch (error) {
    console.error("Ошибка генерации DOCX:", error);
    throw error;
  }

  const buffer = doc.getZip().generate({ type: "nodebuffer" });
  fs.writeFileSync(outputPath, buffer);
}
