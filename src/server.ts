import express from "express";

const app = express();

app.use(express.json());

app.post("/feedbacks", (req, res) => {
  console.log(req.body);
  return res.send("Feedback received");
});

app.listen(3333, () => {
  console.log(" HTTP server running on port 3333!");
});
