# CareCare - Professional Senior Care Website

A modern, minimalist senior care home website built with Next.js 16, React 19, and Sanity CMS. The project follows a clean architecture with a separate studio folder structure to avoid conflicts.

## Features

- **Modern & Minimalist Design**: Clean, professional interface optimized for user experience
- **Headless CMS**: Complete Sanity CMS integration for managing all content
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Built-in metadata and structured data support
- **Performance**: Incremental Static Regeneration (ISR) for fast page loads
- **Type-Safe**: Full TypeScript support throughout the application

## Project Structure

```
project/
├── app/                          # Next.js app router
│   ├── api/                      # API routes
│   │   └── contact/              # Contact form submission
│   ├── services/                 # Services page
│   ├── team/                     # Team members page
│   ├── about/                    # About page
│   ├── contact/                  # Contact page
│   ├── gallery/                  # Gallery page
│   ├── blog/                     # Blog listing page
│   ├── testimonials/             # Testimonials page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── Navigation.tsx            # Main navigation
│   ├── Footer.tsx                # Footer component
│   ├── HeroSection.tsx           # Hero section
│   ├── FeaturesSection.tsx       # Features display
│   ├── ServicesGrid.tsx          # Services grid
│   └── ui/                       # shadcn/ui components
├── lib/
│   └── sanity.ts                 # Sanity client & queries
├── studio/                       # Separate Sanity Studio
│   ├── sanity.config.js          # Sanity configuration
│   ├── schemaTypes/              # All content schemas
│   │   ├── home.ts               # Home page schema
│   │   ├── service.ts            # Service schema
│   │   ├── teamMember.ts         # Team member schema
│   │   ├── testimonial.ts        # Testimonial schema
│   │   ├── gallery.ts            # Gallery schema
│   │   ├── blog.ts               # Blog post schema
│   │   ├── about.ts              # About page schema
│   │   ├── feature.ts            # Feature schema
│   │   └── contact.ts            # Contact submission schema
│   └── package.json              # Studio dependencies
├── public/                       # Static assets
├── package.json                  # Project dependencies
├── tsconfig.json                 # TypeScript config
├── tailwind.config.ts            # Tailwind CSS config
└── next.config.mjs               # Next.js config
```

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Sanity account and project

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_PROJECT_ID=your_project_id_here
SANITY_DATASET=production
```

### Installation

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Set up Sanity Studio** (in the `studio` folder):
   ```bash
   cd studio
   pnpm install
   ```

3. **Configure Sanity** (run once):
   ```bash
   cd studio
   pnpm exec sanity init
   ```

### Running the Project

```bash
# Development mode (runs Next.js app and Sanity Studio concurrently)
pnpm dev

# The app will be available at http://localhost:3000
# Sanity Studio will be available at http://localhost:3333
```

### Building for Production

```bash
pnpm build
```

## Content Schemas

The project includes the following Sanity content types:

### Home
- Hero section (title, subtitle, CTA)
- Introduction section with image
- Connected to Features and Services

### Service
- Title and slug
- Description and full content
- Icon and featured image
- List of features
- Display ordering

### Team Member
- Full name and position
- Biography and specialization
- Years of experience
- Contact information (email, phone)
- Professional photo
- Display ordering

### Testimonial
- Client name and relationship to care home
- Testimonial text and rating (1-5 stars)
- Client photo
- Featured flag and publish date

### Gallery
- Title and category
- Description
- Multiple images with captions
- Organized by category (facilities, activities, events, team, other)

### Blog Post
- Title and slug
- Excerpt and full content
- Author and category
- Featured image
- Tags and publication date

### About
- Mission and vision statements
- Core values list
- History/background content
- Featured image

### Feature
- Title and description
- Icon and featured image
- Full description content
- Display ordering
- Highlight flag

### Contact Submission
- Full name, email, phone
- Subject and message
- Interest category
- Submission date and status

## Customization

### Update Branding

1. **Site Name**: Edit the logo in `components/Navigation.tsx`
2. **Colors**: Modify CSS variables in `app/globals.css`
3. **Typography**: Adjust fonts in `app/layout.tsx`

### Add New Pages

1. Create a new folder in `app/` (e.g., `app/new-page/`)
2. Add `page.tsx` with your content
3. Update navigation in `components/Navigation.tsx`

### Extend Schemas

Add new schemas in `studio/schemaTypes/` and update the index file to export them.

## API Routes

### POST /api/contact
Submits contact form data to Sanity CMS.

**Request body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string (optional)",
  "subject": "string",
  "message": "string",
  "interestedIn": "general|resident|service|partnership|other"
}
```

## Performance

- **ISR**: Pages revalidate every hour using Sanity's CDN
- **Image Optimization**: Sanity Image URL builder with dynamic sizing
- **Code Splitting**: Automatic with Next.js
- **TypeScript**: Full type safety for better DX

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Deploy Sanity Studio

```bash
cd studio
pnpm exec sanity deploy
```

## Technologies Used

- **Framework**: Next.js 16 with App Router
- **React**: 19.2.3
- **Styling**: Tailwind CSS 4 with shadcn/ui
- **CMS**: Sanity 3
- **Language**: TypeScript
- **HTTP Client**: next-sanity

## Support

For issues or questions:
1. Check Sanity documentation: https://www.sanity.io/docs
2. Check Next.js documentation: https://nextjs.org/docs
3. Review the code comments in key files

## License

This project is created for CareCare senior living services.
