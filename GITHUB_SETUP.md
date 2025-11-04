# הגדרת קישורים ל-GitHub / GitHub Links Setup

## מטרה / Purpose

מאגר זה משתמש בקישורים ישירים למקורות ב-GitHub במקום להעתיק קבצים. זה חוסך מקום ומאפשר עדכונים אוטומטיים.

## הגדרה / Setup

### שלב 1: עדכן את כתובת המאגר / Step 1: Update Repository URL

1. פתח את הקובץ `UI/.env.example`
2. העתק אותו ל-`UI/.env`
3. עדכן את הכתובות:

```env
VITE_GITHUB_REPO=https://raw.githubusercontent.com/AnLoMinus/StrikeGuide/main
VITE_GITHUB_REPO_URL=https://github.com/AnLoMinus/StrikeGuide
```

**כתובת המאגר:**
- מאגר GitHub: [https://github.com/AnLoMinus/StrikeGuide](https://github.com/AnLoMinus/StrikeGuide)
- אתר GitHub Pages: [https://anlominus.github.io/StrikeGuide/](https://anlominus.github.io/StrikeGuide/)

### שלב 2: העלה את הקבצים ל-GitHub / Step 2: Upload Files to GitHub

ודא שהקבצים הבאים נמצאים במאגר שלך:

```
StrikeGuide/
├── DATA/
│   ├── entries.csv       ← יטען אוטומטית
│   └── schema.yaml
├── DOCS/
│   └── corrections.md    ← קישור בממשק
├── CONDUCT.md            ← קישור בממשק
├── ETHICS.md             ← קישור בממשק
└── ...
```

### שלב 3: הפעל מחדש / Step 3: Restart

אחרי עדכון `.env`, הפעל מחדש את השרת:

```bash
cd UI
npm run dev
```

## קבצים שמשותפים מ-GitHub / Files Shared from GitHub

### קבצים שטוענים אוטומטית / Auto-loaded Files

- ✅ `DATA/entries.csv` - רשומות (טוען אוטומטית בעת טעינת האפליקציה)
- ✅ `DOCS/corrections.md` - מדריך תיקון (קישור בהערות)
- ✅ `CONDUCT.md` - קוד התנהגות (קישור בפוטר)
- ✅ `ETHICS.md` - מדיניות אתיקה (קישור בפוטר)

### קבצים מקומיים / Local Files

הקבצים הבאים נשארים מקומיים (לא נטענים מ-GitHub):

- `UI/` - כל קבצי הממשק
- `node_modules/` - תלויות
- קבצי קונפיגורציה מקומיים

## יתרונות / Advantages

✅ **גודל קטן יותר** - המאגר לא מכיל את כל הקבצים  
✅ **עדכונים אוטומטיים** - שינויים ב-GitHub מתעדכנים אוטומטית  
✅ **גרסה אחת** - מקור אחד של אמת  
✅ **קל יותר לנהל** - עדכון במקום אחד

## איך זה עובד / How It Works

1. האפליקציה מנסה לטעון מ-GitHub (raw.githubusercontent.com)
2. אם זה לא עובד, היא מנסה מהקבצים המקומיים
3. אם גם זה לא עובד, היא מציגה רשומות לדוגמה

## פתרון בעיות / Troubleshooting

### הקישורים לא עובדים

1. ודא שהמאגר ב-GitHub הוא **public**
2. ודא שהקבצים קיימים בנתיב הנכון
3. בדוק שהקישור ב-`.env` נכון
4. בדוק את הקונסול בדפדפן לשגיאות

### עדכון קישורים

אם שינית את שם המאגר או המשתמש:
1. עדכן את `UI/.env`
2. עדכן את `UI/src/config.js` (אם צריך)
3. הפעל מחדש את השרת

## קישורים לדוגמה / Example Links

המאגר: `https://github.com/AnLoMinus/StrikeGuide`

הקישורים:
- CSV: `https://raw.githubusercontent.com/AnLoMinus/StrikeGuide/main/DATA/entries.csv`
- Corrections: `https://raw.githubusercontent.com/AnLoMinus/StrikeGuide/main/DOCS/corrections.md`
- Conduct: `https://raw.githubusercontent.com/AnLoMinus/StrikeGuide/main/CONDUCT.md`
- אתר: `https://anlominus.github.io/StrikeGuide/`

---

*"רֵאשִׁית חָכְמָה יִרְאַת ה'."* 🙏

