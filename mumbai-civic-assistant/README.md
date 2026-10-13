# Mumbai Civic Assistant

An independent, citizen-facing assistant for Mumbai civic services.

> **This is not an official BMC or government service.**
> It cannot submit or register complaints. It shows users where to file
> complaints on the official channels.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build
npm run preview
```

## Environment

Copy `.env.example` to `.env` and fill in values. Only `VITE_*`
variables reach the browser; anything secret must live in the backend.

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS 3
- React Router 6

## Status

Milestone 0: scaffold, design tokens, app shell, i18n. Screens land in
subsequent milestones.
