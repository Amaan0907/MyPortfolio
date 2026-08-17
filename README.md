# Amaan — Portfolio

A personal portfolio site for Amaan, a Full Stack Developer and Computer Science student specializing in AI/ML. Built as a fast, animation-driven single-page site showcasing projects, skills, and contact info.

**Live site:** [Amaan's Portfolio](https://amaanportfolio-kappa.vercel.app/)

## Features

- Smooth scrolling powered by [Lenis](https://github.com/darkroomengineering/lenis)
- Scroll and text animations built with [GSAP](https://gsap.com/)
- Custom cursor, magnetic buttons, and an animated preloader
- Project showcase pulled from a single data source ([src/data/portfolio.js](src/data/portfolio.js))
- Responsive layout styled with Tailwind CSS v4
- Sections: Overview, About Me, Tech Stack, Projects, Contact

## Tech Stack

- **React 19** + **Vite 7**
- **Tailwind CSS 4**
- **GSAP** for animations
- **Lenis** for smooth scrolling
- **Motion** (Framer Motion successor)
- **Base UI** + **lucide-react** / **react-icons** for UI primitives and icons

Starts the Vite dev server with hot module reloading.


## Project Structure

```
src/
├── animations/       # Reusable text/character animation components
├── components/       # Shared UI (Navbar, Footer, Preloader, Cursor, etc.)
├── data/             # Site content (profile, skills, projects)
├── lib/              # Utilities and smooth-scroll setup
└── sections/         # Page sections (Hero, About, Projects, Contact, ...)
```

## Editing Content

All personal info, skills, and project entries live in [src/data/portfolio.js](src/data/portfolio.js). Update the `profile`, `skills`, and `projects` objects there to change the site's content without touching component code.

## License

Personal project — all rights reserved.
