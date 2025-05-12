import fs from "fs";
import path from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Функция для валидации данных относительно шаблона
function validateDataAgainstTemplate(data, template) {
  // Находим все теги в шаблоне, которые начинаются с {{ и заканчиваются на }}
  const templateTags = template.match(/{{(.*?)}}/g);
  if (templateTags) {
    const dataKeys = Object.keys(data);

    templateTags.forEach((tag) => {
      const tagName = tag.replace(/[{}]/g, "").trim(); // Извлекаем имя тега без фигурных скобок
      if (!dataKeys.includes(tagName)) {
        console.warn(`В данных нет значения для тега: ${tagName}`);
      }
    });
  }
}

export function generateDocxFromTemplate(data, outputPath) {
  const templatePath = path.join(__dirname, "../templates/template.docx");

  // Чтение шаблона
  const content = fs.readFileSync(templatePath, "binary");

  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  // Проверка данных перед использованием
  validateDataAgainstTemplate(data, content);

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
