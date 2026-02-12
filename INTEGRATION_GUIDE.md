# CareCare Website - Integration & Deployment Guide

## Quick Start Checklist

Before launching your site, complete these steps:

## 1. Sanity CMS Setup

- [ ] Create Sanity project at https://www.sanity.io/
- [ ] Copy your Project ID
- [ ] Create `.env.local` file with credentials
- [ ] Run `pnpm install` in both root and `studio/` folders
- [ ] Start dev server: `pnpm dev`
- [ ] Access Sanity Studio at http://localhost:3333
- [ ] Create at least one Home page entry
- [ ] Add sample services, team members, testimonials

## 2. Configure Environment Variables

### `.env.local` (Root Directory)
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### `studio/.env.local` (Optional - if not using defaults)
```env
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
```

## 3. Customize the Website

### Update Branding
1. **Logo/Site Name**: Edit `components/Navigation.tsx` line 24
   ```tsx
   <span className="text-2xl font-bold text-foreground">CareCare</span>
   ```

2. **Colors**: Edit `app/globals.css` CSS variables:
   ```css
   --primary: 0 0% 8%;          /* Main brand color */
   --secondary: 0 0% 95%;       /* Secondary color */
   --accent: 0 0% 20%;          /* Accent color */
   ```

3. **Typography**: Edit `app/layout.tsx` to change fonts:
   ```tsx
   import { YourFont } from 'next/font/google'
   const font = YourFont({ subsets: ['latin'] })
   ```

### Update Footer Content
Edit `components/Footer.tsx`:
- Change "CareCare" to your organization name
- Update contact information
- Add social media links (optional)

### Update Contact Information
Edit multiple files:
- `components/Footer.tsx` - footer contact
- `app/contact/page.tsx` - contact page info

## 4. Create Initial Content in Sanity

### Home Page
1. Go to Studio dashboard
2. Create a "Home Page" document
3. Fill in hero section details
4. Add introduction content
5. Publish

### Services
1. Create multiple "Service" documents
2. Add at least 3 services (Healthcare, Assisted Living, Rehabilitation)
3. Include descriptions and features
4. Publish each

### Team Members
1. Create "Team Member" documents for key staff
2. Include photos, bios, and contact info
3. Set display order
4. Publish

### Gallery
1. Create "Gallery" document
2. Add images of your facility
3. Include captions and category
4. Publish

### Testimonials
1. Create "Testimonial" documents
2. Add client feedback and ratings
3. Mark some as "featured"
4. Publish

### Blog Posts (Optional)
1. Create "Blog Post" documents
2. Add health tips or community news
3. Include featured images
4. Publish

## 5. Test Locally

```bash
# Install dependencies
pnpm install

# Run development server (starts both app and studio)
pnpm dev
```

- Visit http://localhost:3000 for the website
- Visit http://localhost:3333 for Sanity Studio
- Test all pages: Home, Services, Team, About, Gallery, Contact, Blog, Testimonials
- Test responsive design on mobile
- Test contact form submission

## 6. Deploy to Vercel

### Option A: Using Git (Recommended)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial CareCare website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/carecare.git
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to https://vercel.com/import
   - Connect your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **Add Environment Variables**:
   - In Vercel Dashboard → Settings → Environment Variables
   - Add:
     ```
     NEXT_PUBLIC_SANITY_PROJECT_ID = your_project_id
     NEXT_PUBLIC_SANITY_DATASET = production
     ```

4. **Redeploy** after adding environment variables

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Follow prompts to add environment variables
```

## 7. Deploy Sanity Studio (Optional)

To make Studio accessible online:

```bash
cd studio
pnpm exec sanity deploy
```

Your studio will be available at: `https://your-project-name.sanity.studio`

## 8. Set Up Custom Domain

### In Vercel Dashboard:
1. Go to Project Settings → Domains
2. Add your custom domain (e.g., carecare.com)
3. Update DNS records (follow Vercel instructions)
4. Wait for DNS propagation (15 min - 24 hours)

### SSL/HTTPS:
- Vercel automatically provides SSL certificates
- No additional setup needed

## 9. Post-Deployment Checklist

- [ ] Visit your deployed site on desktop
- [ ] Test on mobile devices
- [ ] Test contact form (check Sanity for submissions)
- [ ] Test all navigation links
- [ ] Check page load speed (Lighthouse)
- [ ] Verify images are displaying correctly
- [ ] Test on different browsers (Chrome, Safari, Firefox)
- [ ] Check SEO (meta titles, descriptions)
- [ ] Update social media links
- [ ] Set up analytics (optional)

## 10. Ongoing Maintenance

### Regular Updates:
- Update services as needed in Sanity
- Add new blog posts regularly
- Keep testimonials current
- Update team information
- Refresh gallery images

### Monitoring:
- Monitor form submissions in Sanity
- Check Vercel analytics
- Review error logs
- Update content based on seasons/events

### Backups:
- Sanity automatically backs up your data
- Download exports periodically
- Keep git commits regular

## Troubleshooting

### Content not updating on site
1. Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)
2. Wait 60 seconds for ISR revalidation
3. Check Sanity publish status
4. Verify environment variables in Vercel

### Images not loading
1. Check image is uploaded to Sanity (not URL)
2. Verify image permissions are public
3. Check image format is supported

### Contact form not working
1. Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is set
2. Check Sanity project allows document creation
3. Check browser console for errors
4. Look for submissions in Sanity dashboard

### Site not deploying
1. Check build logs in Vercel
2. Verify all environment variables are set
3. Ensure no TypeScript errors locally
4. Check Dependencies are installed correctly

## Performance Optimization

The site is already optimized with:
- ✅ Image optimization via Sanity
- ✅ ISR caching (1-hour revalidation)
- ✅ Code splitting
- ✅ CSS-in-JS with Tailwind
- ✅ Lazy loading components

## Security

- ✅ No sensitive data exposed
- ✅ Environment variables for all secrets
- ✅ HTTPS/SSL enabled on Vercel
- ✅ XSS protection via React
- ✅ CSRF protection via Next.js

## Support & Resources

- **Sanity Documentation**: https://www.sanity.io/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Vercel Documentation**: https://vercel.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com/

## Next Steps

1. Customize all content in Sanity
2. Update branding and colors
3. Add professional photos
4. Deploy to Vercel with custom domain
5. Set up analytics
6. Monitor and improve based on user feedback

---

**Project created**: 2024  
**Last updated**: 2024  
**Technology Stack**: Next.js 16, React 19, Sanity 3, Tailwind CSS, TypeScript
