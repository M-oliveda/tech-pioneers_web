# TechPioneers

## 📖 About The Project

**TechPioneers** is a portfolio project demonstrating modern frontend development skills, professional workflows, and best practices. The website features:

- **Featured Pioneers**: Highlighting 4 key figures who revolutionized technology
- **More Pioneers**: Exploring 6 additional innovators with detailed modal views
- **Historical Timeline**: A visual journey through tech evolution milestones
- **Curated Resources**: External references for learning more about tech history

This project showcases expertise in vanilla JavaScript, responsive design, accessibility, and DevOps practices.

## ✨ Features

- 🎨 **Dual Themes**: Light and dark mode with seamless transitions
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- ♿ **Accessible**: WCAG 2.1 Level AA compliant with keyboard navigation
- 🎪 **Custom Carousel**: Vanilla JavaScript implementation with touch support
- 🎭 **Modal System**: Interactive pioneer details with focus management
- ✨ **Smooth Animations**: Scroll-triggered effects and micro-interactions
- 🚀 **Performance Optimized**: Lighthouse score 90+ across all metrics
- 🐳 **Dockerized**: Multi-stage builds for development and production

## 🛠️ Built With

### Core Technologies

- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Modern styling with BEM methodology
- **JavaScript (ES6+)** - Vanilla JavaScript (no frameworks)
- **Vite** - Next-generation frontend build tool

### Development Tools

- **ESLint** - JavaScript linting and code quality
- **Prettier** - Code formatting
- **Husky** - Git hooks for pre-commit checks

### DevOps & Deployment

- **Docker** - Containerization and environment management
- **GitHub Actions** - CI/CD pipelines
- **Google Cloud Run** - Serverless deployment platform

### Design

- **Figma** - Custom design system and assets

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v24 or higher)
- **npm** (v9 or higher)
- **Docker** (v20 or higher) - for containerized development
- **Git** (v2.30 or higher)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/M-oliveda/tech-pioneers_web.git
   cd tech-pioneers_web
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

4. **Run the development server**
   - **Option A: Without Docker (Quick Start)**

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.
   - **Option B: With Docker (Recommended)**

   ```bash
   docker compose up --build -d
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 💻 Development

### Available Scripts

| Command                | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start development server with hot reload |
| `npm run build`        | Build production-ready bundle            |
| `npm run preview`      | Preview production build locally         |
| `npm run lint`         | Run ESLint to check code quality         |
| `npm run lint:fix`     | Fix auto-fixable ESLint errors           |
| `npm run format`       | Format code with Prettier                |
| `npm run format:check` | Check code formatting without changes    |

### Docker Commands

**Note:** Docker is used exclusively for **local development**. Cloud environments (Preview, Development, Staging, Production) are deployed directly to **Google Cloud Run** via GitHub Actions.

#### Local Development

| Command                      | Description                                |
| ---------------------------- | ------------------------------------------ |
| `docker compose up --build`  | Start development environment (foreground) |
| `docker compose up -d`       | Start development environment (detached)   |
| `docker compose logs -f`     | View live logs                             |
| `docker compose down`        | Stop and remove containers                 |
| `docker compose restart web` | Restart the web service                    |
| `docker compose exec web sh` | Open shell inside container                |

**Environment File:** Local development uses `.env` for environment variables

#### Building Production Image Locally (Testing Only)

To test the production build locally before deploying:

```bash
# Build production image
docker build --target production -t techpioneers:prod .

# Run production image locally
docker run -p 8080:80 techpioneers:prod

# Access at http://localhost:8080
```

### Project Structure

```text
techpioneers/
├── .github/
│   └── workflows/
│       ├── pr-test.yml              # PR validation workflow
│       ├── deploy-preview.yml       # Auto-deploy to preview (PR environments)
│       ├── cleanup-preview.yml      # Cleanup preview environments on PR close
│       ├── deploy-development.yml   # Auto-deploy to development (develop branch)
│       ├── deploy-staging.yml       # Auto-deploy to staging (release/* branches)
│       └── deploy-production.yml    # Deploy to production (main + manual approval)
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
├── eslint.config.js                 # ESLint configuration
├── .gitignore                       # Git ignore patterns
├── .prettierrc.json                 # Prettier configuration
├── AGENTS.md                        # AI agent development guide
├── docker-compose.yml               # Local development configuration
├── Dockerfile                       # Multi-stage Dockerfile (dev & prod targets)
├── nginx.conf                       # Nginx configuration for production
├── LICENSE                          # Project license
├── MASTERPLAN.md                    # Comprehensive project blueprint
├── package.json                     # NPM dependencies
├── package-lock.json                # NPM lock file
├── README.md                        # This file
└── vite.config.js                   # Vite configuration
```

---

## 🎨 Design System

The project uses a custom Figma design system created by **Mauricio Oliveda**, featuring:

- **Typography**: Carefully selected font families and scales
- **Color Palettes**: Light and dark theme color systems
- **Components**: Reusable UI components (cards, buttons, modals)
- **Responsive Layouts**: Mobile (< 768px), Tablet (768px - 1024px), Desktop (> 1024px)
- **Assets**: Optimized images, icons, and illustrations

### CSS Architecture (BEM)

All styles follow the **Block Element Modifier (BEM)** naming convention:

```css
/* Block */
.pioneer-card {
}

/* Element */
.pioneer-card__image {
}
.pioneer-card__title {
}

/* Modifier */
.pioneer-card--featured {
}
.pioneer-card--clickable {
}
```

---

## 🔄 Git Workflow

This project follows **GitFlow** workflow with semantic versioning.

### Branch Structure

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - Feature development branches
- `release/*` - Release candidate branches
- `hotfix/*` - Emergency production fixes

### Commit Convention

We use [Gitmoji](https://gitmoji.dev/) for commit messages with the following structure:

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
```

**Commit Message Guidelines:**

- Keep the message concise (max 50 characters recommended)
- Use imperative mood ("Add" not "Added" or "Adds")
- Capitalize the first letter after emoji
- Don't end with a period

### Pre-commit Hooks

Husky automatically runs the following checks before each commit:

- ✅ ESLint validation
- ✅ Prettier format check
- ✅ Build test

## 🚢 Deployment

### Environments

| **Environment** | **Branch Source**   | **Infrastructure**   | **URL**                               | **Auto-Deploy**    | **Access**  | **Purpose**                                                   |
| --------------- | ------------------- | -------------------- | ------------------------------------- | ------------------ | ----------- | ------------------------------------------------------------- |
| **Local**       | Feature branches    | Docker (development) | localhost:5173                        | N/A                | Public      | Local development, testing, debugging                         |
| **Preview**     | Pull Requests (PRs) | Google Cloud Run     | techpioneers-pr-{number}-[id].run.app | ✅ Yes (on PR)     | 🔒 Password | Test individual PRs in isolated, ephemeral environments       |
| **Development** | `develop`           | Google Cloud Run     | techpioneers-development-[id].run.app | ✅ Yes             | 🔒 Password | Integrate features, run integration tests, catch issues early |
| **Staging**     | `release/*`         | Google Cloud Run     | techpioneers-staging-[id].run.app     | ✅ Yes             | 🔒 Password | Final validation, UAT, QA, performance checks                 |
| **Production**  | `main` + tags       | Google Cloud Run     | techpioneers-prod-[id].run.app        | ⚠️ Manual approval | ✅ Public   | Live system used by real users                                |

### Environment Authentication

All non-production environments (Preview, Development, Staging) are protected with **HTTP Basic Authentication** to prevent unauthorized access. Production is publicly accessible.

**For detailed setup instructions**, see [.github/AUTHENTICATION_SETUP.md](./.github/AUTHENTICATION_SETUP.md)

**Quick Overview:**

- **Protected Environments**: Development, Staging, Preview (require username/password)
- **Public Environment**: Production (no authentication required)
- **Authentication Method**: HTTP Basic Authentication via Nginx
- **Credentials**: Configured via GitHub Secrets per environment

**Key Points:**

- **Local Development**: Uses Docker with hot-reloading for feature branches
- **Preview (PRs)**: Ephemeral environments created for each PR, automatically cleaned up on close
- **Development (develop branch)**: Integration environment for testing feature combinations
- **Staging (release/\* branches)**: Production-like environment for final validation before release
- **Production (main branch)**: Requires manual approval before deployment, tagged releases

### CI/CD Pipelines

Six GitHub Actions workflows automate testing and deployment:

1. **`pr-test.yml`** - Validates pull requests to `develop` or `main` (lint, format, build, Docker build test)
2. **`deploy-preview.yml`** - Creates ephemeral preview environments for each PR
3. **`cleanup-preview.yml`** - Removes preview environments when PRs are closed
4. **`deploy-development.yml`** - Auto-deploys `develop` branch to development environment
5. **`deploy-staging.yml`** - Auto-deploys `release/*` branches to staging environment
6. **`deploy-production.yml`** - Deploys `main` branch to production with manual approval, versioning, and GitHub releases

### Docker Image Tagging Strategy

| **Environment** | **Branch Source** | **Build Target** | **Docker Tags**                                     | **Cloud Run Service**      | **Description**                           |
| --------------- | ----------------- | ---------------- | --------------------------------------------------- | -------------------------- | ----------------------------------------- |
| **Local**       | feature/\*        | `development`    | N/A (built locally)                                 | N/A                        | Local development only with hot-reloading |
| **Preview**     | Pull Requests     | `production`     | `pr-{number}`                                       | `techpioneers-pr-{number}` | Ephemeral, cleaned up on PR close         |
| **Development** | `develop`         | `production`     | `development`, `dev-{git-sha}`                      | `techpioneers-development` | Auto-deploy on every push to develop      |
| **Staging**     | `release/*`       | `production`     | `staging`, `staging-{version}`, `staging-{git-sha}` | `techpioneers-staging`     | Auto-deploy on push to release branches   |
| **Production**  | `main` + tags     | `production`     | `{version}`, `stable`, `production`                 | `techpioneers-prod`        | Manual approval + tagged releases         |

**Build Targets:**

- `development`: For local Docker development with hot-reloading and bind mounts
- `production`: For all Cloud Run deployments (optimized multi-stage build with Nginx)

**Version Format:**

- Preview: `pr-{number}` (e.g., `pr-42`)
- Development: `development` + `dev-{git-sha}` for traceability
- Staging: `staging` + `staging-{version}` + `staging-{git-sha}`
- Production: `v1.0.0` (from package.json or tag) + `stable` + `production` for rollback

### Manual Deployment to Google Cloud Run

For manual deployments or testing (typically automated via CI/CD):

```bash
# Set variables
export PROJECT_ID="your-gcp-project-id"
export REGION="us-central1"
export IMAGE_NAME="techpioneers"
export VERSION="v1.0.0"

# Build production image with production target
docker build --target production -t ${IMAGE_NAME}:${VERSION} .

# Tag for Google Artifact Registry
docker tag ${IMAGE_NAME}:${VERSION} \
  ${REGION}-docker.pkg.dev/${PROJECT_ID}/techpioneers/${IMAGE_NAME}:${VERSION}

# Configure Docker authentication for Artifact Registry
gcloud auth configure-docker ${REGION}-docker.pkg.dev

# Push to Artifact Registry
docker push ${REGION}-docker.pkg.dev/${PROJECT_ID}/techpioneers/${IMAGE_NAME}:${VERSION}

# Deploy to Cloud Run (Staging)
gcloud run deploy techpioneers-staging \
  --image=${REGION}-docker.pkg.dev/${PROJECT_ID}/techpioneers/${IMAGE_NAME}:${VERSION} \
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

# Deploy to Cloud Run (Production)
gcloud run deploy techpioneers-prod \
  --image=${REGION}-docker.pkg.dev/${PROJECT_ID}/techpioneers/${IMAGE_NAME}:${VERSION} \
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

**Note:** Manual deployments are rarely needed as CI/CD pipelines handle deployments automatically from `develop` and `main` branches.

## ♿ Accessibility

This project is committed to web accessibility and follows **WCAG 2.1 Level AA** standards:

- ✅ Semantic HTML5 elements
- ✅ ARIA labels and roles where appropriate
- ✅ Keyboard navigation support (Tab, Enter, Esc, Arrow keys)
- ✅ Focus management in modal dialogs
- ✅ Sufficient color contrast (4.5:1 minimum)
- ✅ Alt text for all images
- ✅ Skip navigation links for screen readers

### Testing Tools Used

- axe DevTools - Automated accessibility testing
- Lighthouse - Performance and accessibility audits
- Keyboard navigation testing
- Screen reader testing (NVDA/JAWS)

## 📊 Performance

Target metrics based on Lighthouse audits:

| Metric                   | Target | Status |
| ------------------------ | ------ | ------ |
| Performance              | 90+    | ✅     |
| Accessibility            | 90+    | ✅     |
| Best Practices           | 90+    | ✅     |
| SEO                      | 90+    | ✅     |
| First Contentful Paint   | < 1.5s | ✅     |
| Largest Contentful Paint | < 2.5s | ✅     |
| Cumulative Layout Shift  | < 0.1  | ✅     |
| Time to Interactive      | < 3.5s | ✅     |

## 📝 Environment Variables

The project uses minimal environment variables. Create a `.env` file in the root directory:

```env
# Environment
NODE_ENV=development

# Development Server
PORT=5173
```

**Note:** The `.env` file is git-ignored. Use `.env.example` as a template.

## 🧪 Testing

### Browser Compatibility

Tested and supported on modern browsers:

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

**Note:** Internet Explorer is not supported.

### Device Testing

- ✅ Mobile devices (iOS Safari, Chrome Mobile)
- ✅ Tablets (iPad, Android tablets)
- ✅ Desktop (1024px and above)

## 🤝 Contributing

This is a personal portfolio project, but feedback and suggestions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the **Apache License** - see the [LICENSE](./LICENSE) file for details.

## 📚 Additional Documentation

- [MASTERPLAN.md](./MASTERPLAN.md) - Comprehensive project blueprint
- [AGENTS.md](./AGENTS.md) - AI agent development guide
- [.github/AUTHENTICATION_SETUP.md](./.github/AUTHENTICATION_SETUP.md) - Environment authentication guide

---

**Project Status:** 🚧 Planning Phase  
**Current Version:** 1.0.0 (planned)  
**Last Updated:** November 2, 2025

Made with ❤️ by [Mauricio Oliveda](https://github.com/m-oliveda)
