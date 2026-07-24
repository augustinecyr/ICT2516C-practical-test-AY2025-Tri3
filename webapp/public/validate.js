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
  var ALLOWED_PATTERN = /^[a-zA-Z0-9 ]+$/;
  var MIN_LENGTH = 2;
  var MAX_LENGTH = 100;

  function isValidSearchTerm(term) {
    if (typeof term !== "string") return false;
    var trimmed = term.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) return false;
    return ALLOWED_PATTERN.test(trimmed);
  }

  return {
    isValidSearchTerm: isValidSearchTerm,
    MIN_LENGTH: MIN_LENGTH,
    MAX_LENGTH: MAX_LENGTH
  };
});
