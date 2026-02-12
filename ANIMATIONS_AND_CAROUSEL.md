# Animations & Image Carousel Guide

## Overview

Your care home website now features smooth animations throughout and a real-time image carousel for dynamic content presentation. All animations are performance-optimized and built with Tailwind CSS.

---

## What's New

### 1. Smooth Animations System

A complete animation library has been added to `app/globals.css` with the following effects:

#### Available Animations

| Animation | Class | Usage |
|-----------|-------|-------|
| Fade In Up | `.animate-fade-in-up` | Elements fade in while sliding up (6 sections, 0.6s) |
| Fade In | `.animate-fade-in` | Simple fade effect (6 sections, 0.6s) |
| Slide In Left | `.animate-slide-in-left` | Element slides in from left (6 sections, 0.6s) |
| Slide In Right | `.animate-slide-in-right` | Element slides in from right (6 sections, 0.6s) |
| Scale In | `.animate-scale-in` | Element scales up while fading (5 sections, 0.5s) |
| Pulse Slow | `.animate-pulse-slow` | Gentle pulsing effect (infinite, 3s cycle) |

#### Transition Classes

| Class | Effect |
|-------|--------|
| `.transition-smooth` | 300ms all property transitions |
| `.transition-smooth-slow` | 500ms all property transitions |

#### Stagger Animation

The `.stagger` class creates cascading animations on child elements with increasing delays (0.1s to 0.6s):

```html
<div className="stagger">
  <div>Item 1 - animates at 0.1s</div>
  <div>Item 2 - animates at 0.2s</div>
  <div>Item 3 - animates at 0.3s</div>
</div>
```

---

### 2. Real-Time Image Carousel

A powerful `ImageCarousel` component has been created for dynamic image sliding.

#### Features

✓ **Auto-sliding** - Images automatically rotate at specified intervals  
✓ **Manual controls** - Previous/Next buttons to navigate  
✓ **Dot indicators** - Click to jump to specific slide  
✓ **Slide counter** - Shows current position (e.g., "3 / 12")  
✓ **Smooth transitions** - 700ms fade transitions between slides  
✓ **Pause on hover** - Auto-slide pauses when user hovers  
✓ **Responsive** - Adapts to all screen sizes  

#### Usage

```tsx
import ImageCarousel from '@/components/ImageCarousel'

<ImageCarousel
  images={galleryImages}
  autoSlide={true}
  slideInterval={5000}  // 5 seconds
  title="Featured Images"
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | `Image[]` | Required | Array of image objects with optional captions |
| `autoSlide` | `boolean` | `true` | Enable automatic sliding |
| `slideInterval` | `number` | `4000` | Milliseconds between slides |
| `title` | `string` | - | Optional section title |

---

### 3. Where Animations Are Applied

#### Navigation
- Smooth hover transitions on links
- Scale animations on buttons

#### Hero Section
- Fade in up on main heading and subtitle
- Slide in right for hero image
- Scale transitions on hover
- Staggered animations for trust indicators (25+, 500+, 24/7)

#### Features Section
- Fade in up on section title
- Scale in for each feature card (staggered)
- Slow pulse effect on checkmarks
- Hover scale and lift effect

#### Services Section
- Fade in up on section title
- Scale in for service cards (staggered)
- Hover animations with scale and shadow
- Icon scale on hover

#### Gallery Page
- Fade in up on gallery title
- Image carousel with smooth transitions
- Scale in for gallery grid items (staggered)
- Hover effects on gallery items

#### CTA Section
- Fade in up on call-to-action content
- Button scale animation on hover

#### Home Page
- Slide in left for introduction text
- Slide in right for introduction image
- All section transitions smooth and coordinated

---

## Customizing Animations

### Adjust Animation Duration

Edit `app/globals.css` keyframe definitions:

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);  /* Change from 20px to 30px for more movement */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;  /* Change 0.6s to 1s for slower animation */
}
```

### Add Animation to Elements

```html
<!-- Basic animation -->
<h1 className="animate-fade-in-up">Hello World</h1>

<!-- With custom delay (for non-stagger situations) -->
<div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
  Content with 0.2s delay
</div>

<!-- Hover effects combined -->
<button className="transition-smooth hover:scale-110 hover:shadow-lg">
  Hover me
</button>

<!-- Stagger effect on multiple items -->
<div className="stagger">
  <card>Item 1</card>
  <card>Item 2</card>
  <card>Item 3</card>
</div>
```

---

## Gallery Carousel Example

The gallery page now includes a real-time carousel:

```tsx
<ImageCarousel
  images={gallery.images}
  autoSlide={true}
  slideInterval={5000}
  title="Featured Images"
/>
```

**Features:**
- Images automatically rotate every 5 seconds
- Click navigation buttons to manually control
- Click dots at bottom to jump to specific slide
- Slide counter shows progress
- Pauses auto-slide on hover
- Smooth 700ms fade transitions

---

## Performance Notes

✓ All animations use CSS transforms (GPU-accelerated)  
✓ No JavaScript animation calculations (smooth 60fps)  
✓ Keyframes are optimized for mobile  
✓ Animations respect `prefers-reduced-motion` (when implemented)  
✓ Carousel uses React hooks efficiently  

---

## Team Page Status

The Team Members page has been **disabled** in the navigation:

```tsx
// components/Navigation.tsx
const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  // { href: '/team', label: 'Team' }, // Disabled for future use
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
]
```

**To re-enable later:**
- Uncomment the team link in `components/Navigation.tsx`
- Add team member content to Sanity CMS
- The `/app/team/page.tsx` file is already created and ready

---

## Browser Support

All animations use standard CSS and are supported in:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

---

## Next Steps

1. **Add Images to Sanity** - Upload images to gallery collections
2. **Test Animations** - Preview animations in different browsers
3. **Customize** - Adjust timing and effects in `app/globals.css`
4. **Deploy** - All animations are production-ready

---

## Need Help?

Refer to the main README.md for Sanity integration and general setup questions.
