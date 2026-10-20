export function parseCsv(text) {
  const rows = [];
  for (const line of text.split(/\r?\n/)) {
    if (line === '' && rows.length > 0) continue;
    rows.push(line.split(','));
  }
  return rows;
}
