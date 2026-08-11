import express from "express";

const app = express();
const PORT = 5001;

app.get("/api/notes", (req, res) => {
  res.status(200).send("You got 5 notes");
});

app.listen(5001, () => {
  console.log(`server startd on PORT: ${PORT}`);
  console.log(`Open your browser at: http://localhost:${PORT}`);
});
