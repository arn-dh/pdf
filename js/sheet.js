async function fetchCSV(url) {
  const res = await fetch(url);
  const text = await res.text();
  return parseCSV(text);
}

function parseCSV(text) {
  const rows = [];
  const lines = text.trim().split("\n");

  const headers = lines[0].split(",").map(h => h.trim());

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

// 👉 gestion des virgules dans les champs (important)
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
