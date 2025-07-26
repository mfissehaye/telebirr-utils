# GitHub Publishing Setup Guide

Your `@mfissehaye/telebirr-utils` package has been configured for automatic publishing to npm when you push changes to the main branch. Here's what you need to do to complete the setup:

## 1. Create GitHub Repository

1. Go to GitHub and create a new repository named `telebirr-utils`
2. Make sure the repository is public (required for npm publishing)
3. Initialize it without README, .gitignore, or license (since we already have these files)

## 2. Push Your Code to GitHub

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit: Telebirr utils package"

# Add your GitHub repository as origin
git remote add origin https://github.com/mfissehaye/telebirr-utils.git

# Push to main branch
git branch -M main
git push -u origin main
```

## 3. Set Up npm Publishing Token

1. Log into your npm account at [npmjs.com](https://www.npmjs.com)
2. Go to your profile settings → Access Tokens
3. Generate a new "Automation" token (not "Publish")
4. Copy the token value

## 4. Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secret:
   - **Name**: `NPM_TOKEN`
   - **Value**: The npm token you copied in step 3

## 5. Test the Setup

### Option A: Manual Publishing (First Time)
```bash
# Build the package
pnpm run build

# Login to npm (if not already logged in)
npm login

# Publish manually for the first time
pnpm publish
```

### Option B: Automatic Publishing
1. Make any small change to your package (e.g., update version in package.json to 1.0.1)
2. Commit and push to main branch
3. GitHub Actions will automatically build and publish the package

## 6. Verify Publishing

1. Check the **Actions** tab in your GitHub repository to see the workflow status
2. Visit your package page: https://www.npmjs.com/package/@mfissehaye/telebirr-utils
3. Test installation: `npm install @mfissehaye/telebirr-utils`

## How the Automation Works

- **Trigger**: Any push to the `main` branch
- **Process**: 
  1. Runs tests and builds the package
  2. Checks if the version in package.json has changed compared to the published version
  3. If version changed, publishes to npm
  4. Creates a GitHub release with the version tag

## Version Management

To publish a new version:

1. Update the version in `package.json`:
   ```json
   {
     "version": "1.0.1"
   }
   ```

2. Commit and push:
   ```bash
   git add package.json
   git commit -m "Bump version to 1.0.1"
   git push origin main
   ```

3. GitHub Actions will automatically publish the new version

## Troubleshooting

### Common Issues:

1. **npm token invalid**: Make sure you created an "Automation" token, not a "Publish" token
2. **Package name conflict**: If someone else has the package name, you'll need to change it in package.json
3. **Build fails**: Check that all dependencies are correctly specified and the TypeScript builds without errors

### Debugging:

- Check the Actions tab in GitHub for detailed error logs
- Ensure your package.json version is higher than the currently published version
- Verify that the npm token has the correct permissions

## Next Steps

Once everything is set up:

1. Your package will be automatically published when you push version changes
2. You can share your package with others using: `npm install @mfissehaye/telebirr-utils`
3. Consider adding more comprehensive tests before publishing
4. Update documentation as needed

That's it! Your package is now ready for automated publishing to npm via GitHub Actions.