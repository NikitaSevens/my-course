import { Document, Packer, Paragraph, TextRun } from "docx";
import fs from "fs";
import path from "path";

export async function generateDocx(data, outputPath) {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun("Регистрация на курс"),
              new TextRun("\n"),
              new TextRun(`ФИО родителя: ${data.parentFio}`),
              new TextRun("\n"),
              new TextRun(`Email: ${data.parentEmail}`),
              new TextRun("\n"),
              new TextRun(`Телефон: ${data.parentPhone}`),
              new TextRun("\n"),
              new TextRun(`Паспорт: ${data.parentPassport}`),
              new TextRun("\n"),
              new TextRun(`Дата выдачи: ${data.dateCertificate}`),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
}
