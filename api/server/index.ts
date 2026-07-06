import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:3001',     
      'http://localhost:8080',    
      'https://portfolio.zabrown.com',
      'https://zabrown.com', 
    ],
    methods: ['POST', 'GET', 'OPTIONS'],
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body || {};
  const fromAddress = process.env.SMTP_FROM || "me@zabrown.com";
  const toAddress = process.env.CONTACT_TO_EMAIL || fromAddress;

  if (!name || !email || !subject || !message) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${fromAddress}>`,
      to: toAddress,
      replyTo: email,
      subject: subject || "New contact form message",
      text: `From: ${name} <${email}>\n\n${message}`
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Failed to send contact email", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to send message." });
  }
});

// __dirname is available in CommonJS output (no import.meta.url)
const buildPath = path.join(__dirname, "../../../build");
app.use(express.static(buildPath));

app.get("*", (_req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
