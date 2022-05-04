import { prisma } from "./prisma";
import express from "express";
import nodemailer from "nodemailer";

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ca5e8a4f7469a1",
    pass: "9ba5b02a0bb5d2",
  },
});

app.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    },
  });

  await transport.sendMail({
    from: "Feedback Team <hello@feedback.com>",
    to: "Nuno Ferraz <108nunomiguelferraz@gmail.com>",
    subject: "New feedback",
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color; #111;">`,
      `<h1>New feedback!</h1>`,
      `<p>Type: ${type}</p>`,
      `<p>Description: ${comment}</p>`,
      `</div>`,
    ].join("\n"),
  });

  return res.status(201).json({ data: feedback });
});

app.listen(3333, () => {
  console.log(" HTTP server running on port 3333!");
});
