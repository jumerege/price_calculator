# 🚀 Phoenix Price Calculator - GitHub Deployment Guide

## Your GitHub Repository

Once deployed, your app will be available at:
```
https://github.com/yourusername/price-calculator
https://yourusername.github.io/price-calculator/
```

---

## ✅ Quick Deployment (5 Minutes)

### Step 1️⃣: Install Git (if you don't have it)

**Windows:**
- Download from: https://git-scm.com/download/win
- Install with default settings
- Restart PowerShell

**Check if Git is installed:**
```powershell
git --version
```

---

### Step 2️⃣: Initialize Git in Your Project

Open **PowerShell** and run:

```powershell
cd "c:\Users\jumer\Downloads\challenge\pricing-calculator"
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"
git add .
git commit -m "Initial commit: Phoenix pricing calculator app"
```

---

### Step 3️⃣: Create GitHub Repository

1. Go to: https://github.com/new
2. Fill in:
   - **Repository name:** `price-calculator`
   - **Description:** Phoenix Experiment Pricing Calculator for ATMOS Space Cargo
   - **Visibility:** Public ✓
3. **Uncheck** "Initialize this repository with a README"
4. Click **Create repository**

---

### Step 4️⃣: Push to GitHub

GitHub shows you a command. Copy this and paste in PowerShell:

```powershell
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/price-calculator.git
git push -u origin main
```

**Replace `YOUR_USERNAME` with your GitHub username!**

---

### Step 5️⃣: Enable GitHub Pages

1. Go to your repo: `https://github.com/YOUR_USERNAME/price-calculator`
2. Click **Settings** tab
3. Left sidebar → **Pages**
4. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
5. Click **Save**

---

### Step 6️⃣: Visit Your App! 🎉

Wait 30 seconds, then go to:
```
https://YOUR_USERNAME.github.io/price-calculator/
```

**Your calculator is now live on the internet!**

---

## 📁 What Gets Uploaded

```
price-calculator/
├── index.html           ✓
├── style.css            ✓
├── app.js               ✓
├── README.md            ✓
├── QUICK_START.md       ✓
├── DEPLOY_GITHUB.md     ✓
├── package.json         ✓
└── .gitignore           ✓
```

---

## 🔄 Update Your App Later

When you make changes:

```powershell
cd "c:\Users\jumer\Downloads\challenge\pricing-calculator"
git add .
git commit -m "Update: describe your changes"
git push
```

GitHub Pages auto-updates! (within 1 minute)

---

## 📋 Checklist

- [ ] Git installed
- [ ] Navigated to project folder
- [ ] Ran `git init` and `git add .`
- [ ] Committed: `git commit -m "..."`
- [ ] Created repo on GitHub
- [ ] Ran `git push -u origin main`
- [ ] Enabled GitHub Pages
- [ ] Visited your live URL
- [ ] App is working! 🚀

---

## 🆘 Troubleshooting

### Error: "fatal: not a git repository"
**Solution:** Make sure you're in the right folder
```powershell
cd "c:\Users\jumer\Downloads\challenge\pricing-calculator"
pwd  # Check current directory
```

### Error: "Please tell me who you are"
**Solution:** Configure Git
```powershell
git config user.name "Your Name"
git config user.email "your@email.com"
```

### Error: "Authentication failed"
**Solution:** Use GitHub token or SSH key
- Create personal access token: https://github.com/settings/tokens
- Or setup SSH: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

### GitHub Pages not working
- **Wait 1-2 minutes** for deployment
- Check "Settings" → "Pages" status
- Make sure branch is set to `main`
- Check `index.html` is in root folder

### App shows blank page
- Hard refresh: `Ctrl+F5`
- Check browser console: `F12` → Console tab
- Verify all 3 files (HTML, CSS, JS) loaded

---

## 🎯 Success!

Once deployed, your calculator is:
- ✅ Live on the internet
- ✅ Accessible from anywhere
- ✅ Shareable via URL
- ✅ Free to host (GitHub Pages)
- ✅ Auto-updated when you push

---

## 📊 Share Your App

**Direct link:**
```
https://yourusername.github.io/price-calculator/
```

**Share with others:**
```
Check out the Phoenix Pricing Calculator:
https://yourusername.github.io/price-calculator/
```

---

## 🔐 Next Steps

1. **Add collaborators:** Settings → Collaborators
2. **Enable issues:** For tracking feedback
3. **Add CI/CD:** Auto-test with GitHub Actions
4. **Create releases:** Tag versions
5. **Write documentation:** In Wiki

---

**Need help?** See these guides:
- https://docs.github.com/en/get-started/importing-your-projects-to-github
- https://docs.github.com/en/pages/getting-started-with-github-pages
- https://docs.github.com/en/authentication

---

**Version:** 1.0 | **Status:** Ready to Deploy ✅
