# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is EstokIA Frontend, a Next.js 15 application built with TypeScript, Material-UI, and Tailwind CSS. The project uses React 19 and is configured with Turbopack for faster development builds.

## Development Commands

- `npm run dev` - Start development server with Turbopack (opens at http://localhost:3000)
- `npm run build` - Build production version
- `npm start` - Start production server
- `npm run lint` - Run ESLint with Next.js rules

## Architecture

### Framework Stack
- **Next.js 15** with App Router architecture (`src/app/` directory)
- **React 19** with TypeScript
- **Material-UI** (`@mui/material`) for component library
- **Emotion** for CSS-in-JS styling
- **Tailwind CSS v4** for utility-first styling
- **Turbopack** for development bundling

### Project Structure
- `src/app/` - Next.js App Router pages and layouts
- `src/app/layout.tsx` - Root layout with Geist fonts configuration
- `src/app/page.tsx` - Homepage component
- `src/app/globals.css` - Global styles with Tailwind imports and CSS variables
- `public/` - Static assets (SVG icons, favicon)

### Styling System
The project uses a hybrid approach:
- **Tailwind CSS** for utility classes
- **Material-UI** components with Emotion for theming
- **CSS Variables** for dark/light mode (`--background`, `--foreground`)
- **Geist fonts** (sans and mono) loaded via Next.js font optimization

### TypeScript Configuration
- Path aliases: `@/*` maps to `./src/*`
- Strict mode enabled
- Next.js plugin for enhanced IDE support

### Code Style
- ESLint with Next.js core web vitals and TypeScript rules
- Uses ES2017 target for compilation
- Follows Next.js App Router conventions