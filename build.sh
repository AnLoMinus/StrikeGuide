#!/bin/bash

# סקריפט בנייה עבור StrikeGuide
# Build script for StrikeGuide

echo "🔨 בניית StrikeGuide..."
echo "Building StrikeGuide..."

# בדיקה אם Node.js מותקן
if ! command -v node &> /dev/null; then
    echo "❌ Node.js לא נמצא. אנא התקן Node.js מ-https://nodejs.org/"
    exit 1
fi

# בניית UI
if [ -d "UI" ]; then
    echo ""
    echo "📦 בונה את ממשק המשתמש..."
    echo "📦 Building UI..."
    cd UI
    
    # בדיקה אם התלויות מותקנות
    if [ ! -d "node_modules" ]; then
        echo "📦 מתקין תלויות..."
        npm install
    fi
    
    # בנייה
    npm run build
    if [ $? -eq 0 ]; then
        echo "✅ הבנייה הושלמה בהצלחה!"
        echo "✅ Build completed successfully!"
        echo ""
        echo "הקבצים הבנויים נמצאים ב: UI/dist/"
        echo "Built files are in: UI/dist/"
    else
        echo "❌ שגיאה בבנייה"
        echo "❌ Build error"
        exit 1
    fi
    cd ..
fi

echo ""
echo "✅ תהליך הבנייה הושלם!"
echo "✅ Build process completed!"

