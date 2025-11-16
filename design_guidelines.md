# Design Guidelines: Osman Ghazi: Ottoman Rising

## Design Approach
**Reference-Based**: Assassin's Creed website aesthetic - cinematic, dark, immersive gaming experience with premium AAA quality.

## Color System
- **Primary**: Purple and blue gradients
- **Accent**: Gold for highlights, CTAs, and premium elements
- **Base**: Black/dark backgrounds (night-mode)
- **Overlays**: Gradient overlays on hero imagery for text readability

## Typography
- **Headings**: Crisp serif font for dramatic impact (titles, section headers)
- **Body**: Clean sans-serif for readability (descriptions, UI text)
- **Hierarchy**: Large cinematic titles, medium section headers, standard body text

## Layout System
- **Spacing**: Tailwind units of 4, 8, 12, 16, 24 for consistent rhythm
- **Containers**: Full-width sections with max-w-7xl content areas
- **Grid**: Feature cards in 3-column grid (desktop), stacked on mobile

## Component Library

### Navigation
- Sticky header with logo (left), nav links (center), CTAs + language toggle (right)
- Language buttons: EN, FR, AR with active state highlighting
- Smooth transitions on scroll

### Hero Section
- Full-width parallax background using hero-rider image
- Dark gradient overlay (top-to-bottom, ensuring text contrast)
- Centered content: logo image, game title, tagline
- Primary CTA buttons with blurred backgrounds: "Watch Trailer" + "Pre-order"
- Leaderboard ad placeholder beneath CTAs

### Content Sections
1. **Story**: Two-column layout - text (left) + Osman portrait (right)
2. **Features**: 3-column grid of cards with icons, titles, descriptions
3. **World**: Location cards with image placeholders and lore text
4. **Characters**: Osman hero card + companion character portraits in grid
5. **Editions**: Centered key art with 3-column edition comparison (Standard, Deluxe, Collector's) with content lists and price placeholders. Medium rectangle ad below.
6. **Media/Gallery**: Screenshot grid with modal viewer functionality
7. **Roadmap**: Horizontal timeline with milestone markers (Teaser, Beta, Launch, DLC)
8. **Community**: Social icons grid + newsletter signup form. Desktop skyscraper ad on side.
9. **FAQ**: Accordion-style expandable items
10. **Contact/Press**: Contact form + press kit download link

### Footer
- Logo, legal links, social icons, language toggle (duplicate)

## Animations
- **Scroll Reveal**: Fade-in animations as sections enter viewport
- **Parallax**: Hero image moves slower than scroll
- **Hover States**: Glow effects on cards and buttons (gold accent)
- **Ambient**: Subtle floating ember particles (CSS/canvas)
- **Smooth Scroll**: Navigation anchor links

## Multilingual System
- JavaScript object storing all text in three languages
- Dynamic text replacement without page reload
- Arabic selection adds `dir="rtl"` to HTML element and adjusts layout mirroring

## Ad Placements
- **Leaderboard** (728×90): Below hero CTAs
- **Medium Rectangle** (300×250): After Editions section
- **Skyscraper** (160×600): Desktop sidebar in Community section
- Commented AdSense script blocks ready for implementation

## Images
- **Hero**: Large hero-rider image (full-width background with parallax)
- **Logo**: Osman-logo positioned in hero and footer
- **Portrait**: Osman-portrait in Story section
- **Key Art**: Edition key art as centerpiece in Editions section
- **Placeholders**: World locations, character portraits, screenshots for gallery

## Responsive Breakpoints
- Mobile: Single column, stacked layouts
- Tablet: 2-column grids where appropriate
- Desktop: Full multi-column grids, sidebar ads visible

## Technical Specifications
- Pure vanilla JavaScript (no frameworks)
- SEO: Title tag, meta description, Open Graph tags for social sharing
- Smooth, performant animations using CSS transforms and opacity