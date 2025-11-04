#!/bin/bash

# סקריפט התקנה עבור StrikeGuide
# Installation script for StrikeGuide

echo "🔥⚖️  התקנת StrikeGuide..."
echo "Installing StrikeGuide..."

# בדיקה אם Node.js מותקן
if ! command -v node &> /dev/null; then
    echo "❌ Node.js לא נמצא. אנא התקן Node.js מ-https://nodejs.org/"
    echo "❌ Node.js not found. Please install Node.js from https://nodejs.org/"
    exit 1
fi

# בדיקה אם npm מותקן
if ! command -v npm &> /dev/null; then
    echo "❌ npm לא נמצא. אנא התקן npm."
    echo "❌ npm not found. Please install npm."
    exit 1
fi

echo "✅ Node.js ו-npm נמצאו"
echo "✅ Node.js and npm found"

# התקנת תלויות עבור UI
if [ -d "UI" ]; then
    echo ""
    echo "📦 מתקין תלויות עבור ממשק המשתמש..."
    echo "📦 Installing dependencies for UI..."
    cd UI
    npm install
    if [ $? -eq 0 ]; then
        echo "✅ התלויות הותקנו בהצלחה!"
        echo "✅ Dependencies installed successfully!"
    else
        echo "❌ שגיאה בהתקנת התלויות"
        echo "❌ Error installing dependencies"
        exit 1
    fi
    cd ..
fi

echo ""
echo "✅ ההתקנה הושלמה בהצלחה!"
echo "✅ Installation completed successfully!"
echo ""
echo "כדי להפעיל את הממשק, הרץ:"
echo "To run the UI, execute:"
echo "  cd UI && npm run dev"
echo ""

