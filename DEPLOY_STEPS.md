# 🚀 Deploy to GitHub - Visual Guide

## The Quick Path (Copy & Paste)

```
Your Computer              GitHub              Live on Internet
     ↓                        ↓                       ↓
  Local Files      →    Create Repo    →    GitHub Pages
  (HTML/CSS/JS)        Push Code          https://your.github.io/
```

---

## 📋 Step-by-Step Instructions

### **STEP 1: Open PowerShell**

Windows key → Type `PowerShell` → Click it

```powershell
# A blue/dark window opens
# Paste commands below
```

---

### **STEP 2: Go to Your Project**

Copy & paste this:

```powershell
cd "c:\Users\jumer\Downloads\challenge\pricing-calculator"
```

Press Enter ✓

---

### **STEP 3: Initialize Git**

Copy & paste this entire block:

```powershell
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"
git add .
git commit -m "Initial commit: Phoenix pricing calculator app"
```

Press Enter ✓

**You should see:**
```
create mode 100644 index.html
create mode 100644 style.css
create mode 100644 app.js
[main (root-commit) xxxxx] Initial commit...
```

---

### **STEP 4: Create GitHub Repository**

1. Open: https://github.com/new
2. Fill in:
   - **Repository name:** `price-calculator`
   - **Description:** `Phoenix Experiment Pricing Calculator`
   - **Public:** ✓ Check it
3. Click **"Create repository"**

---

### **STEP 5: GitHub Shows You Commands**

After clicking Create, GitHub displays 3 commands.

**Copy the section that says:**
```
…or push an existing repository from the command line
```

It looks like:
```
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/price-calculator.git
git push -u origin main
```

---

### **STEP 6: Paste Into PowerShell**

Go back to PowerShell and paste those 3 lines.

Press Enter ✓

**Wait for it to complete** (1-2 minutes)

---

### **STEP 7: Enable GitHub Pages**

1. Go to your repo: `https://github.com/YOUR_USERNAME/price-calculator`
2. Click the **Settings** tab (gear icon)
3. Left sidebar → Click **Pages**
4. Under "Build and deployment":
   - Source: Select **"Deploy from a branch"**
   - Branch: Select **"main"**
   - Folder: Select **"/ (root)"**
5. Click **Save**

---

### **STEP 8: Wait for Deployment**

⏱️ **Wait 1-2 minutes...**

GitHub Pages is building your site.

---

### **STEP 9: Visit Your Live App! 🎉**

Go to:
```
https://YOUR_USERNAME.github.io/price-calculator/
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

---

## ✅ Verification Checklist

As you complete each step, check it off:

```
☐ PowerShell opened
☐ Changed to project directory
☐ Ran git init
☐ Ran git config
☐ Ran git add .
☐ Ran git commit
☐ Created GitHub repository
☐ Ran git branch -M main
☐ Ran git remote add origin
☐ Ran git push -u origin main
☐ Went to Settings → Pages
☐ Configured GitHub Pages
☐ Waited 2 minutes
☐ Visited live URL
☐ App is working! 🚀
```

---

## 🎯 Final Check

Your app is live if you see:
- ✅ The calculator loads
- ✅ Settings panel works
- ✅ Can fill in form
- ✅ Calculate button works
- ✅ Download opens a file

---

## 🔄 Making Updates

Next time you want to update:

```powershell
cd "c:\Users\jumer\Downloads\challenge\pricing-calculator"
git add .
git commit -m "Your change description"
git push
```

**Done!** Changes live within 1 minute.

---

## 📱 Share Your App

Share this link with anyone:
```
https://YOUR_USERNAME.github.io/price-calculator/
```

They can use it right away in their browser!

---

## 🆘 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| "git not found" | Install Git: https://git-scm.com |
| "fatal: not a git repository" | Make sure you're in the right folder (`cd ...`) |
| "Authentication failed" | Create token: https://github.com/settings/tokens |
| "App shows blank" | Hard refresh: `Ctrl+F5` or wait 2 minutes |
| "404 Not Found" | Check username in URL, wait for deploy |

---

## 🎉 You Did It!

Your **Phoenix Price Calculator** is now:
- 🌍 Live on the internet
- 🔄 Auto-updating when you push
- 📱 Accessible from anywhere
- 💰 Free (GitHub Pages hosting)
- 🚀 Production-ready

---

**Questions?** Check the full guide in `GITHUB_SETUP.md`

**Deployed successfully!** ✨
