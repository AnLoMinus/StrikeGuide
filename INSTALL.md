# הוראות התקנה / Installation Instructions

## דרישות מוקדמות / Prerequisites

- **Node.js** (גרסה 18 ומעלה) - [הורדה](https://nodejs.org/)
- **npm** (מגיע עם Node.js)

## התקנה מהירה / Quick Installation

### אופציה 1: שימוש בסקריפט (מומלץ) / Option 1: Using Script (Recommended)

```bash
chmod +x install.sh
./install.sh
```

### אופציה 2: התקנה ידנית / Option 2: Manual Installation

```bash
cd UI
npm install
```

## הפעלה / Running

### ממשק המשתמש / User Interface

```bash
cd UI
npm run dev
```

הממשק יפתח אוטומטית בדפדפן בכתובת: `http://localhost:3000`

### בנייה לייצור / Build for Production

```bash
cd UI
npm run build
```

הקבצים הבנויים יישמרו בתיקייה `UI/dist/`

## מבנה המאגר / Repository Structure

```
StrikeGuide/
├── DATA/              # נתונים וסכמה
│   ├── schema.yaml
│   └── entries.csv
├── TEMPLATES/        # תבניות
│   └── entry_template.md
├── DOCS/             # תיעוד
│   └── corrections.md
├── UI/               # ממשק משתמש
│   ├── src/
│   ├── package.json
│   └── ...
├── README.md
├── CONDUCT.md
├── ETHICS.md
└── install.sh
```

## פתרון בעיות / Troubleshooting

### שגיאת "command not found"
- ודא ש-Node.js ו-npm מותקנים
- הפעל: `node --version` ו-`npm --version`

### שגיאת הרשאות
- Linux/Mac: `chmod +x install.sh`
- Windows: השתמש ב-Git Bash או PowerShell

### בעיות עם תלויות
- נסה: `cd UI && rm -rf node_modules package-lock.json && npm install`

## תמיכה / Support

לקבלת עזרה, ראה:
- `README.md` - תיאור כללי
- `DOCS/corrections.md` - מדריך תיקון
- `CONDUCT.md` - כללי שימוש
- `ETHICS.md` - מדיניות אתיקה

---

*"רֵאשִׁית חָכְמָה יִרְאַת ה'."* 🙏

