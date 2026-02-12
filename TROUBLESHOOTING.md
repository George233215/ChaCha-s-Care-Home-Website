# Troubleshooting Guide - CareCare Website

## Common Issues & Solutions

---

## Setup Issues

### Error: "NEXT_PUBLIC_SANITY_PROJECT_ID is not set"

**Problem**: Site won't load, showing error about missing Sanity project ID.

**Solutions**:
1. **Check `.env.local` exists** in project root:
   ```bash
   cat .env.local
   ```
   
2. **If missing, create it**:
   ```bash
   echo 'NEXT_PUBLIC_SANITY_PROJECT_ID=your_id_here' > .env.local
   echo 'NEXT_PUBLIC_SANITY_DATASET=production' >> .env.local
   ```

3. **Verify the value** is your actual Project ID (not "your_id_here")
   - Get it from https://manage.sanity.io/

4. **Restart development server**:
   ```bash
   # Stop current server (Ctrl+C)
   # Then restart
   pnpm dev
   ```

5. **Clear Next.js cache**:
   ```bash
   rm -rf .next
   pnpm dev
   ```

---

### Error: "Cannot find module 'sanity'"

**Problem**: npm/pnpm can't find Sanity package.

**Solutions**:
1. **Reinstall dependencies**:
   ```bash
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   ```

2. **Install in studio folder**:
   ```bash
   cd studio
   pnpm install
   cd ..
   ```

3. **Check package.json** has Sanity dependencies:
   - Should have `"next-sanity": "^11.0.0"`
   - Should have `"@sanity/client": "^6.20.0"`

---

### Error: "Port 3000 already in use"

**Problem**: Can't start dev server, port 3000 is taken.

**Solutions**:
1. **Kill process on port 3000**:
   ```bash
   # macOS/Linux
   lsof -ti:3000 | xargs kill -9
   
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```

2. **Use different port**:
   ```bash
   pnpm dev -- -p 3001
   ```

3. **Check for other processes**:
   ```bash
   ps aux | grep node
   ```

---

## Development Issues

### Sanity Studio won't load at http://localhost:3333

**Problem**: Blank page or error at http://localhost:3333

**Solutions**:
1. **Check studio is running**:
   ```bash
   # You should see output about studio running
   pnpm dev
   ```

2. **Verify you're using correct URL**:
   - Should be `http://localhost:3333`
   - Not `http://localhost:3000`

3. **Clear browser cache**:
   - Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
   - Or clear cookies for localhost

4. **Check studio has correct config**:
   - Open `studio/sanity.config.js`
   - Verify Project ID is set correctly

5. **Reinstall studio dependencies**:
   ```bash
   cd studio
   rm -rf node_modules
   pnpm install
   cd ..
   pnpm dev
   ```

---

### Website not showing updated content from Sanity

**Problem**: Made changes in Sanity, but website still shows old content.

**Solutions**:
1. **Verify content is published** (not just drafted)
   - In Sanity, check document status
   - Should say "Published" not "Draft"

2. **Hard refresh website**:
   - `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
   - Clear all cache

3. **Wait for ISR revalidation**:
   - ISR updates every hour
   - Can wait or rebuild manually

4. **Check Sanity connection**:
   - Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
   - Check dataset is "production"

5. **Rebuild the site**:
   ```bash
   rm -rf .next
   pnpm dev
   ```

---

### Images not showing on website

**Problem**: Images have broken image icon or blank space.

**Solutions**:
1. **Verify image uploaded to Sanity**:
   - Don't use external URLs
   - Must be uploaded directly to Sanity
   - Check file isn't corrupted

2. **Check image format**:
   - Supported: JPG, PNG, WebP, GIF
   - Not supported: BMP, TIFF

3. **Check image dimensions**:
   - Minimum 100x100 pixels
   - No maximum, but very large files slow down site

4. **Verify image object has image field**:
   ```sanity
   // Should have:
   image: {
     type: 'image',
     options: { hotspot: true }
   }
   ```

5. **Test Sanity connection**:
   - Images load from Sanity's CDN
   - Check your internet connection
   - Verify Sanity service is online

---

### Contact form not working

**Problem**: Form submits but nothing happens or shows error.

**Solutions**:
1. **Check browser console** for errors:
   - Open DevTools: F12 or Cmd+Option+I
   - Check Console tab for red errors

2. **Verify API route exists**:
   - Should be `app/api/contact/route.ts`
   - Check file exists and has correct code

3. **Check form submission**:
   ```bash
   # Look for POST to /api/contact in Network tab
   # Response should be successful
   ```

4. **Verify Sanity permissions**:
   - Your Sanity project must allow document creation
   - Check dataset isn't read-only

5. **Check environment variables**:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` must be set
   - Verify it's your actual Project ID

6. **Restart dev server**:
   ```bash
   # Stop with Ctrl+C
   pnpm dev
   ```

---

### TypeScript errors in editor

**Problem**: Red squiggly lines in VS Code or type errors.

**Solutions**:
1. **Reload TypeScript**:
   - In VS Code: Cmd+Shift+P → "TypeScript: Reload Projects"

2. **Reinstall types**:
   ```bash
   pnpm install
   ```

3. **Check tsconfig.json**:
   - Should be in project root
   - Should have correct paths

4. **Clear .next folder**:
   ```bash
   rm -rf .next
   pnpm dev
   ```

---

## Deployment Issues

### Deployment fails on Vercel

**Problem**: Deploy to Vercel fails with error.

**Solutions**:
1. **Check build logs**:
   - In Vercel dashboard → Deployments → Failed deployment
   - Look for error message
   - Usually TypeScript or missing dependency error

2. **Verify environment variables**:
   - Must have `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - Must have `NEXT_PUBLIC_SANITY_DATASET`
   - No extra spaces or quotes

3. **Test build locally**:
   ```bash
   pnpm build
   ```
   - Fix any errors before deploying

4. **Check Node version**:
   - Must be 18+
   - In Vercel: Settings → Node.js Version

5. **Clear Vercel cache**:
   - In Vercel dashboard: Settings → Git
   - Clear cache and redeploy

---

### Site shows "404 - Not Found" after deployment

**Problem**: Deployed to Vercel but getting 404 errors.

**Solutions**:
1. **Check deployment completed**:
   - In Vercel dashboard, should show "Ready"
   - Not "Building" or "Error"

2. **Wait for full deployment**:
   - First deploy takes 1-2 minutes
   - Subsequent deploys faster

3. **Check correct URL**:
   - Should be `https://your-project.vercel.app`
   - Or your custom domain

4. **Verify environment variables set**:
   - In Vercel: Settings → Environment Variables
   - Should have both Sanity variables
   - Redeploy after adding

5. **Check app structure**:
   - `app/page.tsx` should exist (home page)
   - Pages should be in `app/[name]/page.tsx`

---

### Environment variables not working in production

**Problem**: Site works locally but breaks on Vercel.

**Solutions**:
1. **Verify variables are set in Vercel**:
   - Go to Project Settings → Environment Variables
   - Should see both variables listed

2. **Check variable names**:
   - Must start with `NEXT_PUBLIC_` to be visible in frontend
   - Name must be exact (case-sensitive)

3. **Redeploy after adding variables**:
   ```bash
   # Variables added to Vercel require redeployment
   # Go to Deployments → Redeploy
   ```

4. **Wait a minute**:
   - Sometimes takes time to propagate
   - Hard refresh browser after redeploy

5. **Check .env.local not committed**:
   - `.env.local` should NOT be in git
   - Add to `.gitignore` if not already

---

### Custom domain not working

**Problem**: Custom domain not connecting to Vercel site.

**Solutions**:
1. **Check domain configuration**:
   - In Vercel: Settings → Domains
   - Should show your custom domain
   - Should show "Valid Configuration"

2. **Check DNS records**:
   - Vercel provides DNS records
   - Update them in your domain registrar
   - Wait for DNS propagation (up to 24 hours)

3. **Check domain is configured correctly**:
   - A record: `76.76.19.165`
   - CNAME: `cname.vercel.com`
   - Check with your registrar

4. **Verify SSL certificate**:
   - Should auto-generate
   - In Vercel: Settings → Domains
   - Should show "Valid SSL Certificate"

5. **Test with nslookup**:
   ```bash
   nslookup yourdomain.com
   # Should resolve to Vercel IP
   ```

---

## Content Issues

### Can't log into Sanity Studio

**Problem**: Can't access http://localhost:3333 or can't log in.

**Solutions**:
1. **Check you're logged in to Sanity**:
   - Visit https://www.sanity.io/
   - Log in with your account
   - Go back to studio

2. **Check Project ID**:
   - Make sure `sanity.config.js` has correct Project ID
   - Get from https://manage.sanity.io/

3. **Clear browser cookies**:
   - Open DevTools → Application → Cookies
   - Delete cookies for localhost:3333
   - Refresh page

4. **Verify user has access**:
   - In Sanity Manage → Members
   - Your user should be listed
   - Should have "Editor" or higher role

---

### Contact submissions not appearing in Sanity

**Problem**: Form submits but contact entries don't appear.

**Solutions**:
1. **Check Contact schema exists**:
   - In Sanity Manage → Settings → Schemas
   - Should see "Contact" in list
   - Click to verify it's enabled

2. **Check form validation**:
   - All required fields must be filled
   - Email must be valid format
   - Check browser console for errors

3. **Verify API route working**:
   - Test form submission
   - Open browser DevTools → Network
   - POST to /api/contact should return 201
   - Check response shows data

4. **Check Sanity project permissions**:
   - Project must allow creating documents
   - Check in Sanity Manage → Settings → API

5. **Wait a moment**:
   - Sometimes takes 5-10 seconds to appear
   - Refresh Sanity Studio to see new entries

---

### Content shows as "Draft" instead of "Published"

**Problem**: Content created but shows as draft, not live.

**Solutions**:
1. **Publish the document**:
   - In Sanity, click blue "Publish" button
   - Not gray "Save" button

2. **Check workflow status**:
   - Should change from "Draft" to "Published"
   - Take screenshot to confirm

3. **Hard refresh website**:
   - Clear cache and reload
   - Verify published content appears

4. **Check dataset**:
   - Make sure editing in "production" dataset
   - Not "development" or other dataset

---

## Performance Issues

### Website loading slowly

**Problem**: Pages take too long to load.

**Solutions**:
1. **Check internet connection**:
   - Fast connection needed for development
   - Test with https://speedtest.net/

2. **Check large images**:
   - Images should be <1MB each
   - Sanity auto-optimizes, but test anyway
   - Compress before uploading

3. **Clear cache**:
   ```bash
   rm -rf .next
   pnpm dev
   ```

4. **Check Sanity API**:
   - Sanity service might be slow
   - Check status at https://www.sanity.io/

5. **Check local resources**:
   - Other apps taking CPU/RAM?
   - Close unnecessary applications

---

### Build taking too long

**Problem**: Build process (`pnpm build`) takes too long.

**Solutions**:
1. **Check for large dependencies**:
   ```bash
   pnpm ls
   ```
   - Look for unusually large packages
   - Consider removing if not needed

2. **Clear build cache**:
   ```bash
   rm -rf .next
   rm -rf node_modules
   pnpm install
   pnpm build
   ```

3. **Check for TypeScript errors**:
   - These slow down build
   - Look for red lines in editor
   - Fix all TypeScript issues

4. **Check system resources**:
   - Free up disk space
   - Close other applications
   - Ensure good RAM available

---

## Browser Compatibility

### Site doesn't work in old browser

**Problem**: Site broken in older versions of Chrome/Safari/Firefox.

**Note**: This site requires a modern browser (within last 2 years).

**Solutions**:
1. **Update browser**:
   - This site uses modern JavaScript features
   - Update to latest version

2. **For actual targeting of older browsers**:
   - Would need to modify build config
   - Not recommended for modern care home site
   - Contact support for legacy browser needs

---

## Getting Help

### When troubleshooting doesn't work

1. **Check the documentation files**:
   - `README.md` - Technical details
   - `SANITY_SETUP.md` - CMS configuration
   - `INTEGRATION_GUIDE.md` - Pre-launch checklist

2. **Search online**:
   - Error message in Google
   - Check Sanity docs: https://www.sanity.io/docs
   - Check Next.js docs: https://nextjs.org/docs

3. **Check GitHub issues**:
   - Search GitHub for similar issues
   - Look in package repos

4. **Verify basics again**:
   - Environment variables set correctly
   - All dependencies installed
   - No typos in configuration
   - Using correct URLs/ports

---

## Quick Fix Checklist

When something breaks:

- [ ] Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)
- [ ] Check `.env.local` has correct credentials
- [ ] Restart dev server (`pnpm dev`)
- [ ] Clear build cache (`rm -rf .next`)
- [ ] Reinstall dependencies (`pnpm install`)
- [ ] Check error message in console
- [ ] Search error message online
- [ ] Review relevant documentation
- [ ] Verify Sanity project is active
- [ ] Test individual components

---

## Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| "Cannot find module 'sanity'" | Sanity not installed | `pnpm install` |
| "ENOENT: no such file or directory" | File missing | Check file paths, install deps |
| "Port 3000 in use" | Another app using port | Kill process or use different port |
| "NEXT_PUBLIC_SANITY_PROJECT_ID not set" | Missing env var | Create `.env.local` |
| "Connection refused" | Sanity API unreachable | Check internet, verify credentials |
| "401 Unauthorized" | Invalid Sanity credentials | Verify Project ID is correct |
| "503 Service Unavailable" | Sanity down or overloaded | Wait and retry |
| "CORS error" | Cross-origin request blocked | Check Sanity CORS settings |

---

## Still Having Issues?

1. Read through this guide completely
2. Check the main README.md
3. Review documentation in SANITY_SETUP.md
4. Search error message online
5. Check Sanity and Next.js official documentation
6. If still stuck, reach out to project creator

---

Last updated: February 2024  
Project: CareCare Website  
Version: 1.0.0
