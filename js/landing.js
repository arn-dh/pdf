function renderLandingText(site) {
  document.getElementById("siteTitle").textContent = site.site_title || "Documents";
  document.getElementById("welcome").textContent = site.welcome_text || "Welcome";
  document.getElementById("intro").textContent = site.intro_text || "Explore the documents below.";
  document.getElementById("description").textContent = site.description_text || "";
  document.title = site.site_title || "Documents";
}

function renderContact(site) {
  const section = document.getElementById("contact");
  const img = document.getElementById("profileImg");
  const title = document.getElementById("contactTitle");
  const text = document.getElementById("contactText");
  const wa = document.getElementById("whatsappBtn");
  const ig = document.getElementById("instagramBtn");

  const hasContent =
    site.profile_image ||
    site.contact_title ||
    site.contact_text ||
    site.whatsapp_link ||
    site.instagram_link;

  if (!hasContent) {
    section.style.display = "none";
    return;
  }

  section.style.display = "flex";

  if (site.profile_image) {
    img.src = site.profile_image;
    img.style.display = "block";
  } else {
    img.style.display = "none";
  }

  title.textContent = site.contact_title || "";
  text.textContent = site.contact_text || "";

  if (site.whatsapp_link) {
    wa.href = site.whatsapp_link;
    wa.style.display = "inline-flex";
  } else {
    wa.style.display = "none";
  }

  if (site.instagram_link) {
    ig.href = site.instagram_link;
    ig.style.display = "inline-flex";
  } else {
    ig.style.display = "none";
  }
}

function renderMenu(docsRows) {
  const map = new Map();

  docsRows.forEach(row => {
    if (!row.slug) return;
    if (!map.has(row.slug)) {
      map.set(row.slug, {
        slug: row.slug,
        title: row.title || row.slug,
        menu_order: Number(row.menu_order || 999)
      });
    }
  });

  return Array.from(map.values()).sort((a, b) => a.menu_order - b.menu_order);
}

function renderCards(docs) {
  const status = document.getElementById("status");
  const grid = document.getElementById("grid");

  if (!docs.length) {
    status.className = "empty";
    status.textContent = "No documents available.";
    return;
  }

  grid.innerHTML = "";

  docs.forEach(doc => {
    const a = document.createElement("a");
    a.className = "card";
    a.href = `/${doc.slug}`;
    a.innerHTML = `
      <div class="card-top">
        <h2 class="card-title">${doc.title}</h2>
        <div class="arrow" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
      </div>
      <div class="card-slug">/${doc.slug}</div>
    `;
    grid.appendChild(a);
  });

  status.style.display = "none";
  grid.style.display = "grid";
}

async function initLanding() {
  const status = document.getElementById("status");

  try {
    const [site, docsRows] = await Promise.all([getSiteData(), getDocsData()]);
    applyTheme(site);
    renderLandingText(site);
    renderContact(site);

    const docs = renderMenu(docsRows);
    renderCards(docs);
  } catch (err) {
    status.className = "error";
    status.textContent = err.message || "Error";
  }
}

initLanding();
