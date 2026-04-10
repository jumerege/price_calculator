#!/bin/bash
# Automated deployment script for GitHub
# Run this after creating your GitHub repository

echo "🚀 Phoenix Price Calculator - GitHub Deployment"
echo "================================================"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first:"
    echo "   https://git-scm.com/download/win"
    exit 1
fi

echo "✅ Git is installed"
echo ""

# Initialize repo
echo "📦 Initializing git repository..."
git init
git config user.name "ATMOS Developer"
git config user.email "dev@atmos-space-cargo.com"

echo "📝 Adding files..."
git add .

echo "💾 Creating initial commit..."
git commit -m "Initial commit: Phoenix pricing calculator app"

echo ""
echo "🔗 Next steps:"
echo "1. Create a new repository on GitHub:"
echo "   https://github.com/new"
echo ""
echo "2. Name it: price-calculator"
echo ""
echo "3. Copy the commands GitHub gives you and run them:"
echo "   git branch -M main"
echo "   git remote add origin https://github.com/YOUR_USERNAME/price-calculator.git"
echo "   git push -u origin main"
echo ""
echo "4. Enable GitHub Pages in Settings"
echo ""
echo "5. Your app will be live at:"
echo "   https://YOUR_USERNAME.github.io/price-calculator/"
echo ""
echo "✨ Done! Your calculator is ready to deploy!"
