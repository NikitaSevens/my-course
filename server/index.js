import dotenv from "dotenv";
import path from "path";
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";
import multer from "multer";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { generateDocxFromTemplate } from "./utils/generateDocxFromTemplate.js";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const allowedOrigins = [
  "https://my-coursesask.netlify.app",
  "http://localhost:3000",
  "http://127.0.0.1:3000"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS ошибка: доступ запрещён"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

if (!process.env.S3_BUCKET) {
  throw new Error("S3_BUCKET is not defined");
}

const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
const coursesFile = path.join(dataDir, "courses.json");

function streamToString(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
    stream.on("error", reject);
  });
}

async function loadCoursesFromS3() {
  try {
    const result = await s3.send(
      new GetObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: "courses.json",
      })
    );
    const body = await streamToString(result.Body);
    return JSON.parse(body);
  } catch (err) {
    if (err.name === "NoSuchKey") return [];
    console.error("Ошибка чтения courses.json из S3:", err);
    return [];
  }
}

async function saveCoursesToS3(courses) {
  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: "courses.json",
        Body: JSON.stringify(courses, null, 2),
        ContentType: "application/json",
      })
    );
  } catch (err) {
    console.error("Ошибка сохранения courses.json в S3:", err);
    throw err;
  }
}

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

      let courses = await loadCoursesFromS3();
      courses.push(newCourse);
      await saveCoursesToS3(courses);

      res.status(201).json({ message: "Курс создан", course: newCourse });
    } catch (err) {
      console.error("Ошибка при создании курса:", err);
      res.status(500).json({ error: "Ошибка при создании курса" });
    }
  }
);

// === GET /courses ===
app.get("/courses", async (req, res) => {
  try {
    const courses = await loadCoursesFromS3();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Ошибка при загрузке курсов" });
  }
});


// === DELETE /courses/:id ===
app.delete("/courses/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const courses = await loadCoursesFromS3();
    const filtered = courses.filter(course => course.id !== id);

    if (filtered.length === courses.length) {
      return res.status(404).json({ error: "Курс не найден" });
    }

    await saveCoursesToS3(filtered);
    res.json({ message: "Курс удалён" });
  } catch (err) {
    console.error("Ошибка при удалении курса:", err);
    res.status(500).json({ error: "Ошибка при удалении курса" });
  }
});


// === PUT /courses/:id ===
app.put(
  "/courses/:id",
  upload.fields([
    { name: "imageFile", maxCount: 1 },
    { name: "programFile", maxCount: 1 },
  ]),
  async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const files = req.files;

    try {
      let courses = await loadCoursesFromS3();
      const index = courses.findIndex(course => course.id === id);
      if (index === -1) return res.status(404).json({ error: "Курс не найден" });

      let imageUrl = courses[index].image;
      let programUrl = courses[index].programFile;

      if (files?.imageFile?.[0]) {
        const filename = `${uuidv4()}${path.extname(files.imageFile[0].originalname)}`;
        imageUrl = await uploadToS3(files.imageFile[0], filename);
      }

      if (files?.programFile?.[0]) {
        const filename = `${uuidv4()}${path.extname(files.programFile[0].originalname)}`;
        programUrl = await uploadToS3(files.programFile[0], filename);
      }

      const updatedCourse = {
        ...courses[index],
        ...data,
        image: imageUrl,
        programFile: programUrl,
      };

      courses[index] = updatedCourse;
      await saveCoursesToS3(courses);
      res.json({ message: "Курс обновлён", course: updatedCourse });
    } catch (err) {
      console.error("Ошибка при обновлении курса:", err);
      res.status(500).json({ error: "Ошибка при обновлении курса" });
    }
  }
);


// === GET /courses/:id ===
app.get("/courses/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const courses = await loadCoursesFromS3();
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
      subject: `📄 Документ от ${data.name} – ${new Date().toLocaleDateString(
        "ru-RU"
      )}`,
      text: `Курс: ${data.course}`,
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
