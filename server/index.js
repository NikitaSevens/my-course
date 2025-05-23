import dotenv from "dotenv";
import path from "path";
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";

import multer from "multer";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { generateDocxFromTemplate } from "./utils/generateDocxFromTemplate.js";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

if (!process.env.S3_BUCKET) {
  throw new Error("S3_BUCKET is not defined");
}

const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
const coursesFile = path.join(dataDir, "courses.json");

// === S3 client ===
const s3 = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
});

// === Multer memory storage ===
const upload = multer({ storage: multer.memoryStorage() });

// === Upload to S3 ===
const uploadToS3 = async (file, filename) => {
  const uploader = new Upload({
    client: s3,
    params: {
      Bucket: process.env.S3_BUCKET,
      Key: filename,
      Body: file.buffer,
      ACL: "public-read",
      ContentType: file.mimetype,
    },
  });

  await uploader.done();
  return `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET}/${filename}`;
};

// === POST /courses ===
app.post(
  "/courses",
  upload.fields([
    { name: "imageFile", maxCount: 1 },
    { name: "programFile", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const data = req.body;
      const files = req.files;

      let imageUrl = "";
      let programUrl = "";

      if (files?.imageFile?.[0]) {
        const filename = `${uuidv4()}${path.extname(
          files.imageFile[0].originalname
        )}`;
        imageUrl = await uploadToS3(files.imageFile[0], filename);
      } else if (data.image) {
        // Используем переданную ссылку, если файл не был загружен
        imageUrl = data.image;
      }

      if (files?.programFile?.[0]) {
        const filename = `${uuidv4()}${path.extname(
          files.programFile[0].originalname
        )}`;
        programUrl = await uploadToS3(files.programFile[0], filename);
      }

      const newCourse = {
        id: uuidv4(),
        ...data,
        image: imageUrl,
        programFile: programUrl,
      };

      let courses = [];
      if (fs.existsSync(coursesFile)) {
        courses = JSON.parse(fs.readFileSync(coursesFile, "utf-8"));
      }

      courses.push(newCourse);
      fs.writeFileSync(coursesFile, JSON.stringify(courses, null, 2));

      res.status(201).json({ message: "Курс создан", course: newCourse });
    } catch (err) {
      console.error("Ошибка при создании курса:", err);
      res.status(500).json({ error: "Ошибка при создании курса" });
    }
  }
);

// === GET /courses ===
app.get("/courses", (req, res) => {
  try {
    if (!fs.existsSync(coursesFile)) return res.json([]);
    const courses = JSON.parse(fs.readFileSync(coursesFile, "utf-8"));
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Ошибка при загрузке курсов" });
  }
});

// === GET /courses/:id ===
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

// === POST /send-doc ===
app.post("/send-doc", async (req, res) => {
  try {
    const data = req.body;
    const outputDir = path.join(__dirname, "output");
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
    const filePath = path.join(outputDir, "temp.docx");

    await generateDocxFromTemplate(data, filePath);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "loknoi729@gmail.com",
        pass: "rrem llps evip ybmy", // Приложение пароль
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
    res.status(500).json({ error: "Ошибка при отправке письма" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));

// === Отдача фронтенда ===
app.use(express.static(path.join(__dirname, "../client/dist"))); // путь зависит от твоего билда

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});