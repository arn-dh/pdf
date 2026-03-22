async function fetchCSV(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.status}`);
  }
  const text = await res.text();
  return parseCSV(text);
}

function parseCSV(text) {
  const rows = [];
  const lines = text.trim().split(/\r?\n/);

  const headers = splitCSVLine(lines[0]).map(h => h.trim());

  for (let i = 1; i < lines.length; i++) {
    const values = splitCSVLine(lines[i]);
    const obj = {};

    headers.forEach((h, idx) => {
      obj[h] = values[idx] ? values[idx].trim() : "";
    });

    rows.push(obj);
  }

  return rows;
}

function splitCSVLine(line) {
  const result = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
}

async function getSiteData() {
  const rows = await fetchCSV(SITE_CSV_URL);
  return rows[0] || {};
}

async function getDocsData() {
  return await fetchCSV(DOCS_CSV_URL);
}

function isValidColor(value) {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value);
}

function applyTheme(siteRow) {
  const root = document.documentElement;
  if (siteRow.primary_color && isValidColor(siteRow.primary_color)) root.style.setProperty("--primary", siteRow.primary_color);
  if (siteRow.secondary_color && isValidColor(siteRow.secondary_color)) root.style.setProperty("--secondary", siteRow.secondary_color);
}
