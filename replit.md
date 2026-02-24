# Venus: Build Your Destiny - Game Website

## Overview
A sci-fi survival game promotional website for "Venus: Build Your Destiny". Features a dark theme with cyan (primary) and orange (accent) color scheme, Orbitron font for headings, and multi-language support (EN/FR/AR).

## Recent Changes
- **2026-02-24**: Complete transformation from "Osman Ghazi: Ottoman Rising" to "Venus: Build Your Destiny" sci-fi survival theme
  - Updated all 11 components (Hero, Header, Footer, Story, Features, World, Characters, Editions, Media, Roadmap, Community, FAQ, Contact)
  - Replaced Playfair Display font with Orbitron for sci-fi aesthetic
  - Added sci-fi CSS effects (glow-pulse, shimmer, float, text-glow, border-glow)
  - Integrated 15 Venus game assets from attached_assets/ directory
  - YouTube trailer embed (https://youtu.be/_Pu2hAu-vy8) in Hero section
  - Full translations for EN, FR, AR languages
  - Renamed `osman` key to `pioneer` in translations

## Project Architecture
- **Frontend**: React + TypeScript + Tailwind CSS + Wouter routing
- **Backend**: Express.js (minimal, mostly frontend-focused)
- **Build**: Vite
- **Multi-language**: LanguageContext provider with EN/FR/AR support
- **Color scheme**: Cyan primary (190 85% 50%), Orange accent (25 90% 55%), Dark backgrounds
- **Fonts**: Orbitron (headings via font-serif), Inter (body via font-sans)

## Key Files
- `client/src/index.css` - Color scheme, CSS variables, sci-fi effects
- `client/src/lib/translations.ts` - All translatable content (EN/FR/AR)
- `client/src/lib/LanguageContext.tsx` - Language provider
- `client/src/components/` - All page sections
- `client/index.html` - Meta tags, fonts, OG tags
- `attached_assets/` - Venus game screenshots and GIFs

## User Preferences
- Dark theme by default (HTML has class="dark")
- Sci-fi aesthetic with cyan/orange accents
- No emoji usage
