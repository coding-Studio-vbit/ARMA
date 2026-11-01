const escapeRegex = (string) => {
  if (typeof string !== "string") return "";
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

module.exports = escapeRegex;
