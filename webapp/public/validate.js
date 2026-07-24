(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.isValidSearchTerm = factory();
  }
})(typeof window !== "undefined" ? window : this, function () {
  // OWASP Proactive Controls C3 - Validate All Input: whitelist allowed
  // characters and enforce a length bound instead of trying to blocklist
  // dangerous patterns (e.g. SQL/HTML metacharacters).
  var ALLOWED_PATTERN = /^[a-zA-Z0-9 ]+$/;
  var MAX_LENGTH = 100;

  function isValidSearchTerm(term) {
    if (typeof term !== "string") return false;
    var trimmed = term.trim();
    if (trimmed.length === 0 || trimmed.length > MAX_LENGTH) return false;
    return ALLOWED_PATTERN.test(trimmed);
  }

  return isValidSearchTerm;
});
