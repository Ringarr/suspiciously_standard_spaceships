# suspiciously_standard_spaceships

A standard Node and React application written in TypeScript.

## Features

- **React 19** - Modern React with latest features
- **TypeScript** - Full type safety
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting for quality assurance

## Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm or yarn

### Installation

Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building

Build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview

Preview the production build:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## Project Structure

```
.
├── public/          # Static assets
├── src/
│   ├── App.tsx      # Main App component
│   ├── App.css      # App styles
│   ├── main.tsx     # Application entry point
│   ├── index.css    # Global styles
│   └── vite-env.d.ts # Vite type declarations
├── index.html       # HTML entry point
├── tsconfig.json    # TypeScript configuration
├── vite.config.ts   # Vite configuration
└── eslint.config.js # ESLint configuration
```

## Technology Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Linter**: ESLint
- **Package Manager**: npm
