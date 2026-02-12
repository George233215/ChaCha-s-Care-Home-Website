# Animation & Carousel Quick Reference

## Animation Classes - Quick Lookup

### Direct Animation Classes

```tsx
// Fade In Up (0.6s) - Most common, elements fade while moving up
<div className="animate-fade-in-up">Content</div>

// Fade In (0.6s) - Simple opacity animation
<div className="animate-fade-in">Content</div>

// Slide In Left (0.6s) - Slides in from left with fade
<div className="animate-slide-in-left">Content</div>

// Slide In Right (0.6s) - Slides in from right with fade
<div className="animate-slide-in-right">Content</div>

// Scale In (0.5s) - Scales up from 95% while fading
<div className="animate-scale-in">Content</div>

// Pulse Slow (infinite) - Gentle pulsing effect
<div className="animate-pulse-slow">Content</div>
```

### Transition Classes

```tsx
// Smooth transitions (300ms duration)
<button className="transition-smooth hover:bg-blue-500">
  Hover me
</button>

// Smooth slow transitions (500ms duration)
<div className="transition-smooth-slow hover:scale-110">
  Hover me for slower effect
</div>
```

### Stagger Animation (Cascading)

```tsx
// Children animate with increasing delays (0.1s - 0.6s)
<div className="stagger">
  <div className="animate-fade-in-up">Item 1 - 0.1s delay</div>
  <div className="animate-fade-in-up">Item 2 - 0.2s delay</div>
  <div className="animate-fade-in-up">Item 3 - 0.3s delay</div>
</div>
```

---

## Image Carousel Component

### Basic Usage

```tsx
import ImageCarousel from '@/components/ImageCarousel'

// Minimal setup
<ImageCarousel images={galleryImages} />

// Full configuration
<ImageCarousel
  images={galleryImages}
  autoSlide={true}
  slideInterval={5000}
  title="Featured Gallery"
/>
```

### Gallery Images Format

```tsx
interface Image {
  caption?: string
  _key?: string
}

// Example data
const images = [
  { caption: 'Main Dining Area', _key: 'img-1' },
  { caption: 'Recreation Room', _key: 'img-2' },
  { caption: 'Patient Rooms', _key: 'img-3' },
]
```

### Carousel Features at a Glance

| Feature | How to Use |
|---------|-----------|
| Auto-slide | Set `autoSlide={true}`, adjust `slideInterval` (ms) |
| Manual prev | Carousel has built-in Previous button |
| Manual next | Carousel has built-in Next button |
| Jump to slide | Click dot indicator at bottom |
| View position | Slide counter (top-right) shows "3 / 10" |
| Pause on hover | Automatically pauses auto-slide |
| Resume on leave | Auto-slide resumes after mouse leaves |

---

## Real-World Examples

### Hero Section with Animations

```tsx
// Already implemented - shows all animation types
<section className="py-20 bg-background">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
    {/* Left: Fades up from bottom */}
    <div className="animate-fade-in-up">
      <h1 className="text-4xl font-bold">Hero Title</h1>
      <p>Subtitle text fades in after</p>
    </div>
    
    {/* Right: Slides in from right */}
    <div className="animate-slide-in-right">
      <img src="hero.jpg" alt="Hero" />
    </div>
  </div>
</section>
```

### Feature Cards with Stagger

```tsx
// Already implemented - creates cascading effect
<div className="stagger">
  {features.map((feature) => (
    <Card key={feature.id} className="animate-scale-in">
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
    </Card>
  ))}
</div>
```

### Gallery with Carousel

```tsx
// Already implemented in gallery page
<section className="py-20">
  {/* Auto-rotating carousel */}
  <ImageCarousel
    images={gallery.images}
    autoSlide={true}
    slideInterval={5000}
    title="Featured Images"
  />
  
  {/* Static grid below */}
  <div className="grid grid-cols-3 gap-4 mt-12 stagger">
    {gallery.images.map((img) => (
      <div key={img._key} className="animate-scale-in">
        {/* Image preview */}
      </div>
    ))}
  </div>
</section>
```

---

## Common Animation Combinations

### Hover Effect (Button)
```tsx
<button className="transition-smooth hover:scale-105 hover:shadow-lg">
  Click me
</button>
```

### Scale on Hover (Card)
```tsx
<Card className="transition-smooth-slow hover:scale-105 hover:-translate-y-1">
  Content
</Card>
```

### Fade In with Icon Animation
```tsx
<div className="animate-fade-in-up">
  <div className="w-12 h-12 animate-pulse-slow">✓</div>
  <h3>Title</h3>
</div>
```

### Image Slide In with Shadow
```tsx
<div className="animate-slide-in-right hover:shadow-lg transition-smooth-slow">
  <img src="image.jpg" alt="desc" />
</div>
```

---

## Animation Timing Reference

| Animation | Duration | Delay Options | Best For |
|-----------|----------|---|----------|
| fadeInUp | 0.6s | 0.1s - 0.6s stagger | Headings, cards, sections |
| fadeIn | 0.6s | Manual via style | Subtle entries |
| slideInLeft | 0.6s | 0.1s - 0.6s stagger | Text content |
| slideInRight | 0.6s | 0.1s - 0.6s stagger | Images |
| scaleIn | 0.5s | 0.1s - 0.6s stagger | Cards, icons |
| pulseSlow | 3s infinite | N/A | Attention-grabbing icons |

---

## Customization Guide

### Change All Animation Speed

Edit `app/globals.css`:

```css
/* Slow down all animations by changing 0.6s to 1s */
.animate-fade-in-up {
  animation: fadeInUp 1s ease-out;  /* Was 0.6s */
}

.animate-slide-in-left {
  animation: slideInLeft 1s ease-out;  /* Was 0.6s */
}

.animate-slide-in-right {
  animation: slideInRight 1s ease-out;  /* Was 0.6s */
}

.animate-scale-in {
  animation: scaleIn 0.8s ease-out;  /* Was 0.5s */
}
```

### Change Transition Speed

```css
/* Make hover effects slower (300ms → 500ms) */
.transition-smooth {
  @apply transition-all duration-500 ease-out;  /* Was duration-300 */
}
```

### Add Custom Delay to Stagger

```html
<div className="stagger">
  <div className="animate-fade-in-up" style={{ animationDelay: '0s' }}>
    Item 1
  </div>
  <div className="animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
    Item 2
  </div>
</div>
```

---

## Carousel Customization

### Slow Down Carousel
```tsx
<ImageCarousel
  images={images}
  autoSlide={true}
  slideInterval={8000}  // Changed from 5000ms (8 seconds)
  title="Gallery"
/>
```

### Disable Auto-Slide (Manual Only)
```tsx
<ImageCarousel
  images={images}
  autoSlide={false}  // Manual navigation only
  title="Gallery"
/>
```

### No Title
```tsx
<ImageCarousel
  images={images}
  autoSlide={true}
  slideInterval={5000}
  // title prop omitted
/>
```

---

## Accessibility Notes

✓ All animations use `transition` and `animation` properties (CSS-based)  
✓ Respects `prefers-reduced-motion` media query (can be implemented)  
✓ Carousel has keyboard labels (aria-label on buttons)  
✓ No animations block user interaction  
✓ Carousel pause on hover helps users read  

---

## Performance Tips

1. **Don't over-animate** - Use animations sparingly for impact
2. **Stagger effects** - Cascade animations instead of all at once
3. **Appropriate durations** - 0.3s - 0.6s feels responsive, >1s feels slow
4. **Hover sparingly** - Not every element needs hover animation
5. **Test on mobile** - Ensure animations are smooth on low-end devices

---

## Troubleshooting

### Animations too fast?
→ Increase duration: `0.6s` → `1s`

### Carousel not auto-sliding?
→ Check `autoSlide={true}` is set

### Stagger effect not working?
→ Parent must have `className="stagger"`
→ Children must have animation class

### Animation stuttering?
→ Check no conflicting CSS
→ Ensure using `transform` not `position` for movement

### Carousel paused permanently?
→ Mouse might still be hovering
→ Check `handleMouseLeave` is firing

---

## Where Animations Are Used

```
Homepage
├── Hero Section: slide-in-right (image) + fade-in-up (text)
├── Features: scale-in (staggered) with pulse on icons
└── Services: scale-in (staggered) with hover effects

Gallery Page
├── Carousel: smooth fade transitions (700ms)
├── Grid: scale-in (staggered)
└── Hover: scale-105 + shadow

Services Page
├── Cards: scale-in (staggered)
└── Hover: scale + lift effect

About Page
├── Content: fade-in-up
└── Images: slide-in

Contact Page
├── Form: fade-in-up
└── Inputs: smooth transitions

Navigation
└── Links: smooth hover transitions
```

---

## Quick Copy-Paste Snippets

### Fade In Hero Section
```tsx
<section className="animate-fade-in-up">
  <h1>Title</h1>
</section>
```

### Hover Scale Card
```tsx
<div className="transition-smooth hover:scale-105">
  Card content
</div>
```

### Staggered List
```tsx
<ul className="stagger">
  {items.map(item => (
    <li key={item.id} className="animate-scale-in">{item}</li>
  ))}
</ul>
```

### Carousel
```tsx
<ImageCarousel
  images={images}
  autoSlide={true}
  slideInterval={5000}
/>
```

---

## Still Need Help?

- **General questions** → See README.md
- **Sanity setup** → See SANITY_SETUP.md
- **All animations** → See ANIMATIONS_AND_CAROUSEL.md
- **Implementation** → See IMPLEMENTATION_CHECKLIST.md
