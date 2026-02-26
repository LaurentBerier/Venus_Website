# Venus: Build Your Destiny - Game Website

## Overview
A sci-fi survival game promotional website for "Venus: Build Your Destiny". Features a dark theme with cyan (primary) and orange (accent) color scheme, Michroma font for headings, and multi-language support (EN/FR).

## Recent Changes
- **2026-02-26**: Three alternating animated backgrounds per section group
  - StarField (warp-speed forward flight): Hero/Story/Features and Roadmap/Community/FAQ/Contact/Footer
  - NebulaField (drifting gas clouds, pulsing nebula core, twinkling stars): World/Characters
  - BlackHoleField (orbiting accretion disk, gravitational lensing, event horizon): Editions/Media
  - SectionGroup component in Home.tsx wraps sections with their assigned background canvas
  - AmbientEffects overlay with drifting cyan/orange light orbs and scan line
  - Section backgrounds semi-transparent (bg-background/90, bg-card/90) so effects peek through
  - Enhanced glow intensities: heading-glow, border-glow-cyan/orange, section-divider-glow
- **2026-02-24**: Logo, font, language, and ad updates
  - Replaced text logo with Venus logo image (Enhanced_Venus_LogoWhiteBold_01) in Header, Footer, and Hero
  - Switched heading font from Orbitron to Michroma to match logo style
  - Removed Arabic language support (EN/FR only now)
  - Removed all ad placeholders from Hero, Editions, and Community sections
  - Added prominent YouTube trailer video banner in Hero section
- **2026-02-24**: Complete transformation from "Osman Ghazi: Ottoman Rising" to "Venus: Build Your Destiny" sci-fi survival theme
  - Updated all 11 components (Hero, Header, Footer, Story, Features, World, Characters, Editions, Media, Roadmap, Community, FAQ, Contact)
  - Added sci-fi CSS effects (glow-pulse, shimmer, float, text-glow, border-glow)
  - Integrated 15 Venus game assets from attached_assets/ directory
  - YouTube trailer embed (https://youtu.be/_Pu2hAu-vy8) in Hero section
  - Full translations for EN, FR languages
  - Renamed `osman` key to `pioneer` in translations

## Project Architecture
- **Frontend**: React + TypeScript + Tailwind CSS + Wouter routing
- **Backend**: Express.js (minimal, mostly frontend-focused)
- **Build**: Vite
- **Multi-language**: LanguageContext provider with EN/FR support
- **Color scheme**: Cyan primary (190 85% 50%), Orange accent (25 90% 55%), Dark backgrounds
- **Fonts**: Michroma (headings via font-serif), Inter (body via font-sans)
- **Logo**: Venus logo image at attached_assets/Enhanced_Venus_LogoWhiteBold_01_1771949339391.png

## Key Files
- `client/src/index.css` - Color scheme, CSS variables, sci-fi effects
- `client/src/lib/translations.ts` - All translatable content (EN/FR)
- `client/src/lib/LanguageContext.tsx` - Language provider
- `client/src/components/` - All page sections
- `client/index.html` - Meta tags, fonts, OG tags
- `attached_assets/` - Venus game screenshots, GIFs, and logo

## User Preferences
- Dark theme by default (HTML has class="dark")
- Sci-fi aesthetic with cyan/orange accents
- No emoji usage
- No ads on the site
- Use Venus logo image (not text) for branding
- Michroma font style to match logo aesthetic
