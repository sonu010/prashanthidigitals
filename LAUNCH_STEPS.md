# 🚀 Prashanthi Digital Studio — Launch Steps

**A step-by-step guide to get the website live.**  
Follow these steps in order. Each section has exact instructions.

---

## 📋 Prerequisites (Already Done ✅)

- [x] Website code is built and working locally
- [x] GitHub repo: `https://github.com/sonu010/prashanthidigitals`
- [x] Vercel account created
- [x] Cloudinary account created

---

## Step 1: Configure Cloudinary for Image Storage

Cloudinary will store all your photos (gallery, services, hero images, etc.) and serve them fast via CDN.

### 1.1 Get Your Cloudinary Credentials

1. Go to [cloudinary.com/console](https://console.cloudinary.com/) and log in
2. On the **Dashboard**, you'll see:
   - **Cloud Name** — something like `dxxxxxxxx` or a custom name
   - **API Key** — a long number like `123456789012345`
   - **API Secret** — a long string (keep this private!)
3. **Copy the Cloud Name** — you'll need it soon

### 1.2 Create Folders in Cloudinary

1. In the Cloudinary console, go to **Media Library** (left sidebar)
2. Click **Create Folder** and create these folders:

```
hero/           → Hero section background images (1920x1080)
owner/          → Dad's professional photo (800x1000)
logo/           → Studio logo files
services/       → One image per service type (600x400)
gallery/        → All portfolio photos
  weddings/     → 8-12 wedding photos (800x600)
  pre-wedding/  → 6-8 couple shoot photos (800x600)
  birthdays/    → 4-6 birthday photos (800x600)
  ceremonies/   → 4-6 religious ceremony photos (800x600)
  corporate/    → 3-4 corporate event photos (800x600)
  led-walls/    → 4-6 LED wall setup photos (800x600)
led-walls/      → LED Wall page specific images
about/          → Studio exterior, interior, behind-the-scenes
testimonials/   → Client photos (150x150, optional)
```

### 1.3 Upload Your First Images

1. Click into a folder (e.g., `gallery/weddings/`)
2. Click **Upload** button → drag and drop your photos
3. After upload, click on any image → copy the **URL**
4. The URL looks like:
   ```
   https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/gallery/weddings/photo1.jpg
   ```

### 1.4 Image Optimization (Automatic!)

Cloudinary auto-optimizes images. Add these to any URL for best performance:

| What | Add to URL | Example |
|------|-----------|---------|
| Auto format (WebP) | `/f_auto/` | Smaller file size |
| Auto quality | `/q_auto/` | Smart compression |
| Resize width | `/w_800/` | Resize to 800px wide |
| All together | `/f_auto,q_auto,w_800/` | Best for web |

**Example optimized URL:**
```
https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/f_auto,q_auto,w_800/gallery/weddings/photo1.jpg
```

### 1.5 Update the Website Code to Use Cloudinary

Once you have images uploaded, you'll replace placeholder URLs in the code. For example:

**Before (placeholder):**
```tsx
src="https://placehold.co/800x600/c8102e/ffffff?text=Wedding+1"
```

**After (Cloudinary):**
```tsx
src="https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/f_auto,q_auto,w_800/gallery/weddings/wedding-01.jpg"
```

**Also add Cloudinary to `next.config.ts` allowed domains** — see Step 4.

> 💡 **Tip:** You don't need to replace all images right now. Do it gradually. The placeholder images work fine for launch.

---

## Step 2: Update Contact Information

### 2.1 Update Phone & WhatsApp Numbers

The phone number `+91 9948670396` is used in multiple files. If this needs to change, search and replace across these files:

| File | What to Update |
|------|---------------|
| `src/components/Header.tsx` | Phone number in nav bar, WhatsApp link |
| `src/components/Footer.tsx` | Phone number, email in footer |
| `src/components/WhatsAppFloat.tsx` | WhatsApp `wa.me` link |
| `src/components/QuickEnquiry.tsx` | WhatsApp redirect in form submit |
| `src/app/page.tsx` | WhatsApp links on home page |
| `src/app/contact/page.tsx` | Phone, email, address on contact page |
| `src/app/led-walls/page.tsx` | WhatsApp link for LED wall enquiry |
| `src/components/LocalBusinessSchema.tsx` | Phone in SEO schema |

### 2.2 Update Email Address

Currently: `prashanthistudio@gmail.com`  
If different, search and replace in the same files above.

### 2.3 Update Google Maps Location

Currently pointing to: `Prashanthi Photo Studio, Nacharam` (lat: 17.4297, lng: 78.5568)

If the coordinates need updating, edit:
- `src/components/GoogleMapEmbed.tsx` — latitude/longitude
- `src/components/LocalBusinessSchema.tsx` — geo coordinates
- `src/components/Footer.tsx` — Google Maps link

---

## Step 3: Deploy to Vercel

### 3.1 Push Latest Code to GitHub

Open Terminal and run:

```bash
cd /Users/vigneshthati/Documents/Public/prashanthidigitals/website
git add -A
git commit -m "Ready for deployment"
git push origin main
```

### 3.2 Connect GitHub Repo to Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard) and log in
2. Click **"Add New..."** → **"Project"**
3. Under **"Import Git Repository"**, find `sonu010/prashanthidigitals`
   - If you don't see it, click **"Adjust GitHub App Permissions"** and grant access to the repo
4. Click **Import**

### 3.3 Configure Project Settings

On the configuration page:

| Setting | Value |
|---------|-------|
| **Project Name** | `prashanthi-studio` (or any name you like) |
| **Framework Preset** | Next.js (auto-detected) |
| **Root Directory** | Click **Edit** → type `website` → click **Continue** |
| **Build Command** | Leave default (`next build`) |
| **Output Directory** | Leave default |
| **Install Command** | Leave default (`npm install`) |

> ⚠️ **IMPORTANT:** You MUST set Root Directory to `website` because the Next.js project is inside the `website/` folder, not the repo root.

### 3.4 Add Environment Variables

Still on the same page, scroll to **Environment Variables** and add:

| Key | Value | Notes |
|-----|-------|-------|
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | *(leave empty for now)* | Can add later |

Click **Deploy**. Wait 1-2 minutes.

### 3.5 Verify Deployment

1. Vercel will show a success screen with a URL like `prashanthi-studio.vercel.app`
2. Click the URL — your website should be live!
3. Test a few pages: Home, About, Services, Gallery, Contact, Admin
4. Test on your phone too — open the URL in mobile browser

> 🎉 **Your website is now live on the internet!**

---

## Step 4: Add Cloudinary Domain to Next.js Config

When you start using Cloudinary images, you need to allow the domain.

### 4.1 Edit `next.config.ts`

Open `website/next.config.ts` and add Cloudinary to remotePatterns:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  devIndicators: false,
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",    // ← ADD THIS
      },
    ],
  },
};

export default nextConfig;
```

### 4.2 Push the Change

```bash
cd /Users/vigneshthati/Documents/Public/prashanthidigitals/website
git add next.config.ts
git commit -m "Allow Cloudinary images"
git push origin main
```

Vercel will auto-deploy in ~1 minute.

---

## Step 5: Connect a Custom Domain (Optional but Recommended)

### 5.1 Buy a Domain

Recommended domains (pick one):
- `prashanthistudio.in` — ₹500-700/year
- `prashanthistudio.com` — ₹800-1000/year
- `prashanthidigital.in` — ₹500-700/year

Where to buy:
- [GoDaddy.com](https://www.godaddy.com/en-in) — popular in India
- [Namecheap.com](https://www.namecheap.com) — cheapest
- [Hostinger.in](https://www.hostinger.in) — budget option

### 5.2 Add Domain to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard) → Click your project
2. Go to **Settings** → **Domains**
3. Type your domain (e.g., `prashanthistudio.in`) → Click **Add**
4. Vercel will show you DNS records to configure

### 5.3 Update DNS at Your Domain Registrar

Vercel will show something like:

| Type | Name | Value |
|------|------|-------|
| A | @ | `76.76.21.21` |
| CNAME | www | `cname.vercel-dns.com` |

1. Log in to your domain registrar (GoDaddy/Namecheap)
2. Go to **DNS Settings** / **DNS Management**
3. Add the records exactly as Vercel shows
4. Wait 5-30 minutes for DNS to propagate
5. Go back to Vercel → the domain should show **✓ Valid**

> SSL (HTTPS) is automatic and free with Vercel.

### 5.4 Update Sitemap Base URL

Once you have a domain, update the sitemap:

Edit `website/src/app/sitemap.ts` — change the `baseUrl`:

```ts
// Change from:
const baseUrl = "https://prashanthistudio.com";
// Change to:
const baseUrl = "https://prashanthistudio.in";  // your actual domain
```

Push the change:
```bash
git add src/app/sitemap.ts
git commit -m "Update sitemap with real domain"
git push origin main
```

---

## Step 6: Set Up Google Maps API (Optional)

This makes the contact page show an interactive map instead of a static link.

### 6.1 Create a Google Cloud Project

1. Go to [console.cloud.google.com](https://console.cloud.google.com/)
2. Click **Select a Project** → **New Project**
3. Name: `Prashanthi Studio Website` → **Create**
4. Select the new project

### 6.2 Enable Maps JavaScript API

1. Go to **APIs & Services** → **Library**
2. Search for **"Maps JavaScript API"**
3. Click it → Click **Enable**

### 6.3 Create an API Key

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **API Key**
3. Copy the key
4. Click **Restrict Key** (recommended):
   - Under **Application restrictions**: select **HTTP referrers**
   - Add: `prashanthistudio.in/*` and `*.vercel.app/*`
   - Under **API restrictions**: select **Maps JavaScript API**
   - Click **Save**

### 6.4 Add to Vercel

1. Go to Vercel Dashboard → Your project → **Settings** → **Environment Variables**
2. Add:
   - Key: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
   - Value: *paste your API key*
3. Click **Save**
4. Go to **Deployments** → click **...** on latest → **Redeploy**

---

## Step 7: Replace Placeholder Images (Ongoing)

This is the biggest content task. Do it gradually.

### 7.1 Priority Order

Replace images in this order:

| Priority | Page | What to Replace | How Many |
|----------|------|----------------|---------|
| 🔴 1st | Home | Owner photo, hero background | 2-3 images |
| 🔴 2nd | About | Owner photo, studio photos | 3-4 images |
| 🟡 3rd | Gallery | Portfolio photos by category | 15-30 images |
| 🟡 4th | Services | Service category thumbnails | 9 images |
| 🟡 5th | LED Walls | LED wall photos | 6-8 images |
| 🟢 6th | Packages | Optional package images | 0-6 images |

See **[IMAGE_DIMENSIONS_GUIDE.md](./IMAGE_DIMENSIONS_GUIDE.md)** for exact sizes.

### 7.2 How to Replace an Image

1. Upload the image to Cloudinary (into the right folder)
2. Copy the Cloudinary URL
3. In the code, find the `placehold.co` URL and replace it with the Cloudinary URL
4. Push to GitHub → Vercel auto-deploys

**Example — replacing the owner photo on the home page:**

In `src/app/page.tsx`, find:
```tsx
src="https://placehold.co/500x600/c8102e/ffffff?text=Dad+Photo"
```
Replace with:
```tsx
src="https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/f_auto,q_auto/owner/dad-photo.jpg"
```

### 7.3 Add Logo

1. Upload your logo to Cloudinary `logo/` folder (or place in `website/public/logo.png`)
2. Update `src/components/Header.tsx` — replace the text logo with an `<Image>` tag
3. Update `src/components/Footer.tsx` — same for footer logo

---

## Step 8: Post-Launch Setup

### 8.1 Google My Business

1. Go to [business.google.com](https://business.google.com)
2. Add your business: "Prashanthi Digital Studio"
3. Add address, phone, website URL, business hours
4. Add photos
5. This makes you appear in Google Maps searches!

### 8.2 Google Analytics (Track Visitors)

1. Go to [analytics.google.com](https://analytics.google.com)
2. Create a property for your website
3. Get the Measurement ID (starts with `G-`)
4. Add to Vercel environment variables:
   - Key: `NEXT_PUBLIC_GA_ID`
   - Value: `G-XXXXXXXXXX`
5. Add the tracking script to `website/src/app/layout.tsx` (I can help with this later)

### 8.3 WhatsApp Business

1. Download **WhatsApp Business** app on the studio phone
2. Set up business profile: name, address, description, business hours
3. Set up **Quick Replies** for common enquiries:
   - "Thank you for contacting Prashanthi Studio! How can we help?"
   - "Our wedding photography packages start from ₹XX,XXX. Would you like details?"
   - "LED wall rental: 8ft x 12ft screens available. When is your event?"

---

## 📊 Cost Summary

| Item | Cost | Frequency |
|------|------|-----------|
| Vercel Hosting | **₹0** (Free) | Forever |
| Cloudinary Images | **₹0** (Free — 25GB) | Forever |
| Google Maps API | **₹0** (Free — 28K loads/month) | Forever |
| SSL Certificate | **₹0** (Included with Vercel) | Forever |
| Domain (.in) | **₹500-700** | Per year |
| **TOTAL** | **₹500-700/year** (~₹50/month) | |

---

## 🔄 How to Make Updates After Launch

### Workflow: Edit → Push → Auto-Deploy

```
1. Edit files locally on your Mac
2. Open Terminal:
   cd /Users/vigneshthati/Documents/Public/prashanthidigitals/website
   git add -A
   git commit -m "Description of change"
   git push origin main
3. Vercel auto-deploys in ~1 minute
4. Changes are live!
```

### Common Updates

| Task | What to Edit | Files |
|------|-------------|-------|
| Add gallery photos | Upload to Cloudinary, update gallery data | `src/app/gallery/page.tsx` |
| Change prices | Update package pricing | `src/app/packages/page.tsx` |
| Add testimonials | Add new testimonial entry | `src/app/page.tsx` (testimonials array) |
| Update phone number | Search & replace across files | Header, Footer, WhatsApp, Contact |
| Add new service | Add to services array | `src/app/services/page.tsx` |
| Update admin daily log | Use the admin panel | `/admin/daily-log` in browser |

---

## ✅ Launch Checklist

### Before Going Live
- [ ] **Step 1** — Cloudinary account configured, at least 5-10 photos uploaded
- [ ] **Step 2** — Contact info verified (phone, email, address)
- [ ] **Step 3** — Deployed to Vercel, URL works
- [ ] **Step 4** — Cloudinary domain added to `next.config.ts`
- [ ] Test on mobile phone (Android Chrome + iPhone Safari)
- [ ] Test WhatsApp button — opens WhatsApp with correct number
- [ ] Test booking form — submits without errors
- [ ] Test admin panel at `/admin` — all pages load
- [ ] Test Gallery lightbox — images open/close, arrow navigation works

### After Going Live
- [ ] **Step 5** — Custom domain connected (when ready)
- [ ] **Step 6** — Google Maps API key added (optional)
- [ ] **Step 7** — Replace remaining placeholder images (gradual)
- [ ] **Step 8** — Google My Business listing created
- [ ] Share website on WhatsApp, Facebook, Instagram
- [ ] Print QR code for business cards (generate at qr-code-generator.com)

---

## 🆘 Troubleshooting

### "Build failed" on Vercel
- Check that **Root Directory** is set to `website` in Vercel project settings
- Check the build log for the specific error message

### Images not loading
- Make sure the image hostname is in `next.config.ts` → `remotePatterns`
- For Cloudinary: `hostname: "res.cloudinary.com"` must be listed

### Website shows old content
- Vercel caches pages. Go to Vercel Dashboard → Deployments → Redeploy
- Or push a new commit to trigger auto-deploy

### Google Maps shows "API key required"
- Add the API key to Vercel environment variables
- Redeploy after adding the key

### Can't push to GitHub
```bash
# If you get permission errors:
git remote set-url origin https://github.com/sonu010/prashanthidigitals.git
git push origin main

# If you get merge conflicts:
git pull origin main
# Fix any conflicts, then:
git add -A
git commit -m "Resolve conflicts"
git push origin main
```

---

*This guide was created for the Prashanthi Digital Studio website project.*  
*For image dimensions, see [IMAGE_DIMENSIONS_GUIDE.md](./IMAGE_DIMENSIONS_GUIDE.md)*  
*For development status, see [DEVELOPMENT_STATUS.md](./DEVELOPMENT_STATUS.md)*
