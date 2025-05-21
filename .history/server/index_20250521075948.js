// index.js
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { generateDocxFromTemplate } from "./utils/generateDocxFromTemplate.js";
import { fileURLToPath } from "url";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

// Для получения __dirname (в ESM его нет)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// === 1. ИНИЦИАЛИЗАЦИЯ EXPRESS ===
const app = express();
app.use(cors());
app.use(express.json());

// === 2. УБЕДИМСЯ, ЧТО ПАПКИ СУЩЕСТВУЮТ ===
const uploadsDir = path.join(__dirname, "uploads");
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

// === 3. НАСТРОЙКА MULTER ДЛЯ ФАЙЛОВ ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  },
});
const upload = multer({ storage });

// === 4. ПУТЬ ДО ФАЙЛА С КУРСАМИ ===
const coursesFile = path.join(dataDir, "courses.json");

// === 5. СОЗДАНИЕ КУРСА ===
app.post(
  "/courses",
  upload.fields([
    { name: "imageFile", maxCount: 1 },
    { name: "programFile", maxCount: 1 },
  ]),
  (req, res) => {
    try {
      const data = req.body;
      const files = req.files;

      const newCourse = {
        id: uuidv4(),
        ...data,
        image:
          data.image ||
          (files?.imageFile?.[0]?.filename
            ? `/uploads/${files.imageFile[0].filename}`
            : ""),
        programFile: files?.programFile?.[0]?.filename
          ? `/uploads/${files.programFile[0].filename}`
          : "",
      };

      let courses = [];
      if (fs.existsSync(coursesFile)) {
        try {
          courses = JSON.parse(fs.readFileSync(coursesFile, "utf-8"));
        } catch (e) {
          console.error("Ошибка чтения JSON:", e);
          courses = [];
        }
      }

      courses.push(newCourse);
      fs.writeFileSync(coursesFile, JSON.stringify(courses, null, 2));

      res.status(201).json({ message: "Курс создан", course: newCourse });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Ошибка при создании курса" });
    }
  }
);

// === 6. ПОЛУЧИТЬ ВСЕ КУРСЫ ===
app.get("/courses", (req, res) => {
  try {
    if (!fs.existsSync(coursesFile)) return res.json([]);
    const courses = JSON.parse(fs.readFileSync(coursesFile, "utf-8"));
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Ошибка при загрузке курсов" });
  }
});

// === 7. ПОЛУЧИТЬ ОТДЕЛЬНЫЙ КУРС ===
app.get("/courses/:id", (req, res) => {
  const { id } = req.params;
  try {
    const courses = JSON.parse(fs.readFileSync(coursesFile, "utf-8"));
    const course = courses.find((c) => c.id === id);
    if (!course) return res.status(404).json({ error: "Курс не найден" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: "Ошибка при получении курса" });
  }
});

// === 8. СТАТИЧЕСКИЕ ФАЙЛЫ (изображения и т.д.) ===
app.use("/uploads", express.static(uploadsDir));

// === 9. ФУНКЦИЯ ОТПРАВКИ ДОКУМЕНТА ===
app.post("/send-doc", async (req, res) => {
  try {
    const data = req.body;
    const filePath = path.join(__dirname, "output", "temp.docx");

    generateDocxFromTemplate(data, filePath);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "loknoi729@gmail.com",
        pass: "rrem llps evip ybmy",
      },
    });

    await transporter.sendMail({
      from: "loknoi729@gmail.com",
      to: "mycoursesask@gmail.com",
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

// === 10. СТАРТ СЕРВЕРА ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
