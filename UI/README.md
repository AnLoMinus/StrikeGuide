# StrikeGuide UI

ממשק המשתמש (UI) עבור StrikeGuide - מאגר תיקוני מכות רוחניות.

## התקנה / Installation

```bash
cd UI
npm install
```

## הפעלה / Running

```bash
# מצב פיתוח / Development mode
npm run dev

# בנייה לייצור / Build for production
npm run build

# תצוגה מקדימה של הבנייה / Preview build
npm run preview
```

## מבנה / Structure

- `src/App.jsx` - רכיב ראשי
- `src/components/EntryForm.jsx` - טופס יצירה/עריכה
- `src/components/EntryList.jsx` - רשימת רשומות
- `src/components/Statistics.jsx` - לוח סטטיסטיקה

## תכונות / Features

- ✅ יצירת רשומות חדשות
- ✅ עריכת רשומות קיימות
- ✅ מחיקת רשומות
- ✅ לוח סטטיסטיקה
- ✅ ייצוא ל-CSV
- ✅ ניתוח אוטומטי של המכה הצפויה

## טכנולוגיות / Technologies

- React 18
- Tailwind CSS
- Vite

## פיתוח עתידי / Future Development

- [ ] חיבור ל-API או קובץ CSV
- [ ] המרת תאריכים עברי/לועזי
- [ ] ניתוח אוטומטי משופר
- [ ] פילטרים וחיפוש
- [ ] גרפים וויזואליזציה

