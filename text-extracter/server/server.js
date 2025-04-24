import express from "express";
import multer from "multer";
import cors from "cors";
import Tesseract from "tesseract.js";

const app = express();
app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

app.post("/extract-text", upload.single("image"), async (req, res) => {
  try {
    const {
      data: { text },
    } = await Tesseract.recognize(req.file.buffer, "eng");
    res.json({ extractedText: text });
  } catch (error) {
    console.error("OCR error:", error);
    res.status(500).json({ error: "Text extraction failed" });
  }
});

app.listen(5000, () => {
  console.log("Server is running at http://localhost:5000");
});
