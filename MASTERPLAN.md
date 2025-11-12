# MASTERPLAN - TechPioneers

## Project Overview

**TechPioneers** is a static website designed to showcase key figures in the tech industry, including developers, researchers, and innovators who have shaped modern technology. This project serves as a portfolio piece demonstrating advanced frontend development skills, best practices, and professional software development workflows.

### Project Objectives

- Showcase technical proficiency in vanilla JavaScript, HTML, and CSS
- Demonstrate knowledge of modern development tools and workflows
- Implement professional DevOps practices (Docker, CI/CD, Cloud deployment)
- Create an accessible, responsive, and performant web application
- Build a foundation for a professional software development portfolio

### Key Features

- Responsive design (Mobile, Tablet, Desktop)
- Light/Dark theme switcher
- Custom carousel implementation (vanilla JS)
- Modal system for pioneer details
- Historical timeline visualization
- Smooth animations and transitions
- Full accessibility compliance

## Tech Stack

### Core Technologies

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern CSS with BEM methodology
- **JavaScript (ES6+)**: Vanilla JavaScript (no frameworks)
- **Vite**: Build tool and development server

### Development Tools

- **Prettier**: Code formatting
- **ESLint**: JavaScript linting
- **Husky**: Git hooks for pre-commit checks
- **Git**: Version control with GitFlow workflow
- **SemVer**: Semantic versioning strategy

### DevOps & Deployment

- **Docker**: Multi-stage containerization
- **Docker Compose**: Environment orchestration
- **GitHub Actions**: CI/CD pipelines
- **Google Cloud Run**: Production/Staging hosting

### Design

- **Figma**: Design system and assets (custom design by _Mauricio Oliveda_)

## Repository Structure

### Repository Naming Convention

```text
mauricio/techpioneers/web
```

### Folder Structure

```text
techpioneers/
├── .github/
│   └── workflows/
│       ├── pr-test.yml              # PR validation workflow
│       ├── deploy-staging.yml       # Auto-deploy to staging (develop branch)
│       └── deploy-production.yml    # Auto-deploy to production (main branch)
├── .husky/
│   ├── pre-commit                   # Pre-commit hooks
│   └── commit-msg                   # Commit message validation
├── public/
│   ├── icon.svg                     # Modern icon (light/dark mode)
│   ├── apple-icon.png               # Apple touch icon
│   ├── favicon.ico                  # Fallback favicon
│   └── assets/
│       ├── images/                  # Pioneer photos, hero background
│       └── icons/                   # Timeline, resources icons
├── src/
│   ├── css/
│   │   ├── main.css                 # Main stylesheet entry
│   │   ├── base/
│   │   │   ├── reset.css            # CSS reset
│   │   │   ├── typography.css       # Font styles
│   │   │   └── variables.css        # CSS custom properties (themes)
│   │   ├── components/
│   │   │   ├── header.css           # Header styles
│   │   │   ├── hero.css             # Hero section
│   │   │   ├── pioneer-card.css     # Card component (BEM)
│   │   │   ├── carousel.css         # Carousel component
│   │   │   ├── modal.css            # Modal component
│   │   │   ├── timeline.css         # Timeline component
│   │   │   ├── resources.css        # Resources section
│   │   │   ├── footer.css           # Footer styles
│   │   │   └── theme-switcher.css   # Theme toggle button
│   │   ├── layout/
│   │   │   ├── grid.css             # Grid system
│   │   │   └── container.css        # Container utilities
│   │   └── utilities/
│   │       ├── animations.css       # Animation classes
│   │       └── responsive.css       # Media queries
│   ├── js/
│   │   ├── main.js                  # Main JavaScript entry
│   │   ├── modules/
│   │   │   ├── carousel.js          # Carousel functionality
│   │   │   ├── modal.js             # Modal system
│   │   │   ├── theme-switcher.js    # Theme management
│   │   │   ├── animations.js        # Scroll animations
│   │   │   └── navigation.js        # Mobile navigation
│   │   └── utils/
│   │       ├── dom.js               # DOM utilities
│   │       └── helpers.js           # Helper functions
│   └── index.html                   # Main HTML file
├── .dockerignore                    # Docker ignore patterns
├── .env.example                     # Environment variables template
├── eslint.config.js                 # ESLint configuration (flat config)
├── .gitignore                       # Git ignore patterns
├── .prettierrc.json                 # Prettier configuration
├── AGENTS.md                        # AI agent development guide
├── docker-compose.yml               # Shared Docker configuration
├── docker-compose.override.yml      # Local environment
├── docker-compose.staging.yml       # Staging environment
├── docker-compose.prod.yml          # Production environment
├── Dockerfile.dev                   # Development Dockerfile
├── Dockerfile.prod                  # Production Dockerfile (multi-stage)
├── nginx.conf                       # Nginx configuration for production
├── LICENSE                          # Project license
├── MASTERPLAN.md                    # This file
├── package.json                     # NPM dependencies
├── package-lock.json                # NPM lock file
├── README.md                        # Project documentation
└── vite.config.js                   # Vite configuration
```

## Architecture & Component Design

### HTML Structure

The project consists of a **single-page application** with the following sections:

#### Section Breakdown

1. **Header**
   - Mobile version: Hamburger menu, logo, theme switcher
   - Desktop version: Navigation links, logo, theme switcher
   - Sticky positioning on scroll

2. **Hero Section**
   - Background image
   - Centered content container
   - Title, description, CTA button
   - Scroll animation on load

3. **Featured Pioneers Section**
   - Section title
   - Carousel of 4 featured pioneer cards (mobile/tablet/desktop)
   - Cards: photo, title, description (non-clickable)

4. **More Pioneers Section**
   - Section title
   - Carousel of 6 pioneer cards (mobile/tablet/desktop)
   - Cards: photo, title, description (clickable → opens modal)

5. **Timeline Section**
   - Section title
   - Historical timeline component
   - Timeline elements: icon, title, description

6. **Resources Section**
   - Section title
   - Sub-sections with title
   - Resource items: icon, title, description (non-clickable)

7. **Footer Section**
   - "More Projects" link
   - Copyright notice: "© Mauricio Oliveda"

#### Accessibility Features

- Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- ARIA labels and roles where necessary
- Keyboard navigation support
- Focus management for modal
- Alt text for all images
- Proper heading hierarchy (h1 → h6)

### CSS Architecture (BEM Methodology)

#### BEM Naming Convention

```css
/* Block */
.pioneer-card {
}

/* Element */
.pioneer-card__image {
}
.pioneer-card__title {
}
.pioneer-card__description {
}

/* Modifier */
.pioneer-card--featured {
}
.pioneer-card--clickable {
}
```

#### CSS Custom Properties (Design Tokens)

```css
:root {
  /* Colors - Light Theme */
  --color-primary: #...;
  --color-secondary: #...;
  --color-background: #...;
  --color-text: #...;

  /* Typography */
  --font-primary: "...";
  --font-size-base: 16px;
  --line-height-base: 1.5;

  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 2rem;
  --spacing-lg: 4rem;

  /* Breakpoints (for JS) */
  --breakpoint-mobile: 768px;
  --breakpoint-tablet: 1024px;
}

[data-theme="dark"] {
  /* Colors - Dark Theme */
  --color-primary: #...;
  --color-background: #...;
  --color-text: #...;
}
```

#### Responsive Design Strategy

- **Mobile First**: Base styles for mobile (< 768px)
- **Tablet**: Media queries for tablet (768px - 1024px)
- **Desktop**: Media queries for desktop (> 1024px)

### JavaScript Architecture

#### Module Structure

All JavaScript follows **ES6 modules** pattern with clear separation of concerns.

##### Carousel Module (`carousel.js`)

```javascript
// Custom vanilla JS carousel implementation
class Carousel {
  constructor(element, options) {}
  init() {}
  next() {}
  prev() {}
  goToSlide(index) {}
  autoPlay() {}
  destroy() {}
}
```

**Features:**

- Touch/swipe support for mobile
- Keyboard navigation (arrow keys)
- Auto-play option
- Dot indicators
- Responsive (adapts to viewport)

##### Modal Module (`modal.js`)

```javascript
// Custom modal system
class Modal {
  constructor() {}
  open(pioneerData) {}
  close() {}
  handleKeyboard(e) {}
  trapFocus() {}
}
```

**Features:**

- Focus trap (accessibility)
- ESC key to close
- Click outside to close
- Prevent body scroll when open

##### Theme Switcher Module (`theme-switcher.js`)

```javascript
// Theme management
class ThemeSwitcher {
  constructor() {}
  init() {}
  toggle() {}
  setTheme(theme) {}
  savePreference() {}
  loadPreference() {}
}
```

**Features:**

- LocalStorage persistence
- System preference detection
- Smooth theme transition

##### Animations Module (`animations.js`)

```javascript
// Scroll-triggered animations
class AnimationController {
  constructor() {}
  init() {}
  observeElements() {}
  animateOnScroll(entries) {}
}
```

**Features:**

- Intersection Observer API
- Fade-in, slide-in effects
- Stagger animations for lists

##### Navigation Module (`navigation.js`)

```javascript
// Mobile navigation
class Navigation {
  constructor() {}
  init() {}
  toggle() {}
  close() {}
}
```

**Features:**

- Hamburger menu toggle
- Smooth scroll to sections
- Active section highlighting

## Docker Configuration

### Multi-Stage Dockerfile Strategy

#### `Dockerfile.dev` (Development)

```dockerfile
FROM node:24-slim

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy application source code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start development server with host flag for Docker
CMD ["npm", "run", "dev", "--", "--host"]
```

**Features:**

- Hot module replacement (HMR)
- Volume mounting for live reloading (configured in docker-compose.override.yml)
- Development tools included
- Source code copied but overridden by bind mounts in development

#### `Dockerfile.prod` (Production - Multi-stage)

```dockerfile
# Stage 1: Build
FROM node:24-slim AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install all dependencies (build requires devDependencies like Vite)
RUN npm ci

# Copy application source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production Runtime
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose HTTP port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

**Features:**

- Multi-stage build for optimized image size
- First stage builds the application with all dependencies
- Second stage serves static files with minimal Nginx image
- Final image only contains built assets and Nginx (~20-30MB)
- No source code or build tools in production image

#### `nginx.conf` (Nginx Configuration)

```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Logging
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    # Performance
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript
               application/json application/javascript application/xml+rss
               application/rss+xml font/truetype font/opentype
               application/vnd.ms-fontobject image/svg+xml;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Referrer-Policy "no-referrer-when-downgrade" always;

        # Single Page Application routing
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Cache static assets
        location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # Disable cache for HTML files
        location ~* \.html$ {
            expires -1;
            add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
        }

        # Health check endpoint for Cloud Run
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }
    }
}
```

**Features:**

- Optimized for serving static files
- Gzip compression enabled for better performance
- Security headers included
- Caching strategy for static assets
- SPA routing support (fallback to index.html)
- Health check endpoint for container orchestration
- Proper MIME types configuration

#### `.dockerignore` (Docker Ignore Patterns)

```text
# Dependencies
node_modules
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build outputs
dist
build
.vite

# Development
.env
.env.local
.env.*.local

# Git
.git
.gitignore
.github

# IDE
.vscode
.idea
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Documentation
*.md
!README.md

# Testing
coverage
.nyc_output

# Docker
Dockerfile.dev
docker-compose*.yml
.dockerignore

# Misc
.husky
.prettierrc.json
```

**Purpose:**

- Reduces Docker build context size
- Speeds up image builds
- Prevents unnecessary files in images
- Excludes sensitive files (.env)
- Keeps development tools out of production

### Docker Compose Files

#### Docker Best Practices

- **Use `docker-compose.yml`** as the **base configuration** shared by all environments (networks, shared volumes, common service names).
- **Use `docker-compose.override.yml`** for **local development**. This file is automatically loaded and includes things like:
  - **Bind mounts** for hot-reloading.
  - **Environment variables** for local settings.
  - **Exposed ports** for easy access.
- **Use `docker-compose.staging.yml`** for the **staging/testing environment**. This file:
  - Overrides the `build` context to use `Dockerfile.prod`.
  - Specifies production-like **environment variables** (database URLs, external service keys).
  - Exposes only necessary ports and doesn't include bind mounts.
- **Use `docker-compose.prod.yml`** for the **production/live environment**. This file:
  - Overrides the `build` context to use `Dockerfile.prod`.
  - Specifies **live production environment variables** (production database URLs, final external service keys).
  - Exposes only essential ports for the running application and **must not** include bind mounts or development tooling.

#### `docker-compose.yml` (Base Configuration)

```yaml
services:
  web:
    build:
      context: .
    container_name: web
    networks:
      - app-network
    restart: unless-stopped

networks:
  app-network:
    driver: bridge
```

#### `docker-compose.override.yml` (Local Development - Auto-loaded)

```yaml
name: techpioneers-local
services:
  web:
    build:
      dockerfile: Dockerfile.dev
    env_file:
      - .env
    ports:
      - "5173:5173"
    volumes:
      - ./src:/app/src
      - ./public:/app/public
    environment:
      - NODE_ENV=development
```

#### `docker-compose.staging.yml` (Staging Override)

```yaml
name: techpioneers-staging
services:
  web:
    build:
      dockerfile: Dockerfile.prod
    container_name: web
    env_file:
      - .env.staging
    ports:
      - "8081:80"
    environment:
      - NODE_ENV=production
```

#### `docker-compose.prod.yml` (Production Override)

```yaml
name: techpioneers-prod
services:
  web:
    build:
      dockerfile: Dockerfile.prod
    container_name: web
    env_file:
      - .env.production
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
```

### Environment Variables

#### `.env.example`

```env
# Environment
NODE_ENV=development

# Development Server
PORT=5173
```

**Note:** Actual `.env` files are git-ignored and managed per environment.

## CI/CD Pipeline (GitHub Actions)

### Workflow Overview

Three automated workflows handle different aspects of the CI/CD pipeline:

1. **PR Testing** - Quality checks on pull requests
2. **Staging Deployment** - Auto-deploy `develop` branch to staging
3. **Production Deployment** - Auto-deploy `main` branch to production

### Workflow 1: PR Testing (`.github/workflows/pr-test.yml`)

**Trigger:** Pull request to `develop` or `main`

**Purpose:** Ensure code quality before merging

```yaml
name: PR Tests

on:
  pull_request:
    branches: [develop, main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Lint code
        run: npm run lint

      - name: Format check
        run: npm run format:check

      - name: Build test
        run: npm run build

      - name: Test Docker build
        run: docker build -f Dockerfile.prod -t test-build .
```

### Workflow 2: Deploy Staging (`.github/workflows/deploy-staging.yml`)

**Trigger:** Push to `develop` branch

**Purpose:** Deploy latest changes to staging environment

**Note:** Uses Docker Hub (free tier) instead of Artifact Registry to minimize costs.

```yaml
name: Deploy to Staging

on:
  push:
    branches: [develop]

env:
  PROJECT_ID: ${{ secrets.GCP_PROJECT_ID }}
  REGION: ${{ secrets.GCP_REGION }}
  SERVICE_NAME: techpioneers-staging
  DOCKERHUB_USERNAME: ${{ secrets.DOCKERHUB_USERNAME }}
  IMAGE_NAME: techpioneers

jobs:
  deploy:
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build Docker image
        run: |
          docker build -f Dockerfile.prod \
            -t ${{ env.DOCKERHUB_USERNAME }}/${{ env.IMAGE_NAME }}:latest \
            -t ${{ env.DOCKERHUB_USERNAME }}/${{ env.IMAGE_NAME }}:${{ github.sha }} \
            .

      - name: Push Docker image to Docker Hub
        run: |
          docker push ${{ env.DOCKERHUB_USERNAME }}/${{ env.IMAGE_NAME }}:latest
          docker push ${{ env.DOCKERHUB_USERNAME }}/${{ env.IMAGE_NAME }}:${{ github.sha }}

      - name: Authenticate to Google Cloud
        uses: google-github-actions/auth@v2
        with:
          credentials_json: ${{ secrets.GCP_SA_KEY }}

      - name: Set up Cloud SDK
        uses: google-github-actions/setup-gcloud@v2

      - name: Deploy to Cloud Run
        run: |
          gcloud run deploy ${{ env.SERVICE_NAME }} \
            --image=docker.io/${{ env.DOCKERHUB_USERNAME }}/${{ env.IMAGE_NAME }}:latest \
            --platform=managed \
            --region=${{ env.REGION }} \
            --allow-unauthenticated \
            --memory=256Mi \
            --cpu=1 \
            --min-instances=0 \
            --max-instances=3 \
            --port=80 \
            --timeout=60 \
            --concurrency=100 \
            --cpu-throttling

      - name: Get Service URL
        run: |
          SERVICE_URL=$(gcloud run services describe ${{ env.SERVICE_NAME }} \
            --region=${{ env.REGION }} \
            --format='value(status.url)')
          echo "Staging deployed to: $SERVICE_URL"
```

**Deployment URL:** `https://techpioneers-staging-[random].run.app`

### Workflow 3: Deploy Production (`.github/workflows/deploy-production.yml`)

**Trigger:** Push to `main` branch

**Purpose:** Deploy stable releases to production with versioning

**Note:** Uses Docker Hub (free tier) instead of Artifact Registry to minimize costs.

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

env:
  PROJECT_ID: ${{ secrets.GCP_PROJECT_ID }}
  REGION: ${{ secrets.GCP_REGION }}
  SERVICE_NAME: techpioneers-prod
  DOCKERHUB_USERNAME: ${{ secrets.DOCKERHUB_USERNAME }}
  IMAGE_NAME: techpioneers

jobs:
  deploy:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    permissions:
      contents: write
      packages: write

    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # Get all history for proper versioning

      - name: Get version from package.json
        id: version
        run: |
          VERSION=$(node -p "require('./package.json').version")
          echo "version=v${VERSION}" >> $GITHUB_OUTPUT
          echo "Deploying version: v${VERSION}"

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build Docker image
        run: |
          docker build -f Dockerfile.prod \
            -t ${{ env.DOCKERHUB_USERNAME }}/${{ env.IMAGE_NAME }}:${{ steps.version.outputs.version }} \
            -t ${{ env.DOCKERHUB_USERNAME }}/${{ env.IMAGE_NAME }}:stable \
            .

      - name: Push Docker image to Docker Hub
        run: |
          docker push ${{ env.DOCKERHUB_USERNAME }}/${{ env.IMAGE_NAME }}:${{ steps.version.outputs.version }}
          docker push ${{ env.DOCKERHUB_USERNAME }}/${{ env.IMAGE_NAME }}:stable

      - name: Authenticate to Google Cloud
        uses: google-github-actions/auth@v2
        with:
          credentials_json: ${{ secrets.GCP_SA_KEY }}

      - name: Set up Cloud SDK
        uses: google-github-actions/setup-gcloud@v2

      - name: Deploy to Cloud Run
        run: |
          gcloud run deploy ${{ env.SERVICE_NAME }} \
            --image=docker.io/${{ env.DOCKERHUB_USERNAME }}/${{ env.IMAGE_NAME }}:${{ steps.version.outputs.version }} \
            --platform=managed \
            --region=${{ env.REGION }} \
            --allow-unauthenticated \
            --memory=256Mi \
            --cpu=1 \
            --min-instances=0 \
            --max-instances=5 \
            --port=80 \
            --timeout=60 \
            --concurrency=100 \
            --cpu-throttling

      - name: Get Service URL
        id: service-url
        run: |
          SERVICE_URL=$(gcloud run services describe ${{ env.SERVICE_NAME }} \
            --region=${{ env.REGION }} \
            --format='value(status.url)')
          echo "url=$SERVICE_URL" >> $GITHUB_OUTPUT
          echo "Production deployed to: $SERVICE_URL"

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v1
        with:
          tag_name: ${{ steps.version.outputs.version }}
          name: Release ${{ steps.version.outputs.version }}
          body: |
            🚀 Production deployment of TechPioneers ${{ steps.version.outputs.version }}

            **Deployment Details:**
            - Service: ${{ env.SERVICE_NAME }}
            - Region: ${{ env.REGION }}
            - URL: ${{ steps.service-url.outputs.url }}
            - Commit: ${{ github.sha }}

            **Changes:** See commit history for details.
          draft: false
          prerelease: false
          generate_release_notes: true
```

**Deployment URL:** `https://techpioneers-prod-[random].run.app`

### Docker Image Tagging Strategy

| Branch           | Docker Tags           | Cloud Run Service    | Description                 |
| ---------------- | --------------------- | -------------------- | --------------------------- |
| `develop`        | `latest`, `{git-sha}` | techpioneers-staging | Auto-deploy on every push   |
| `main`           | `{version}`, `stable` | techpioneers-prod    | Stable releases with SemVer |
| Feature branches | N/A                   | N/A                  | Local development only      |

**Version Format:**

- Staging: `latest` (always latest from develop) + Git SHA for traceability
- Production: `v1.0.0` (from package.json) + `stable` tag for rollback capability

## Git Workflow (GitFlow + SemVer)

### Branch Structure

```text
main (production-ready code)
  ↑
release/x.y.z (release candidates)
  ↑
develop (integration branch)
  ↑
feature/feature-name (feature development)
hotfix/issue-name (emergency fixes)
```

### Branch Naming Conventions

- **Feature branches:** `feature/carousel-implementation`
- **Bugfix branches:** `bugfix/modal-focus-trap`
- **Hotfix branches:** `hotfix/security-patch`
- **Release branches:** `release/1.0.0`

### Commit Message Convention

Following **Gitmoji** specification:

```text
<emoji> <short message (max 50 characters)>
```

**Gitmoji Reference:**

| Emoji | Code                          | Description           | Use Case                                 |
| ----- | ----------------------------- | --------------------- | ---------------------------------------- |
| 🎉    | `:tada:`                      | Initial commit        | First commit of the project              |
| ✨    | `:sparkles:`                  | New feature           | Introducing new features                 |
| 🐛    | `:bug:`                       | Bug fix               | Fixing a bug                             |
| 📝    | `:memo:`                      | Documentation         | Add or update documentation              |
| 🎨    | `:art:`                       | Code structure/format | Improve structure/format of code         |
| ⚡️   | `:zap:`                       | Performance           | Improve performance                      |
| 🔥    | `:fire:`                      | Remove code/files     | Remove code or files                     |
| 🚀    | `:rocket:`                    | Deploy                | Deploy stuff                             |
| 💄    | `:lipstick:`                  | UI/style              | Add or update UI and style files         |
| ✅    | `:white_check_mark:`          | Tests                 | Add, update, or pass tests               |
| 🔒️   | `:lock:`                      | Security              | Fix security issues                      |
| 🔧    | `:wrench:`                    | Configuration         | Add or update configuration files        |
| 🚨    | `:rotating_light:`            | Linter                | Fix compiler/linter warnings             |
| 🚧    | `:construction:`              | Work in progress      | Work in progress                         |
| ♻️    | `:recycle:`                   | Refactor              | Refactor code                            |
| ⬆️    | `:arrow_up:`                  | Dependencies          | Upgrade dependencies                     |
| ⬇️    | `:arrow_down:`                | Dependencies          | Downgrade dependencies                   |
| 🔀    | `:twisted_rightwards_arrows:` | Merge                 | Merge branches                           |
| ➕    | `:heavy_plus_sign:`           | Dependency            | Add a dependency                         |
| ➖    | `:heavy_minus_sign:`          | Dependency            | Remove a dependency                      |
| 🌐    | `:globe_with_meridians:`      | Internationalization  | Internationalization and localization    |
| 💚    | `:green_heart:`               | CI                    | Fix CI Build                             |
| 📱    | `:iphone:`                    | Responsive            | Work on responsive design                |
| 🍱    | `:bento:`                     | Assets                | Add or update assets                     |
| ♿️    | `:wheelchair:`                | Accessibility         | Improve accessibility                    |
| 🏗️    | `:building_construction:`     | Architecture          | Make architectural changes               |
| 📦️   | `:package:`                   | Build                 | Add or update compiled files or packages |

**Examples:**

```bash
✨ Add touch swipe support to carousel
🐛 Fix focus trap issue in modal on Safari
📝 Update installation instructions in README
🎨 Refactor carousel component structure
⚡️ Optimize image loading performance
💄 Update hero section styling
✅ Add tests for modal component
🔧 Update Vite configuration for production
♿️ Improve keyboard navigation in carousel
```

**Commit Message Guidelines:**

- Keep the message concise (max 50 characters recommended)
- Use imperative mood ("Add" not "Added" or "Adds")
- Capitalize the first letter after emoji
- Don't end with a period
- Use the most specific emoji for your change

### Semantic Versioning (SemVer)

Format: `MAJOR.MINOR.PATCH`

- **MAJOR:** Breaking changes (e.g., 1.0.0 → 2.0.0)
- **MINOR:** New features, backward-compatible (e.g., 1.0.0 → 1.1.0)
- **PATCH:** Bug fixes, backward-compatible (e.g., 1.0.0 → 1.0.1)

## Development Workflow

### Pre-commit Hooks (Husky)

#### `.husky/pre-commit`

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Run linting
npm run lint

# Run format check
npm run format:check

# Run build test
npm run build
```

#### `.husky/commit-msg`

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Validate commit message format (Gitmoji)
# Note: Configure commitlint with gitmoji rules or use custom validation
npx --no -- commitlint --edit "$1"
```

### NPM Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src/**/*.js",
    "lint:fix": "eslint src/**/*.js --fix",
    "format": "prettier --write \"src/**/*.{js,css,html}\"",
    "format:check": "prettier --check \"src/**/*.{js,css,html}\"",
    "prepare": "husky install"
  }
}
```

### Local Development with Docker

#### 1. Local Development (Hot Reloading)

This configuration uses `docker-compose.yml` and automatically loads `docker-compose.override.yml` for local settings.

##### Commands

- **Run (Foreground):**

```bash
docker compose up --build
```

_Builds the image (if necessary) and starts all services in the foreground._

- **Run (Detached):**

```bash
docker compose up -d
```

_Starts services in the background._

- **Restart a Service:**

```bash
docker compose restart web
```

_Restarts a specific service (e.g., `web`)._

- **Stop All:**

```bash
docker compose down
```

_Stops and removes containers, networks, and volumes._

#### 2. Executing Commands Inside a Container

To run one-off commands (like migrations, tests, or shell access) inside your running development container:

##### Suggestions

- **Run a specific command (e.g., npm script):**

```bash
docker compose exec web npm run build
```

- **Open a shell (Bash/Sh) inside the main service container:**

```bash
docker compose exec web bash
```

_(Use `sh` instead of `bash` if your image is Alpine-based.)_

#### 3. Staging/Production Deployment

Use the dedicated staging configuration for a production-like test run.

##### Command

- **Build and Run Staging Image:**

```bash
docker compose -f docker-compose.yml -f docker-compose.staging.yml up --build -d
```

_This command explicitly uses the base config and the staging override to build and run the optimized production image._

- **Build and Run Production Image:**

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```

_This command explicitly uses the base config and the production override to build and run the final production image._

**Hot Reload:** Enabled via volume mounting in `docker-compose.override.yml`

---

## Deployment Strategy

### Google Cloud Run Configuration

#### Service Configuration

> **Note:** This configuration is optimized for **Google Cloud Free Tier** deployment.

**Staging Service (techpioneers-staging):**

```bash
Service Name: techpioneers-staging
Region: us-central1
CPU: 1 (CPU allocated only during request processing)
Memory: 256Mi
Min Instances: 0 (scales to zero - FREE)
Max Instances: 3
Concurrency: 100
Timeout: 60s
Port: 80
Ingress: All
Authentication: Allow unauthenticated
CPU Allocation: CPU is only allocated during request processing
```

**Production Service (techpioneers-prod):**

```bash
Service Name: techpioneers-prod
Region: us-central1
CPU: 1 (CPU allocated only during request processing)
Memory: 256Mi
Min Instances: 0 (scales to zero - FREE)
Max Instances: 5
Concurrency: 100
Timeout: 60s
Port: 80
Ingress: All
Authentication: Allow unauthenticated
CPU Allocation: CPU is only allocated during request processing
```

**Free Tier Optimization:**

- **Memory (256Mi):** Minimal but sufficient for Nginx serving static files (saves ~50% memory cost)
- **CPU (1):** Only allocated during request processing (default behavior, no always-on charges)
- **Min Instances (0):** **CRITICAL for Free Tier** - Scales to zero when idle, no idle charges
- **Max Instances:** Conservative limits (3 staging, 5 prod) to prevent unexpected charges
- **Concurrency (100):** Higher concurrency = fewer instances needed = lower costs
- **Timeout (60s):** Reduced from 300s - static sites don't need long timeouts
- **Port (80):** Nginx default port in our container

#### Environment-Specific Deployments

| Environment | Branch    | Service Name         | URL                               | Auto-Deploy |
| ----------- | --------- | -------------------- | --------------------------------- | ----------- |
| Development | local     | N/A                  | localhost:5173                    | N/A         |
| Staging     | `develop` | techpioneers-staging | techpioneers-staging-[id].run.app | Yes         |
| Production  | `main`    | techpioneers-prod    | techpioneers-prod-[id].run.app    | Yes         |

### Google Cloud Setup Prerequisites

Before deploying, ensure the following are configured:

#### Create Google Cloud Project

```bash
# Set project ID variable
export PROJECT_ID="your-project-id"

# Create new project (if needed)
gcloud projects create $PROJECT_ID --name="TechPioneers"

# Set default project
gcloud config set project $PROJECT_ID
```

#### Enable Required APIs

```bash
# Enable Cloud Run API
gcloud services enable run.googleapis.com

# Note: We skip Artifact Registry API since we use Docker Hub (free) to avoid storage costs
# gcloud services enable artifactregistry.googleapis.com

# Enable Cloud Build API (optional, for advanced CI/CD features)
gcloud services enable cloudbuild.googleapis.com
```

#### Docker Hub Setup (Replaces Artifact Registry)

**Why Docker Hub?**

- Free tier for public images (unlimited pulls)
- No storage costs (Artifact Registry charges $0.10/GB/month)
- Sufficient for portfolio/demo projects
- Easy integration with GitHub Actions

**Setup Steps:**

1. Create a Docker Hub account
2. Create an access token:
   - Go to docker to generate an access token.
   - Click "New Access Token"
   - Name: `github-actions-techpioneers`
   - Permissions: Read, Write, Delete
   - Copy the token (you won't see it again)

3. Your images will be stored at: `docker.io/YOUR_USERNAME/techpioneers`

#### Setup Service Account for GitHub Actions

```bash
# Create service account
gcloud iam service-accounts create github-actions-deployer \
  --display-name="GitHub Actions Deployer"

# Grant necessary permissions
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions-deployer@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions-deployer@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"

# Note: We don't need artifactregistry.writer since we use Docker Hub
# gcloud projects add-iam-policy-binding $PROJECT_ID \
#   --member="serviceAccount:github-actions-deployer@${PROJECT_ID}.iam.gserviceaccount.com" \
#   --role="roles/artifactregistry.writer"

# Create and download service account key
gcloud iam service-accounts keys create key.json \
  --iam-account=github-actions-deployer@${PROJECT_ID}.iam.gserviceaccount.com

# Add key.json content to GitHub Secrets as GCP_SA_KEY
```

#### Configure GitHub Secrets

Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):

```text
GCP_PROJECT_ID: your-project-id
GCP_SA_KEY: <contents of key.json>
GCP_REGION: us-central1
DOCKERHUB_USERNAME: your-dockerhub-username
DOCKERHUB_TOKEN: <your Docker Hub access token>
```

### Deployment Commands (Manual)

For manual deployments or testing:

#### Build and Push to Docker Hub

```bash
# Set variables
export DOCKERHUB_USERNAME="your-dockerhub-username"
export IMAGE_NAME="techpioneers"
export VERSION="v1.0.0"

# Login to Docker Hub
docker login

# Build production image
docker build -f Dockerfile.prod -t ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${VERSION} .

# Push to Docker Hub
docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${VERSION}

# Tag as stable
docker tag ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${VERSION} ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:stable
docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:stable
```

#### Deploy to Cloud Run (Staging)

```bash
gcloud run deploy techpioneers-staging \
  --image=docker.io/${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest \
  --platform=managed \
  --region=${REGION} \
  --allow-unauthenticated \
  --memory=256Mi \
  --cpu=1 \
  --min-instances=0 \
  --max-instances=3 \
  --port=80 \
  --timeout=60 \
  --concurrency=100 \
  --cpu-throttling
```

#### Deploy to Cloud Run (Production)

```bash
gcloud run deploy techpioneers-prod \
  --image=docker.io/${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${VERSION} \
  --platform=managed \
  --region=${REGION} \
  --allow-unauthenticated \
  --memory=256Mi \
  --cpu=1 \
  --min-instances=0 \
  --max-instances=5 \
  --port=80 \
  --timeout=60 \
  --concurrency=100 \
  --cpu-throttling
```

### Monitoring Free Tier Usage

To ensure you stay within the free tier and avoid unexpected charges:

#### Set Up Budget Alerts

```bash
# Create a budget alert for $1 (safety net)
gcloud billing budgets create \
  --billing-account=BILLING_ACCOUNT_ID \
  --display-name="TechPioneers Free Tier Alert" \
  --budget-amount=1 \
  --threshold-rule=percent=50 \
  --threshold-rule=percent=90 \
  --threshold-rule=percent=100
```

#### Monitor Usage (CLI)

```bash
# Check Cloud Run usage
gcloud run services describe techpioneers-staging --region=us-central1

# View metrics
gcloud monitoring time-series list \
  --filter='metric.type="run.googleapis.com/request_count"' \
  --format="table(metric.labels.service_name, points)"
```

#### Monitor Usage (Console)

1. Go to **Google Cloud Console** → **Cloud Run**
2. Select your service
3. Click **Metrics** tab
4. Monitor:
   - Request count
   - Request latencies
   - Container instance count
   - Billable container instance time

#### Cost Optimization Tips

**Stay Within Free Tier:**

- ✅ **Always use `--min-instances=0`** - Scale to zero when idle
- ✅ **Use `--cpu-throttling`** - CPU only during requests (free tier default)
- ✅ **Keep memory at 256Mi** - Sufficient for static sites
- ✅ **Set conservative `--max-instances`** - Prevents runaway costs
- ✅ **Use high concurrency (100)** - Fewer instances needed
- ✅ **Optimize images** - Faster responses = less CPU time
- ✅ **Enable compression in Nginx** - Reduces egress costs

**Warning Signs (approaching limits):**

- ⚠️ Requests > 1.8M/month (90% of 2M free limit)
- ⚠️ vCPU-seconds > 162K/month (90% of 180K free limit)
- ⚠️ Network egress > 900MB/month (90% of 1GB free limit)

**If You Exceed Free Tier:**

The application will continue to work, but you'll be charged:

- Requests: $0.40 per million after 2M
- vCPU-seconds: $0.00002400 per vCPU-second
- Memory: $0.00000250 per GiB-second
- Network egress: $0.12 per GB

**Expected costs if exceeding:** For a portfolio site with moderate traffic, even if you exceed, costs are typically **< $1-2/month**.

### Free Tier Alternative Services

If you need even more cost savings, consider these alternatives:

| Service              | Free Tier                                | Best For                           |
| -------------------- | ---------------------------------------- | ---------------------------------- |
| **Cloud Run**        | 2M requests, 180K vCPU-sec, 360K GiB-sec | Dynamic content, APIs (our choice) |
| **Firebase Hosting** | 10GB storage, 360MB/day transfer         | Static sites only                  |
| **Netlify**          | 100GB bandwidth, 300 build minutes       | Static sites with CI/CD            |
| **Vercel**           | 100GB bandwidth, serverless functions    | Next.js, static sites              |
| **GitHub Pages**     | Unlimited for public repos               | Simple static sites                |

**Why Cloud Run for this project:**

- ✅ Demonstrates Docker/containerization skills
- ✅ Shows DevOps/cloud deployment expertise
- ✅ More production-like environment
- ✅ Better for portfolio/resume
- ✅ Free tier is more than sufficient

## Accessibility Compliance

### WCAG 2.1 Level AA Standards

#### Perceivable

- ✅ Provide text alternatives for images
- ✅ Ensure sufficient color contrast (4.5:1 for normal text)
- ✅ Support both light and dark themes
- ✅ Responsive design adapts to different viewports

#### Operable

- ✅ All functionality available via keyboard
- ✅ Focus indicators clearly visible
- ✅ No keyboard traps (especially in modal)
- ✅ Skip navigation link for screen readers

#### Understandable

- ✅ Clear, consistent navigation
- ✅ Predictable component behavior
- ✅ Form validation with clear error messages (if forms added)

#### Robust

- ✅ Valid HTML5 markup
- ✅ ARIA attributes where appropriate
- ✅ Compatible with assistive technologies

### 10.2 Testing Tools

- axe DevTools (browser extension)
- Lighthouse accessibility audit
- Keyboard navigation testing
- Screen reader testing (NVDA/JAWS)

## Performance Optimization

### Optimization Strategies

#### Image Optimization

- Use modern formats (WebP with fallback)
- Responsive images (`<picture>` element)
- Lazy loading for below-the-fold images
- Proper sizing and compression

#### CSS Optimization

- Minimize CSS file size
- Critical CSS inlining (if needed)
- Use CSS containment where applicable
- Avoid expensive selectors

#### JavaScript Optimization

- Code splitting (if modules grow large)
- Debounce scroll/resize events
- Use passive event listeners
- Minimize DOM manipulation

#### Vite Build Optimization

- Tree-shaking unused code
- Minification and compression
- Asset versioning (cache busting)

### Performance Targets

- **Lighthouse Score:** 90+ (all categories)
- **First Contentful Paint (FCP):** < 1.5s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Cumulative Layout Shift (CLS):** < 0.1
- **Time to Interactive (TTI):** < 3.5s

## Development Phases & Milestones

### Phase 1: Project Setup (Week 1)

- [x] Initialize Git repository with GitFlow
- [x] Set up Vite project structure
- [x] Configure ESLint, Prettier, Husky
- [x] Create Docker configurations
- [x] Set up GitHub Actions workflows
- [x] Write README.md and AGENTS.md
- [x] Initial commit to `main` branch

### Phase 2: Design System Implementation (Week 1-2)

- [x] Extract design tokens from Figma
- [x] Create CSS custom properties (variables)
- [x] Implement typography system
- [x] Set up color palettes (light/dark themes)
- [x] Create base CSS (reset, utilities)

### Phase 3: Component Development (Week 2-4)

- [x] Build HTML structure (semantic markup)
- [x] Implement Header component (mobile + desktop)
- [x] Create Hero section
- [x] Build Pioneer Card component (featured + clickable)
- [x] Develop Carousel component (vanilla JS)
- [x] Implement Modal system
- [x] Create Timeline component
- [x] Build Resources section
- [x] Implement Footer

### Phase 4: Interactivity & Features (Week 4-5)

- [ ] Implement theme switcher
- [ ] Add carousel functionality (touch, keyboard)
- [ ] Develop modal interactions
- [ ] Create scroll animations
- [ ] Implement mobile navigation
- [ ] Add hover effects and transitions

### Phase 5: Content Integration (Week 5)

- [ ] Add pioneer data (4 featured + 6 more)
- [ ] Insert timeline historical content
- [ ] Add resources content
- [ ] Optimize and compress images
- [ ] Test all interactive elements

### Phase 6: Testing & Optimization (Week 6)

- [ ] Accessibility audit and fixes
- [ ] Cross-browser testing
- [ ] Performance optimization
- [ ] Lighthouse audit (target 90+)
- [ ] Mobile/tablet/desktop testing
- [ ] Code review and refactoring

### Phase 7: Deployment (Week 6-7)

- [ ] Set up Google Cloud Project
- [ ] Configure Cloud Run services
- [ ] Test staging deployment (`latest` tag)
- [ ] Create first stable release (`v1.0.0`)
- [ ] Deploy to production
- [ ] Monitor and document deployment

### Phase 8: Documentation & Portfolio (Week 7)

- [ ] Complete README with screenshots
- [ ] Write technical blog post (optional)
- [ ] Create video walkthrough (optional)
- [ ] Update portfolio website
- [ ] Share project on GitHub

## Success Criteria

### Technical Requirements

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Both light and dark themes working
- ✅ Custom carousel functioning smoothly
- ✅ Modal system accessible and functional
- ✅ All animations smooth (60fps)
- ✅ Zero ESLint errors
- ✅ Code formatted consistently (Prettier)
- ✅ All Git commits follow convention

### Quality Metrics

- ✅ Lighthouse score: 90+ (all categories)
- ✅ WCAG 2.1 Level AA compliant
- ✅ Zero console errors
- ✅ Works on Chrome, Firefox, Safari, Edge (latest versions)
- ✅ Docker builds successfully (dev + prod)
- ✅ CI/CD pipelines pass all checks

### Portfolio Requirements

- ✅ Clean, professional codebase
- ✅ Comprehensive README
- ✅ Live deployment on Cloud Run
- ✅ Demonstrates best practices
- ✅ Showcases vanilla JS skills

### Maintenance

- Regular dependency updates
- Security patches
- Performance monitoring
- Analytics integration (if needed)
- User feedback collection

## 16. Resources & References

### Documentation

- [Vite Documentation](https://vitejs.dev/)
- [BEM Methodology](https://getbem.com/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Google Cloud Run Docs](https://cloud.google.com/run/docs)
- [Gitmoji](https://gitmoji.dev/) - Emoji guide for commit messages
- [GitFlow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
- [Semantic Versioning](https://semver.org/)

### Tools

- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Can I Use](https://caniuse.com/)

## Conclusion

This MASTERPLAN serves as the comprehensive blueprint for the TechPioneers project. It outlines the technical architecture, development workflow, deployment strategy, and success criteria needed to deliver a high-quality portfolio piece.

The project demonstrates proficiency in:

- Modern frontend development (vanilla JavaScript)
- Professional DevOps practices
- Accessibility and performance optimization
- Clean code and best practices
- CI/CD and cloud deployment

---

**Document Version:** 1.0.0  
**Last Updated:** November 1, 2025  
**Author:** Mauricio Oliveda  
**Project Status:** Planning Phase
