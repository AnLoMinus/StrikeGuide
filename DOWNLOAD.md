# הוראות הורדה והתקנה / Download and Installation Guide

## 📥 הורדת המאגר / Download Repository

### אופציה 1: קובץ ZIP מוכן (מומלץ) / Option 1: Ready ZIP File (Recommended)

הקובץ **`StrikeGuide-complete.zip`** מכיל את כל המאגר מוכן לשימוש.

**מה לעשות:**
1. הורד את הקובץ `StrikeGuide-complete.zip`
2. חלץ את הקובץ (Unzip)
3. עקוב אחר הוראות ההתקנה למטה

### אופציה 2: יצירת ארכיון חדש / Option 2: Create New Archive

אם ברצונך ליצור ארכיון חדש:

```bash
./create-archive.sh
```

או ידנית:

```bash
zip -r StrikeGuide-complete.zip . -x "*.git*" -x "node_modules/*" -x "UI/node_modules/*" -x "UI/dist/*" -x "*.log"
```

---

## 🚀 התקנה / Installation

### שלב 1: חילוץ הקבצים / Step 1: Extract Files

**Mac/Linux:**
```bash
unzip StrikeGuide-complete.zip
cd StrikeGuide-complete
```

**Windows:**
- לחץ ימני על הקובץ → Extract All
- פתח את התיקייה

### שלב 2: התקנת תלויות / Step 2: Install Dependencies

**אופציה A: שימוש בסקריפט (מומלץ) / Option A: Using Script (Recommended)**

```bash
chmod +x install.sh
./install.sh
```

**אופציה B: התקנה ידנית / Option B: Manual Installation**

```bash
cd UI
npm install
cd ..
```

### שלב 3: הפעלה / Step 3: Run

```bash
cd UI
npm run dev
```

הממשק יפתח אוטומטית בדפדפן בכתובת: `http://localhost:3000`

---

## 📋 מה כלול בארכיון / What's Included

### ✅ קבצים בסיסיים / Basic Files
- `README.md` - תיאור כללי של המאגר
- `CONDUCT.md` - קוד התנהגות
- `ETHICS.md` - מדיניות אתיקה
- `INSTALL.md` - הוראות התקנה מפורטות
- `ARCHIVE.md` - הוראות ארכוב
- `package.json` - הגדרות פרויקט
- `.gitignore` - הגדרות Git

### ✅ תיקיות נתונים / Data Folders
- `DATA/schema.yaml` - סכמת נתונים מלאה
- `DATA/entries.csv` - 5 רשומות לדוגמה

### ✅ תבניות / Templates
- `TEMPLATES/entry_template.md` - טופס למילוי רישום חדש

### ✅ תיעוד / Documentation
- `DOCS/corrections.md` - מדריך דרכי תיקון מפורט

### ✅ ממשק משתמש / User Interface
- `UI/` - אפליקציית React מלאה עם:
  - טופס יצירה/עריכה
  - רשימת רשומות
  - לוח סטטיסטיקה
  - ייצוא ל-CSV

### ✅ סקריפטים / Scripts
- `install.sh` - סקריפט התקנה אוטומטי
- `build.sh` - סקריפט בנייה
- `create-archive.sh` - סקריפט יצירת ארכיון

---

## ❌ מה לא כלול (יורד בנפרד) / What's Not Included

- `node_modules/` - תלויות (מותקנות עם `npm install`)
- `.git/` - היסטוריית Git
- `UI/dist/` - קבצים בנויים (נוצרים עם `npm run build`)

**סיבה:** אלה קבצים גדולים שניתן ליצור מחדש ולכן לא נכללים בארכיון.

---

## 📏 גודל משוער / Estimated Size

- **ארכיון ZIP:** ~50-100 KB (ללא node_modules)
- **לאחר התקנה:** ~50-100 MB (עם node_modules)

---

## 🔧 דרישות מערכת / System Requirements

- **Node.js** גרסה 18 ומעלה
- **npm** (מגיע עם Node.js)
- **דפדפן מודרני** (Chrome, Firefox, Safari, Edge)

---

## 🆘 פתרון בעיות / Troubleshooting

### שגיאת "command not found"
```bash
# בדוק התקנה
node --version
npm --version

# אם לא מותקן, הורד מ:
# https://nodejs.org/
```

### שגיאת הרשאות (Mac/Linux)
```bash
chmod +x install.sh
chmod +x build.sh
chmod +x create-archive.sh
```

### בעיות עם תלויות
```bash
cd UI
rm -rf node_modules package-lock.json
npm install
```

### בעיות עם ZIP
**Windows:**
- השתמש ב-WinRAR או 7-Zip
- או PowerShell: `Expand-Archive -Path StrikeGuide-complete.zip -DestinationPath .`

**Mac:**
- לחץ פעמיים על הקובץ
- או Terminal: `unzip StrikeGuide-complete.zip`

---

## 📚 משאבים נוספים / Additional Resources

- `README.md` - תיאור כללי של המאגר
- `DOCS/corrections.md` - מדריך תיקון מפורט
- `CONDUCT.md` - כללי שימוש
- `ETHICS.md` - מדיניות אתיקה
- `INSTALL.md` - הוראות התקנה מפורטות

---

## ✅ סיכום / Summary

1. ✅ הורד את `StrikeGuide-complete.zip`
2. ✅ חלץ את הקבצים
3. ✅ הרץ `./install.sh` או `cd UI && npm install`
4. ✅ הרץ `cd UI && npm run dev`
5. ✅ פתח את `http://localhost:3000` בדפדפן

---

*"רֵאשִׁית חָכְמָה יִרְאַת ה'."* 🙏

**תאריך עדכון:** 2025-11-04  
**גרסה:** 1.0.0

