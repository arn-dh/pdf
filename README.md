# 🧘‍♀️ Yoga with Gabi — Dynamic Document Viewer

## 🎯 Overview

This project is a lightweight, no-code content system to publish visual documents (PDF-like experiences) on the web.

It allows you to:

* Display documents as scrollable images
* Manage content via Google Sheets
* Host images via Cloudinary
* Serve everything through GitHub Pages

👉 No backend required
👉 No CMS required
👉 Fully dynamic

---

# 🧩 Architecture

The system is based on 3 components:

### 1. Google Sheets (Content)

* Stores all documents, images, and texts
* Acts as a CMS

### 2. Cloudinary (Images)

* Hosts and optimizes images
* Provides public URLs

### 3. GitHub Pages (Frontend)

* Serves the website
* Fetches and renders content dynamically

---

# 🗂️ Project Structure

```text
/
├── index.html   → Landing page (menu)
├── 404.html     → Document viewer (dynamic)
```

---

# 🌐 Routing System

GitHub Pages does not support dynamic routing natively.

We use a simple workaround:

* `/` → loads `index.html`
* `/slug` → loads `404.html`
* JavaScript extracts the slug from the URL

Example:

```text
https://yogawithgabidp.com/yoga-prenatal
```

---

# 📄 Google Sheets Structure

## Sheet 1 — `site`

Controls landing page content and design.

### Columns:

| Field            | Description            |
| ---------------- | ---------------------- |
| site_title       | Website title          |
| welcome_text     | Small label            |
| intro_text       | Main heading           |
| description_text | Secondary text         |
| primary_color    | Main color (#HEX)      |
| secondary_color  | Secondary color (#HEX) |

---

## Sheet 2 — `docs`

Controls documents and images.

### Columns:

| Field      | Description      |
| ---------- | ---------------- |
| slug       | URL identifier   |
| title      | Display name     |
| menu_order | Order in menu    |
| device     | desktop / mobile |
| order      | Page order       |
| image_url  | Image URL        |

---

# 📸 Images (Cloudinary)

Images must be:

* Publicly accessible
* Direct URLs (ending in .jpg / .png)

Recommended transformations:

### Desktop:

```text
/upload/f_auto,q_auto,w_1400/
```

### Mobile:

```text
/upload/f_auto,q_auto,w_900/
```

---

# 🚀 How It Works

### Landing Page (`index.html`)

* Fetches site config + documents
* Displays a list of available documents
* Links to `/slug`

### Document Page (`404.html`)

* Reads slug from URL
* Filters images from Google Sheets
* Displays images based on device (desktop/mobile)

---

# ➕ Adding Content

1. Upload images to Cloudinary
2. Copy image URLs
3. Add rows to Google Sheets (`docs`)

Example:

```text
yoga-prenatal,Yoga Prenatal,1,desktop,1,https://...
yoga-prenatal,Yoga Prenatal,1,mobile,1,https://...
```

👉 Changes are reflected instantly (no redeploy)

---

# 🎨 Customization

Landing page is fully controlled via Google Sheets:

* Text content
* Colors
* Document list

No code changes required.

---

# ⚠️ Common Issues

* Wrong column names in Sheets
* Slug mismatch
* Invalid image URLs
* Missing mobile or desktop entries

---

# 🔄 Deployment

GitHub Pages auto-deploys on commit.

* Code changes → redeploy required
* Content changes (Sheets / images) → instant

---

# 💡 Best Practices

* Keep slugs short and clean
* Optimize images
* Use consistent naming
* Always test on mobile

---

# 📌 Example URLs

```text
/
/yoga-prenatal
/postnatal
/retreat-2026
```

---

# 🧠 Summary

```text
Google Sheets = content
Cloudinary = images
GitHub Pages = frontend
```

---

# 📎 License

Free to use and adapt.

---

👉 Built for simplicity, speed, and flexibility.

## 🤝 Credits

Built with the support of ChatGPT (OpenAI) for architecture, development, and implementation.
