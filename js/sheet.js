function splitCSVLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
}

function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = splitCSVLine(lines[0]).map(h => h.trim());

  return lines.slice(1).filter(Boolean).map(line => {
    const values = splitCSVLine(line);
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = (values[i] || "").trim();
    });
    return obj;
  });
}

async function fetchCSV(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.status}`);
  }
  return parseCSV(await res.text());
}

async function getSiteData() {
  const rows = await fetchCSV(SITE_CSV_URL);
  return rows[0] || {};
}

async function getDocsData() {
  return fetchCSV(DOCS_CSV_URL);
}

function applyTheme(siteRow) {
  const root = document.documentElement;
  if (siteRow.primary_color) root.style.setProperty("--primary", siteRow.primary_color);
  if (siteRow.secondary_color) root.style.setProperty("--secondary", siteRow.secondary_color);
}
