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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  },
});
const upload = multer({ storage });

const coursesFile = path.join(__dirname, "data", "courses.json");

app.post("/courses", upload.fields([
  { name: "imageFile", maxCount: 1 },
  { name: "programFile", maxCount: 1 }
]), (req, res) => {
  try {
    const data = req.body;
    const files = req.files;

    const newCourse = {
      id: uuidv4(),
      ...data,
      image: data.image || (files?.imageFile?.[0]?.path || ""),
      programFile: files?.programFile?.[0]?.path || "",
    };

    let courses = [];
    if (fs.existsSync(coursesFile)) {
      courses = JSON.parse(fs.readFileSync(coursesFile));
    }

    courses.push(newCourse);
    fs.writeFileSync(coursesFile, JSON.stringify(courses, null, 2));

    res.status(201).json({ message: "Курс создан", course: newCourse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка при создании курса" });
  }
});

app.get("/courses", (req, res) => {
  try {
    const courses = JSON.parse(fs.readFileSync(coursesFile));
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Ошибка при загрузке курсов" });
  }
});


app.get("/courses/:id", (req, res) => {
  const { id } = req.params;
  try {
    const courses = JSON.parse(fs.readFileSync(coursesFile));
    const course = courses.find(c => c.id === id);
    if (!course) return res.status(404).json({ error: "Курс не найден" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: "Ошибка при получении курса" });
  }
});



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

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
