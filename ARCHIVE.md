# הוראות ארכוב והורדה / Archive and Download Instructions

## ארכוב המאגר כקובץ יחיד / Archive Repository as Single File

### אופציה 1: יצירת ZIP (מומלץ) / Option 1: Create ZIP (Recommended)

#### ב-Mac/Linux:
```bash
zip -r StrikeGuide-complete.zip . -x "*.git*" -x "node_modules/*" -x "UI/node_modules/*" -x "UI/dist/*" -x "*.log"
```

#### ב-Windows (PowerShell):
```powershell
Compress-Archive -Path * -DestinationPath StrikeGuide-complete.zip -Exclude "*.git*","node_modules","UI/node_modules","UI/dist","*.log"
```

### אופציה 2: יצירת TAR.GZ / Option 2: Create TAR.GZ

```bash
tar -czf StrikeGuide-complete.tar.gz --exclude='.git' --exclude='node_modules' --exclude='UI/node_modules' --exclude='UI/dist' --exclude='*.log' .
```

## מה כלול בארכיון / What's Included in Archive

✅ כל הקבצים הבסיסיים:
- `README.md` - תיאור כללי
- `CONDUCT.md` - קוד התנהגות
- `ETHICS.md` - מדיניות אתיקה
- `INSTALL.md` - הוראות התקנה
- `package.json` - הגדרות פרויקט

✅ כל התיקיות:
- `DATA/` - נתונים וסכמה
- `TEMPLATES/` - תבניות
- `DOCS/` - תיעוד
- `UI/` - ממשק משתמש (ללא node_modules)

✅ סקריפטים:
- `install.sh` - סקריפט התקנה
- `build.sh` - סקריפט בנייה

❌ לא כלול (יורד בנפרד):
- `node_modules/` - תלויות (מותקנות עם `npm install`)
- `.git/` - היסטוריית Git
- `UI/dist/` - קבצים בנויים (נוצרים עם `npm run build`)

## לאחר הורדה / After Download

1. **חלץ את הקובץ / Extract the file:**
   ```bash
   unzip StrikeGuide-complete.zip
   # או
   tar -xzf StrikeGuide-complete.tar.gz
   ```

2. **התקן תלויות / Install dependencies:**
   ```bash
   ./install.sh
   # או
   cd UI && npm install
   ```

3. **הפעל את הממשק / Run the UI:**
   ```bash
   cd UI && npm run dev
   ```

## גודל משוער / Estimated Size

- **ללא node_modules:** ~500 KB - 1 MB
- **עם node_modules:** ~50-100 MB (מומלץ לא לכלול)

## הערות / Notes

- הקבצים `node_modules` לא נכללים בארכיון כדי להקטין את הגודל
- לאחר הורדה, הרץ `./install.sh` או `cd UI && npm install` להתקנת התלויות
- הקבצים הבנויים (`UI/dist/`) נוצרים עם `npm run build`

---

*"רֵאשִׁית חָכְמָה יִרְאַת ה'."* 🙏

