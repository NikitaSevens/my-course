// index.js
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Для получения __dirname (в ESM его нет)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-doc", async (req, res) => {
  try {
    const data = req.body;

    const filePath = path.join(__dirname, "output", "temp.docx");
    fs.writeFileSync(filePath, "Заглушка файла .docx");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mycoursesask@gmail.com",
        pass: "myCourseSASK64",
      },
    });

    await transporter.sendMail({
      from: "mycoursesask@gmail.com",
      to: "recipient@example.com",
      subject: "Документ с сайта",
      text: "Документ во вложении",
      attachments: [{ path: filePath }],
    });

    fs.unlinkSync(filePath);

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка на сервере" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
