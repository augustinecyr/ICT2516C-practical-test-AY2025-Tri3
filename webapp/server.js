const express = require("express");
const path = require("path");
const isValidSearchTerm = require("./public/validate.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/search", (req, res) => {
  const term = req.query.q;
  // OWASP Proactive Controls C3 - re-validate server-side; never trust
  // client-side validation alone.
  if (!isValidSearchTerm(term)) {
    return res.status(400).send("Invalid search term.");
  }
  res.send(`Search results for: ${term}`);
});

app.listen(PORT, () => {
  console.log(`webapp listening on port ${PORT}`);
});

module.exports = app;
