# Scroll Reveal & Interactive Animations Guide

## Overview

Your website now features sophisticated scroll-reveal animations that trigger when sections come into view. Combined with smooth transitions and hover effects, this creates a professional, engaging user experience.

## New Features Added

### 1. Scroll Reveal Hook (`useScrollReveal`)
A React hook that uses Intersection Observer to trigger animations when elements enter the viewport.

**Location:** `/hooks/useScrollReveal.ts`

**Usage:**
```tsx
'use client'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function MyComponent() {
  const ref = useScrollReveal({
    threshold: 0.2,
    margin: '0px 0px -100px 0px',
    once: true
  })

  return (
    <div ref={ref} className="scroll-reveal-up">
      Content here
    </div>
  )
}
```

**Options:**
- `threshold` (0-1): How much of the element must be visible (default: 0.1)
- `margin`: Intersection observer rootMargin for triggering earlier/later
- `once` (boolean): Trigger animation only once (default: true)

### 2. Scroll Reveal Animation Classes

#### Available Classes:
- `.scroll-reveal-up` - Slides up from bottom
- `.scroll-reveal-down` - Slides down from top
- `.scroll-reveal-left` - Slides from left
- `.scroll-reveal-right` - Slides from right
- `.scroll-reveal-scale` - Scales from small to full size
- `.scroll-reveal-stagger` - Staggered reveal for children

#### Animation Duration:
All scroll reveal animations: **0.8s ease-out**

### 3. New Sections on Home Page

#### Highlight Section (`components/HighlightSection.tsx`)
Shows a professional image alongside important information with scroll-triggered animations.

**Features:**
- Image/content alternating layout
- Smooth scroll reveals
- Checklist-style highlights
- Icon indicators
- Responsive design

**Usage:**
```tsx
<HighlightSection
  title="Personalized Care in a Home-Like Environment"
  subtitle="Description text..."
  highlights={[
    { title: 'Item 1', description: 'Details...' },
    { title: 'Item 2', description: 'Details...' }
  ]}
  imagePosition="right"
/>
```

#### Commitment Section (`components/CommitmentSection.tsx`)
Showcases your care home's core values with icon-based cards.

**Features:**
- 4-column responsive grid
- Icon indicators (Lucide icons)
- Scale-in animations on scroll
- Hover effects with border transitions
- Professional styling

#### Stats Section (`components/StatsSection.tsx`)
Displays impressive statistics with animated numbers and gradient effects.

**Features:**
- Gradient text for numbers
- Scroll-triggered scale animations
- Dark background (primary color)
- Decorative background blobs
- Mobile responsive layout

### 4. CSS Animations Added

**New Keyframes:**
- `@keyframes scrollRevealUp` - Up animation
- `@keyframes scrollRevealDown` - Down animation
- `@keyframes scrollRevealLeft` - Left animation
- `@keyframes scrollRevealRight` - Right animation
- `@keyframes scrollRevealScale` - Scale animation

**Staggered Reveals:**
Children of `.scroll-reveal-stagger` animate with cascading delays (0.1s, 0.2s, 0.3s, etc.)

## Home Page Flow

Your home page now features:

1. **Hero Section** - Immediate impact with call-to-action
2. **Highlight Section** - Engaging image + content reveal
3. **Commitment Section** - 4 value propositions
4. **Features Section** - Why choose you (scroll reveals each card)
5. **Stats Section** - Build credibility with numbers
6. **Services Preview** - Top 3 services
7. **CTA Section** - Final call to action

## Customization

### Changing Animation Triggers

Adjust when animations trigger by modifying the `useScrollReveal` options:

```tsx
// Trigger earlier (at 50% visibility, with 200px margin)
const ref = useScrollReveal({
  threshold: 0.5,
  margin: '0px 0px -200px 0px'
})

// Trigger very late (at 100% visibility)
const ref = useScrollReveal({
  threshold: 1,
  margin: '0px 0px 0px 0px'
})
```

### Changing Animation Duration

Edit `globals.css` to adjust animation timing:

```css
.scroll-reveal-active.scroll-reveal-up {
  animation: scrollRevealUp 1.2s ease-out forwards; /* Change 0.8s to 1.2s */
}
```

### Disabling Animations (Once)

To allow animations to replay when scrolling:

```tsx
const ref = useScrollReveal({
  once: false // Animation replays every time section enters viewport
})
```

## Performance Tips

1. **Use `once: true`** - Prevents unnecessary re-animations
2. **Adjust `threshold`** - Lower values trigger sooner, use sparingly on slow devices
3. **Limit per page** - Use 5-10 scroll reveals per page maximum
4. **Test on mobile** - Animations use GPU acceleration but test on real devices

## Browser Support

Scroll reveal animations use:
- **Intersection Observer API** - Chrome 51+, Firefox 55+, Safari 12.1+
- **CSS Transforms** - All modern browsers
- **GPU acceleration** - All modern browsers

No polyfills needed for modern browsers (97%+ coverage).

## Integration with Existing Animations

Scroll reveals work alongside:
- Initial page load animations (fade-in-up, slide-in-left, etc.)
- Hover transitions (transition-smooth, transition-smooth-slow)
- Stagger animations (cascading delays)

They don't conflict because:
- Load animations use immediate timing
- Scroll reveals trigger on visibility
- Hover effects layer on top

## Troubleshooting

### Animations not triggering?
1. Check browser supports Intersection Observer
2. Verify element has `scroll-reveal-*` class
3. Ensure `useScrollReveal` hook is properly used
4. Check `useScrollReveal` is in `'use client'` component

### Animations triggered too early/late?
Adjust `threshold` and `margin` in `useScrollReveal` options.

### Animation stuttering?
- Reduce number of scroll reveals on page
- Check for CPU-intensive operations
- Use `will-change: transform` (use sparingly)

## Future Enhancements

Consider adding:
- Parallax scroll effects
- Counter animations for stats
- Progressive blur effects
- Scroll-triggered video autoplay
- Custom easing curves

## Files Reference

- **CSS:** `/app/globals.css` - All animation definitions
- **Hook:** `/hooks/useScrollReveal.ts` - Intersection observer logic
- **Components:**
  - `/components/HighlightSection.tsx`
  - `/components/CommitmentSection.tsx`
  - `/components/StatsSection.tsx`
- **Integration:** `/app/page.tsx` - Home page using all components
