export function slugify(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(text, max, suffix = '…') {
  if (text.length <= max) return text;
  return text.slice(0, Math.max(0, max - suffix.length)).trimEnd() + suffix;
}
