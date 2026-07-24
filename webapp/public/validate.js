(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.SearchValidation = factory();
  }
})(typeof window !== "undefined" ? window : this, function () {
  // OWASP Proactive Controls C3 - Validate All Input: whitelist allowed
  // characters and enforce length bounds instead of trying to blocklist
  // dangerous patterns (e.g. SQL/HTML metacharacters). No unicode support
  // required - the whitelist is ASCII letters/digits/spaces only.
  const ALLOWED_PATTERN = /^[a-zA-Z0-9 ]+$/;
  const MIN_LENGTH = 2;
  const MAX_LENGTH = 100;

  function isWithinLength(term) {
    if (typeof term !== "string") return false;
    const trimmed = term.trim();
    return trimmed.length >= MIN_LENGTH && trimmed.length <= MAX_LENGTH;
  }

  // true = looks like an attack attempt (contains anything outside the
  // whitelist, e.g. SQLi/XSS metacharacters: ' " ; -- < > etc.)
  function hasDisallowedCharacters(term) {
    if (typeof term !== "string") return true;
    return !ALLOWED_PATTERN.test(term.trim());
  }

  function isValidSearchTerm(term) {
    return isWithinLength(term) && !hasDisallowedCharacters(term);
  }

  return {
    isValidSearchTerm: isValidSearchTerm,
    isWithinLength: isWithinLength,
    hasDisallowedCharacters: hasDisallowedCharacters,
    MIN_LENGTH: MIN_LENGTH,
    MAX_LENGTH: MAX_LENGTH
  };
});
