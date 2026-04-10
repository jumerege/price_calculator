# Deploy to GitHub

## Prerequisites
- Git installed on your computer
- GitHub account

## Step 1: Initialize Git Repository

Open PowerShell in the project folder:
```powershell
cd c:\Users\jumer\Downloads\challenge\pricing-calculator
git init
git add .
git commit -m "Initial commit: Phoenix pricing calculator app"
```

## Step 2: Create Repository on GitHub

1. Go to https://github.com/new
2. **Repository name:** `price-calculator`
3. **Description:** Phoenix Experiment Pricing Calculator for ATMOS Space Cargo
4. Choose **Public** (so it's accessible)
5. DO NOT initialize with README (we already have one)
6. Click **Create repository**

## Step 3: Connect Local to GitHub

GitHub will show you commands. Copy and run these in PowerShell:

```powershell
git branch -M main
git remote add origin https://github.com/yourusername/price-calculator.git
git push -u origin main
```

**Replace `yourusername` with your actual GitHub username**

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (tab)
3. Scroll down to **Pages** (left sidebar)
4. Under "Source," select **Deploy from a branch**
5. Select branch: **main**
6. Select folder: **/ (root)**
7. Click **Save**

**Your app will be live at:**
```
https://yourusername.github.io/price-calculator/
```

(Wait 1-2 minutes for GitHub Pages to build and deploy)

## Step 5: Verify It Works

Visit: `https://yourusername.github.io/price-calculator/`

Your calculator should load in the browser! 🚀

---

## Future Updates

To push updates:

```powershell
git add .
git commit -m "Your commit message"
git push
```

GitHub Pages auto-deploys when you push to main branch.

---

## Quick Reference

```powershell
# View git status
git status

# View commit history
git log

# Check remote
git remote -v

# Push changes
git push
```

---

**Need help?** Check GitHub's official guides:
- Git setup: https://docs.github.com/en/get-started
- GitHub Pages: https://docs.github.com/en/pages
