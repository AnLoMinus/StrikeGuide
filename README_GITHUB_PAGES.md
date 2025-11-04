# הוראות GitHub Pages - קיצור דרך / GitHub Pages Quick Guide

## 🚀 פריסה מהירה / Quick Deploy

### 1. העלה את המאגר ל-GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/AnLoMinus/StrikeGuide.git
git push -u origin main
```

### 2. הפעל GitHub Pages

1. לך ל-**Settings** → **Pages**
2. תחת **Source**, בחר **GitHub Actions**
3. שמור

### 3. הפעל את הפריסה הראשונה

1. לך ל-**Actions**
2. לחץ על **Deploy to GitHub Pages**
3. לחץ **Run workflow**

### 4. המתן כמה דקות

האתר יהיה זמין ב:
`https://anlominus.github.io/StrikeGuide/`

## 📁 מבנה הקבצים / File Structure

```
StrikeGuide/
├── index.html          ← קובץ העמוד הראשי (חייב!)
├── UI/
│   └── src/            ← קוד המקור
├── dist/               ← קבצים בנויים (נוצר אוטומטית)
├── .nojekyll           ← חשוב ל-GitHub Pages
└── .github/
    └── workflows/
        └── deploy.yml  ← פריסה אוטומטית
```

## ⚙️ הגדרות נוספות / Additional Settings

### עדכן כתובת GitHub

צור קובץ `UI/.env`:

```env
VITE_GITHUB_REPO=https://raw.githubusercontent.com/AnLoMinus/StrikeGuide/main
VITE_GITHUB_REPO_URL=https://github.com/AnLoMinus/StrikeGuide
```

## 📝 הערות חשובות / Important Notes

- ✅ המאגר **חייב להיות public** עבור GitHub Pages חינם
- ✅ קובץ `index.html` **חייב להיות בתיקייה הראשית**
- ✅ קובץ `.nojekyll` **חייב להיות קיים**
- ✅ GitHub Actions יבנה ויפרס אוטומטית אחרי כל push

## 🔧 פיתוח מקומי / Local Development

```bash
cd UI
npm install
npm run dev
```

## 📦 בנייה מקומית / Local Build

```bash
cd UI
npm run build
```

הקבצים יהיו ב-`dist/` בתיקייה הראשית.

---

*"רֵאשִׁית חָכְמָה יִרְאַת ה'."* 🙏

