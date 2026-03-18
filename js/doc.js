const pathParts = window.location.pathname.split("/").filter(Boolean);
const slug = pathParts[0] || "";
const isMobile = window.innerWidth <= 768;
const device = isMobile ? "mobile" : "desktop";

const statusEl = document.getElementById("docStatus");
const viewer = document.getElementById("viewer");
const counter = document.getElementById("counter");
const docTitleEl = document.getElementById("docTitle");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let elements = [];
let current = 0;

function updateCounter(i) {
  counter.textContent = elements.length ? `${i + 1} / ${elements.length}` : "0";
}

function scrollToPage(i) {
  if (i < 0 || i >= elements.length) return;
  current = i;
  elements[i].scrollIntoView({ behavior: "smooth", block: "start" });
  updateCounter(i);
}

function nextPage() {
  if (current < elements.length - 1) scrollToPage(current + 1);
}

function prevPage() {
  if (current > 0) scrollToPage(current - 1);
}

prevBtn.addEventListener("click", prevPage);
nextBtn.addEventListener("click", nextPage);

function observePages() {
  const observer = new IntersectionObserver(entries => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) {
      current = elements.indexOf(visible.target);
      updateCounter(current);
    }
  }, { threshold: 0.6 });

  elements.forEach(el => observer.observe(el));
}

function renderDocumentTitle(docsRows) {
  const anyDocRow = docsRows.find(r => r.slug === slug);
  const title = anyDocRow ? (anyDocRow.title || anyDocRow.slug) : slug || "Document";
  docTitleEl.textContent = title;
  document.title = title;
}

function renderPages(pages) {
  viewer.innerHTML = "";
  elements = [];

  pages.forEach((p, index) => {
    const img = document.createElement("img");
    img.src = p.image_url;
    img.alt = `Page ${index + 1}`;
    img.className = "page";
    img.loading = "lazy";
    viewer.appendChild(img);
    elements.push(img);
  });

  statusEl.style.display = "none";
  viewer.style.display = "block";
  updateCounter(0);
  observePages();
}

async function initDoc() {
  try {
    const [site, docsRows] = await Promise.all([getSiteData(), getDocsData()]);
    applyTheme(site);
    renderDocumentTitle(docsRows);

    const pages = docsRows
      .filter(r => r.slug === slug && r.device === device)
      .sort((a, b) => Number(a.order) - Number(b.order));

    if (!pages.length) {
      statusEl.textContent = `No content found for "${slug}" (${device}).`;
      return;
    }

    renderPages(pages);
  } catch (err) {
    statusEl.textContent = err.message || "Error";
  }
}

initDoc();
