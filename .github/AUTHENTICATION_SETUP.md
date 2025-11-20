# Environment Authentication Setup Guide

## Overview

This guide explains how to configure HTTP Basic Authentication for non-production environments. All environments (Development, Staging, and Preview) are now password-protected, while Production remains publicly accessible.

## Architecture

### Protected Environments

- **Development** (`develop` branch) - Password protected
- **Staging** (`release/**` branches) - Password protected
- **Preview** (Pull Requests) - Password protected

### Public Environment

- **Production** (`main` branch) - Publicly accessible (no password)

## Required GitHub Secrets

You need to configure the following secrets in your GitHub repository settings:

### Development Environment

- `DEV_AUTH_USERNAME` - Username for development environment
- `DEV_AUTH_PASSWORD` - Password for development environment

### Staging Environment

- `STAGING_AUTH_USERNAME` - Username for staging environment
- `STAGING_AUTH_PASSWORD` - Password for staging environment

### Preview Environment

- `PREVIEW_AUTH_USERNAME` - Username for preview environments (shared across all PRs)
- `PREVIEW_AUTH_PASSWORD` - Password for preview environments (shared across all PRs)

## How to Add GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret with its name and value
5. Click **Add secret**

### Recommended Password Strategy

#### Option 1: Simple Shared Credentials

Use the same username/password across all non-production environments:

```text
DEV_AUTH_USERNAME=techpioneers
DEV_AUTH_PASSWORD=Dev2024!Secure

STAGING_AUTH_USERNAME=techpioneers
STAGING_AUTH_PASSWORD=Staging2024!Secure

PREVIEW_AUTH_USERNAME=techpioneers
PREVIEW_AUTH_PASSWORD=Preview2024!Secure
```

#### Option 2: Role-Based Credentials

Use different credentials for different teams:

```text
# Development (Developers only)
DEV_AUTH_USERNAME=developer
DEV_AUTH_PASSWORD=DevTeam2024!

# Staging (QA, Product, Stakeholders)
STAGING_AUTH_USERNAME=qa-team
STAGING_AUTH_PASSWORD=QAStaging2024!

# Preview (Anyone reviewing PRs)
PREVIEW_AUTH_USERNAME=reviewer
PREVIEW_AUTH_PASSWORD=PRReview2024!
```

#### Option 3: Environment-Specific Security Levels

Match password strength to environment sensitivity:

```text
# Development (Less sensitive - synthetic data)
DEV_AUTH_USERNAME=dev
DEV_AUTH_PASSWORD=devpass123

# Staging (More sensitive - production-like data)
STAGING_AUTH_USERNAME=staging-user
STAGING_AUTH_PASSWORD=Staging!2024!Very!Secure

# Preview (Medium security - fake data)
PREVIEW_AUTH_USERNAME=preview
PREVIEW_AUTH_PASSWORD=PreviewSecure2024
```

## Password Requirements

While there are no strict technical requirements, we recommend:

- **Minimum length:** 12 characters
- **Include:** Uppercase, lowercase, numbers, and special characters
- **Avoid:** Common words, dictionary terms, or easily guessable patterns
- **Rotate:** Change passwords periodically (quarterly recommended)

## Accessing Protected Environments

### Browser Access

When you visit a protected environment URL, your browser will prompt for credentials:

```text
Username: [Enter the environment-specific username]
Password: [Enter the environment-specific password]
```

**Note:** Most browsers will remember these credentials for the session.

### Programmatic Access (CI/CD, Testing Tools)

Use Basic Authentication in HTTP requests:

```bash
# Using curl
curl -u username:password https://your-environment-url.run.app

# Using wget
wget --user=username --password=password https://your-environment-url.run.app

# In URL format (use with caution - credentials visible)
https://username:password@your-environment-url.run.app
```

### Automated Testing

For automated tests (e.g., Playwright, Cypress), configure authentication:

#### Playwright Example

```javascript
// playwright.config.js
export default {
  use: {
    httpCredentials: {
      username: process.env.AUTH_USERNAME,
      password: process.env.AUTH_PASSWORD,
    },
  },
};
```

#### Cypress Example

```javascript
// cypress.config.js
export default {
  env: {
    auth: {
      username: process.env.AUTH_USERNAME,
      password: process.env.AUTH_PASSWORD,
    },
  },
};
```

## Deployment Information

### Where Credentials Are Displayed

After deployment, credentials are shown in:

1. **GitHub Actions Logs** - Visible in workflow run output
2. **GitHub Actions Summary** - Staging environment shows credentials in the summary
3. **PR Comments** - Preview deployments include credentials in the comment

**Security Note:** These credentials are only visible to users with repository access.

## Troubleshooting

### Issue: Authentication Not Working

**Symptoms:** Browser keeps prompting for credentials

**Solutions:**

1. Verify secrets are correctly set in GitHub repository settings
2. Check that the workflow used the correct secret names
3. Ensure no extra spaces in username/password values
4. Try using an incognito/private browser window
5. Check Docker build logs for htpasswd generation errors

### Issue: Health Check Failing

**Symptoms:** Cloud Run service fails health checks

**Solution:** The `/health` endpoint is excluded from authentication - this should not happen. If it does:

1. Check nginx configuration is correctly copied
2. Verify the `auth_basic off;` directive in `/health` location block
3. Review Cloud Run logs for detailed error messages

### Issue: Want to Change Credentials

**Steps:**

1. Update the relevant secret(s) in GitHub repository settings
2. Trigger a new deployment (push to branch or re-run workflow)
3. The new credentials will be active once deployment completes

### Issue: Need to Temporarily Disable Authentication

**For testing purposes only:**

1. Modify the workflow to use `--target production` instead of `--target protected`
2. Commit and push changes
3. **Remember to revert this change** when testing is complete

## Security Best Practices

### ✅ DO

- Use strong, unique passwords for each environment
- Rotate credentials periodically (quarterly)
- Store credentials securely (use password managers)
- Share credentials only with authorized team members
- Use different credentials for different security levels

### ❌ DON'T

- Use the same password as your GitHub account
- Share credentials in public channels (Slack, email)
- Hardcode credentials in source code
- Use weak or common passwords
- Keep deprecated credentials active

## Architecture Details

### Docker Build Targets

The Dockerfile includes two production-ready targets:

#### `production` Target

- No authentication
- Used for production environment only
- Public access allowed

#### `protected` Target

- HTTP Basic Authentication enabled
- Uses `nginx.protected.conf` configuration
- Credentials set via Docker build arguments
- Used for Development, Staging, and Preview environments

### Nginx Configuration

Two nginx configuration files:

#### `nginx.conf` (Public)

- Standard configuration
- No authentication
- Used by production builds

#### `nginx.protected.conf` (Protected)

- Includes `auth_basic` directives
- References `/etc/nginx/.htpasswd` file
- Health check endpoint (`/health`) excluded from authentication
- Used by protected builds

### Password File Generation

Passwords are hashed using Apache's `htpasswd` utility during Docker build:

```dockerfile
RUN htpasswd -cb /etc/nginx/.htpasswd ${AUTH_USERNAME} ${AUTH_PASSWORD}
```

This creates a bcrypt-hashed password file that nginx uses for authentication.

## Environment Variables Summary

| Environment | Username Secret         | Password Secret         | Access Level |
| ----------- | ----------------------- | ----------------------- | ------------ |
| Development | `DEV_AUTH_USERNAME`     | `DEV_AUTH_PASSWORD`     | Protected    |
| Staging     | `STAGING_AUTH_USERNAME` | `STAGING_AUTH_PASSWORD` | Protected    |
| Preview     | `PREVIEW_AUTH_USERNAME` | `PREVIEW_AUTH_PASSWORD` | Protected    |
| Production  | N/A                     | N/A                     | Public       |

## Questions?

If you have questions or need assistance:

1. Check this guide first
2. Review GitHub Actions workflow logs
3. Consult with your DevOps team
4. Refer to nginx documentation for advanced configurations

---

**Last Updated:** 2024
**Version:** 1.0.0
