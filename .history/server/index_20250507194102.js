const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-doc", async (req, res) => {
  try {
    const data = req.body; // здесь твои поля: ФИО, email и т.д.

    // 1. Генерация Word — пока фейк
    const filePath = path.join(__dirname, "output", "temp.docx");
    fs.writeFileSync(filePath, "Заглушка файла .docx");

    // 2. Отправка на email
    const transporter = nodemailer.createTransport({
      service: "gmail", // или другой
      auth: {
        user: "your_email@gmail.com",
        pass: "your_app_password", // не обычный пароль!
      },
    });

    await transporter.sendMail({
      from: "your_email@gmail.com",
      to: "recipient@example.com",
      subject: "Документ с сайта",
      text: "Документ во вложении",
      attachments: [{ path: filePath }],
    });

    // 3. Удаляем временный файл
    fs.unlinkSync(filePath);

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка на сервере" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
