# הגדרת GitHub Pages / GitHub Pages Setup

## מטרה / Purpose

מאגר זה מוכן לעבודה עם GitHub Pages. האתר יפורסם אוטומטית ב-`https://anlominus.github.io/StrikeGuide/`

## מבנה הקבצים / File Structure

```
StrikeGuide/
├── index.html          ← קובץ העמוד הראשי (בתיקייה הראשית)
├── UI/
│   ├── src/           ← קוד המקור
│   └── package.json
├── dist/              ← קבצים בנויים (נוצר אחרי build)
└── .nojekyll          ← קובץ חשוב ל-GitHub Pages
```

## הגדרה / Setup

### שלב 1: הגדר את המאגר ב-GitHub / Step 1: Configure Repository on GitHub

1. פתח את המאגר שלך ב-GitHub
2. לך ל-**Settings** → **Pages**
3. תחת **Source**, בחר **GitHub Actions**
4. שמור את ההגדרות

### שלב 2: הגדר משתני סביבה / Step 2: Configure Environment Variables

1. צור קובץ `UI/.env` (ראה `UI/.env.example`)
2. עדכן את הכתובת למאגר שלך:

```env
VITE_GITHUB_REPO=https://raw.githubusercontent.com/AnLoMinus/StrikeGuide/main
VITE_GITHUB_REPO_URL=https://github.com/AnLoMinus/StrikeGuide
```

### שלב 3: העלה את הקבצים / Step 3: Upload Files

העלה את כל הקבצים ל-GitHub:

```bash
git add .
git commit -m "Setup GitHub Pages"
git push origin main
```

### שלב 4: בדוק את הפריסה / Step 4: Check Deployment

1. לך ל-**Actions** במאגר שלך
2. בדוק שהפריסה עברה בהצלחה
3. אחרי כמה דקות, האתר יהיה זמין ב:
   `https://anlominus.github.io/StrikeGuide/`

## בנייה מקומית / Local Build

לבדיקה מקומית לפני העלאה:

```bash
cd UI
npm install
npm run build
```

הקבצים הבנויים יהיו בתיקייה `dist/` בתיקייה הראשית.

## הפעלה מקומית / Local Development

לפיתוח:

```bash
cd UI
npm run dev
```

האתר יפתח ב-`http://localhost:3000`

## אוטומציה / Automation

המאגר כולל GitHub Actions workflow (`.github/workflows/deploy.yml`) שמבצע:

1. ✅ בנייה אוטומטית אחרי כל push ל-main
2. ✅ פריסה אוטומטית ל-GitHub Pages
3. ✅ עדכון משתני סביבה אוטומטית

## פתרון בעיות / Troubleshooting

### האתר לא עובד

1. בדוק שהמאגר הוא **public**
2. בדוק ב-**Settings** → **Pages** שהמקור הוא **GitHub Actions**
3. בדוק ב-**Actions** שהפריסה עברה בהצלחה
4. חכה 2-5 דקות לעדכון

### שגיאות בנייה

1. בדוק שיש `index.html` בתיקייה הראשית
2. בדוק שהנתיבים ב-`index.html` נכונים
3. בדוק שהקובץ `.nojekyll` קיים

### קישורים לא עובדים

1. ודא שהקובץ `UI/.env` מעודכן
2. ודא שהמאגר ב-GitHub הוא public
3. בדוק את הקונסול בדפדפן לשגיאות

## מבנה קבצים / File Structure

### קבצים חשובים / Important Files

- `index.html` - קובץ העמוד הראשי (חייב להיות בתיקייה הראשית)
- `UI/src/` - קוד המקור של האפליקציה
- `dist/` - קבצים בנויים (נוצר אחרי build, לא נשמר ב-Git)
- `.nojekyll` - קובץ חשוב ל-GitHub Pages (אל תמחק!)
- `.github/workflows/deploy.yml` - הגדרת פריסה אוטומטית

### קבצים שלא נשמרים / Files Not Saved

- `dist/` - נוצר אחרי build
- `node_modules/` - נוצר אחרי npm install
- `.env` - משתני סביבה (לא נשמר ב-Git)

## עדכונים / Updates

כל עדכון לקוד יגרום לפריסה אוטומטית חדשה:

1. ערוך את הקבצים
2. commit ו-push
3. GitHub Actions יבנה ויפרס אוטומטית

## קישורים / Links

- **מאגר GitHub:** `https://github.com/AnLoMinus/StrikeGuide`
- **אתר GitHub Pages:** `https://anlominus.github.io/StrikeGuide/`
- **Raw Files:** `https://raw.githubusercontent.com/AnLoMinus/StrikeGuide/main/`

---

*"רֵאשִׁית חָכְמָה יִרְאַת ה'."* 🙏

