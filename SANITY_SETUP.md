# Sanity CMS Setup Guide

This guide walks you through setting up your Sanity project and connecting it to the CareCare website.

## Step 1: Create a Sanity Project

1. Go to [Sanity.io](https://www.sanity.io/)
2. Click "Get Started" and sign up or log in
3. Click "Create new project"
4. Choose a project name (e.g., "carecare")
5. Select a dataset name (use "production")
6. Choose "With Structured Content" as template
7. Click "Create project"

## Step 2: Get Your Project Credentials

1. Go to [Sanity Manage](https://manage.sanity.io/)
2. Select your project
3. In the left sidebar, click "Settings"
4. Under "Project settings", find your **Project ID**
5. Copy the Project ID

## Step 3: Configure Environment Variables

1. In your project root, create a `.env.local` file
2. Add your Sanity credentials:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_copied_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

3. Save the file

## Step 4: Initialize Sanity Studio

1. Navigate to the studio folder:
```bash
cd studio
```

2. Update the `sanity.config.js` file with your Project ID (or use env variables)

3. Install dependencies:
```bash
pnpm install
```

## Step 5: Start the Development Server

From the project root, run:

```bash
pnpm dev
```

This will start:
- **Next.js app**: http://localhost:3000
- **Sanity Studio**: http://localhost:3333

## Step 6: Deploy Sanity Studio (Optional)

To deploy your Sanity Studio to the web:

```bash
cd studio
pnpm exec sanity deploy
```

Follow the prompts to complete the deployment. Your studio will be available at:
`https://YOUR_PROJECT_NAME.sanity.studio`

## Creating Initial Content

### 1. Create Home Page Data

1. In Sanity Studio, click "Create"
2. Select "Home Page"
3. Fill in:
   - Hero Title: "Compassionate Care for Your Loved Ones"
   - Hero Subtitle: Your description
   - CTA Text: "Schedule a Visit"
   - CTA Link: "/contact"
   - Background Image: Upload an image
4. Click "Publish"

### 2. Add Services

1. Click "Create" → "Service"
2. Add multiple services with:
   - Title (e.g., "24/7 Healthcare")
   - Description
   - Features list
   - Order (for display sequence)
3. Publish each service

### 3. Add Team Members

1. Click "Create" → "Team Member"
2. Add staff information:
   - Full name and position
   - Biography
   - Photo
   - Contact info
   - Experience years
3. Publish

### 4. Add Testimonials

1. Click "Create" → "Testimonial"
2. Add client feedback:
   - Client name and relationship
   - Testimonial text
   - Rating (1-5 stars)
   - Photo
   - Mark as "Featured" if important
3. Publish

### 5. Add Gallery Images

1. Click "Create" → "Gallery"
2. Add image collection:
   - Title and category
   - Multiple images with captions
3. Publish

### 6. Create Blog Posts

1. Click "Create" → "Blog Post"
2. Add content:
   - Title and slug
   - Excerpt
   - Full content (rich text)
   - Author and category
   - Featured image
3. Publish

## API Token (For Backend Operations)

If you need to write to Sanity from your API routes:

1. Go to [Sanity Manage](https://manage.sanity.io/)
2. Select your project → Settings → API
3. Click "Add new token"
4. Name it "Next.js App"
5. Grant "Editor" permissions
6. Copy the token
7. Add to `.env.local`:

```env
SANITY_API_TOKEN=your_copied_token
```

## Connecting Images

The app uses Sanity's Image URL builder. When you upload images in the CMS:

1. They're automatically optimized
2. Images are served through Sanity's CDN
3. The app handles responsive sizing automatically

## Troubleshooting

### Project ID not found
- Make sure you've copied the correct Project ID from Sanity Manage
- Check `.env.local` has no extra spaces

### Studio won't load
- Run `pnpm install` in the studio folder
- Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)
- Check you're accessing http://localhost:3333

### Content not appearing on website
- Make sure you've "Published" the content in Sanity
- Check that `NEXT_PUBLIC_SANITY_DATASET=production` matches the dataset you're publishing to
- Wait a few seconds for ISR revalidation (or hard refresh)

### Images not showing
- Make sure images are uploaded (not just linked URLs)
- Check image dimensions aren't too small
- Verify the image format is supported (JPG, PNG, WebP)

## Next Steps

1. Customize content in Sanity for your specific care home
2. Update branding in the Next.js app
3. Add more images and testimonials
4. Deploy the app to Vercel
5. Set up domain and SSL

For more help, visit:
- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
