const express = require("express");
const path = require("path");
const { isWithinLength, hasDisallowedCharacters, MIN_LENGTH, MAX_LENGTH } = require("./public/validate.js");

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
  if (!isWithinLength(term)) {
    return res
      .status(400)
      .send(`Search term must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters.`);
  }

  // requirement (g): SQLi/XSS-style attack attempt - redirect back to the
  // homepage instead of reflecting or echoing the malicious value anywhere.
  if (hasDisallowedCharacters(term)) {
    return res.redirect("/");
  }

  // requirement (h): valid input - show the dedicated results page
  res.sendFile(path.join(__dirname, "views", "search.html"));
});

app.listen(PORT, () => {
  console.log(`webapp listening on port ${PORT}`);
});

module.exports = app;
