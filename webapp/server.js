const express = require("express");
const path = require("path");
const { isValidSearchTerm, MIN_LENGTH, MAX_LENGTH } = require("./public/validate.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/search", (req, res) => {
  const term = req.query.q;

  // requirement (e): a search term must be supplied
  if (typeof term !== "string" || term.trim().length === 0) {
    return res.status(400).send("A search term is required.");
  }

  // requirement (f): min/max length, re-checked server-side (OWASP C3 -
  // never trust client-side validation alone)
  const trimmedLength = term.trim().length;
  if (trimmedLength < MIN_LENGTH || trimmedLength > MAX_LENGTH) {
    return res
      .status(400)
      .send(`Search term must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters.`);
  }

  if (!isValidSearchTerm(term)) {
    return res.status(400).send("Search term may only contain letters, numbers, and spaces.");
  }

  res.sendFile(path.join(__dirname, "views", "search.html"));
});

app.listen(PORT, () => {
  console.log(`webapp listening on port ${PORT}`);
});

module.exports = app;
