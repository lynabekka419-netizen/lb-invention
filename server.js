
import express from "express";
import OpenAI from "openai";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(express.static("public"));

const ai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/ask", async (req, res) => {
  try {
    const question = req.body.question;

    if (!question) {
      return res.status(400).json({ error: "اكتبي سؤالًا أولًا." });
    }

    const answer = await ai.responses.create({
      model: "gpt-5.5",
      instructions: "أنت مساعد تعليمي يجيب باللغة العربية بوضوح وبأسلوب بسيط.",
      input: question
    });

    res.json({ answer: answer.output_text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "حدث خطأ أثناء الحصول على الإجابة." });
  }
});

app.listen(3000, () => {
  console.log("الموقع يعمل على http://localhost:3000");
});
