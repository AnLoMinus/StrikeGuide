#!/bin/bash

# סקריפט ליצירת ארכיון מלא של StrikeGuide
# Script to create complete archive of StrikeGuide

ARCHIVE_NAME="StrikeGuide-complete-$(date +%Y%m%d-%H%M%S).zip"
ARCHIVE_NAME_SIMPLE="StrikeGuide-complete.zip"

echo "📦 יוצר ארכיון מלא של StrikeGuide..."
echo "📦 Creating complete archive of StrikeGuide..."

# מחיקת ארכיון קודם אם קיים
if [ -f "$ARCHIVE_NAME_SIMPLE" ]; then
    echo "🗑️  מוחק ארכיון קודם..."
    rm "$ARCHIVE_NAME_SIMPLE"
fi

# יצירת הארכיון
echo "📦 דוחס קבצים..."
zip -r "$ARCHIVE_NAME_SIMPLE" . \
    -x "*.git*" \
    -x ".git/*" \
    -x "node_modules/*" \
    -x "UI/node_modules/*" \
    -x "UI/dist/*" \
    -x "*.log" \
    -x "*.zip" \
    -x "*.tar.gz" \
    -x ".DS_Store" \
    -x "Thumbs.db" \
    -x ".vscode/*" \
    -x ".idea/*" \
    -x "*.swp" \
    -x "*.swo" \
    -x "*~" \
    > /dev/null 2>&1

if [ $? -eq 0 ]; then
    SIZE=$(du -h "$ARCHIVE_NAME_SIMPLE" | cut -f1)
    echo ""
    echo "✅ הארכיון נוצר בהצלחה!"
    echo "✅ Archive created successfully!"
    echo ""
    echo "📁 קובץ: $ARCHIVE_NAME_SIMPLE"
    echo "📏 גודל: $SIZE"
    echo ""
    echo "הקובץ מוכן להורדה והפצה!"
    echo "The file is ready for download and distribution!"
else
    echo "❌ שגיאה ביצירת הארכיון"
    echo "❌ Error creating archive"
    exit 1
fi

