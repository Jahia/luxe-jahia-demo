# Luxe Design System

This package contains a minimal design system for Luxe, factoring common design elements and concepts.

The goal of this package is to provide a functional sample on how to use a React design system in Jahia through the use
of JavaScript Modules.

It is in no way a complete design system. While we try to follow industry best practices, this package is not meant to
be a sample of a good design system.

## Architecture

The Luxe Design System is conceived in Figma and implemented as React components with CSS modules.

The package is structured as follows:

```
📁 design-system/
  +-- 📃 README.md                       📍 You are here
  +-- 📃 package.json
  \-- 📁 src/
        +-- 📃 index.ts                  Entry point for the design system, re-exports all components
        \-- 📁 (name of component)/      Components live in their own directories
              +-- 📃 index.tsx           Contains the React component(s)
              +-- 📃 styles.module.css   Contains the CSS styles for the component, as a CSS Module
              \-- 📃 stories.tsx         Contains the Storybook stories for the component
```

All components directories are made of three
files: [a React component](https://react.dev/learn), [a CSS module](https://github.com/css-modules/css-modules),
and [a Storybook story](https://storybook.js.org/docs/writing-stories).

The package has no build step, and this is intentional. As JavaScript Modules are built with Vite, the components of the
design system can be imported directly and built by Vite when packaging the module.
