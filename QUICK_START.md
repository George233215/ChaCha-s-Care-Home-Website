# Quick Start Guide - CareCare Website

## 1 Minute Setup

```bash
# Clone or download the project
cd carecare-website

# Install all dependencies
pnpm install

# Create .env.local with your Sanity credentials
echo 'NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here' > .env.local
echo 'NEXT_PUBLIC_SANITY_DATASET=production' >> .env.local

# Start the development server
pnpm dev
```

Open your browser:
- **App**: http://localhost:3000
- **Sanity Studio**: http://localhost:3333

---

## Project Files at a Glance

| Folder | Purpose |
|--------|---------|
| `app/` | Next.js pages and routes |
| `studio/` | Sanity CMS management interface |
| `components/` | React UI components |
| `lib/sanity.ts` | Sanity client & database queries |
| `app/globals.css` | Design tokens and colors |

---

## Key Files to Edit

### Change Site Name
**File**: `components/Navigation.tsx` (line 24)
```tsx
<span className="text-2xl font-bold text-foreground">YourCarHomeName</span>
```

### Change Colors
**File**: `app/globals.css` (lines 18-40)
```css
--primary: 0 0% 8%;        /* Main brand color */
--secondary: 0 0% 95%;     /* Background color */
--accent: 0 0% 20%;        /* Highlight color */
```

### Update Contact Info
**File**: `components/Footer.tsx` (lines 16-30)
- Phone number
- Email address
- Physical address

**File**: `app/contact/page.tsx` (lines 68-76)
- Contact details and hours

---

## Sanity CMS Structure

### Content Types (Schemas)
- **Home**: Hero section, introduction
- **Service**: Care offerings with features
- **Team Member**: Staff profiles with photos
- **Testimonial**: Client feedback & ratings
- **Gallery**: Photo collections by category
- **Blog**: Articles and news posts
- **About**: Mission, vision, values
- **Feature**: Highlighted service features
- **Contact**: Form submissions from website

### Create Content
1. Go to http://localhost:3333
2. Click "Create"
3. Select content type
4. Fill in fields
5. Click "Publish"

---

## Pages Available

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Main landing page |
| Services | `/services` | List all care services |
| Team | `/team` | Staff members & bios |
| About | `/about` | Mission & values |
| Gallery | `/gallery` | Photo collections |
| Blog | `/blog` | News & health tips |
| Testimonials | `/testimonials` | Client reviews |
| Contact | `/contact` | Inquiry form |

---

## Common Tasks

### Add a Service
1. In Sanity Studio, click "Create" → "Service"
2. Fill in: Title, Description, Features, Image
3. Set "Display Order" (1, 2, 3...)
4. Click "Publish"
5. Website updates automatically

### Add Team Member
1. Click "Create" → "Team Member"
2. Add: Name, Position, Bio, Photo, Contact Info
3. Set "Display Order"
4. Click "Publish"

### Add Testimonial
1. Click "Create" → "Testimonial"
2. Add: Client Name, Text, Rating, Photo
3. Mark "Featured" for homepage display
4. Click "Publish"

### Add Gallery Images
1. Click "Create" → "Gallery"
2. Add: Title, Category, Images with Captions
3. Click "Publish"

### Write Blog Post
1. Click "Create" → "Blog Post"
2. Add: Title, Content, Author, Category, Featured Image
3. Click "Publish"

---

## Environment Variables Needed

Create `.env.local` in project root:

```env
# Required - Get from https://manage.sanity.io/
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

That's it! The other variables are optional.

---

## Development Commands

```bash
# Start development (app + Sanity Studio)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

---

## Deploy to Vercel (5 minutes)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/carecare.git
   git push -u origin main
   ```

2. **Go to**: https://vercel.com/new

3. **Connect GitHub repository**

4. **Add Environment Variables**:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID = your_project_id
   NEXT_PUBLIC_SANITY_DATASET = production
   ```

5. **Click Deploy** ✓

Your site is live!

---

## Sanity Dashboard

### View Submissions
1. Go to Sanity Studio
2. Look for "Contact" in the left menu
3. Click to see all form submissions
4. Update status: New → In Progress → Responded → Resolved

### Publishing
- **Draft**: Only visible to you in Studio
- **Published**: Live on website
- Always click "Publish" to make changes live

### Version History
Click the "History" tab in any document to see all changes and revert if needed.

---

## Important Notes

- **Mobile First**: Site is designed for mobile, scales up
- **No Database Setup Required**: Sanity handles all data
- **Automatic Image Optimization**: Images are optimized by Sanity
- **Auto-Revalidate**: Pages refresh every hour from Sanity
- **Type Safe**: Full TypeScript throughout

---

## Customization Checklist

- [ ] Update site name/logo
- [ ] Change colors to match brand
- [ ] Update footer contact info
- [ ] Change navigation menu (if needed)
- [ ] Create content in Sanity:
  - [ ] Home page data
  - [ ] 3+ Services
  - [ ] 3+ Team members
  - [ ] 5+ Testimonials
  - [ ] Gallery images
  - [ ] About page content
- [ ] Test contact form
- [ ] Deploy to Vercel
- [ ] Set up custom domain

---

## Need Help?

### Check These Files First
- `README.md` - Full documentation
- `SANITY_SETUP.md` - Detailed Sanity configuration
- `INTEGRATION_GUIDE.md` - Pre-launch checklist

### External Resources
- [Sanity Docs](https://www.sanity.io/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## Project Structure Summary

```
carecare-website/
├── app/                 ← Next.js pages
├── studio/              ← Sanity CMS (separate)
├── components/          ← UI components
├── lib/sanity.ts        ← Database client
├── public/              ← Static files
└── [config files]       ← TypeScript, Tailwind, etc.
```

**Key Feature**: `studio/` folder is completely separate, preventing conflicts while keeping everything organized.

---

**Ready to launch?** Follow the Deploy to Vercel section above! 🚀
