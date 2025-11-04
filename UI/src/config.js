// קונפיגורציה לקישורים למקורות ב-GitHub
// Configuration for GitHub source links

// כתובת המאגר המקורי ב-GitHub
// Original GitHub repository URL
const GITHUB_REPO = 'https://raw.githubusercontent.com/AnLoMinus/StrikeGuide/main'

// או השתמש במשתנה סביבה
// Or use environment variable
const repoUrl = import.meta.env.VITE_GITHUB_REPO || GITHUB_REPO

export const GITHUB_URLS = {
  // נתונים
  entriesCSV: `${repoUrl}/DATA/entries.csv`,
  schemaYAML: `${repoUrl}/DATA/schema.yaml`,
  
  // תיעוד
  corrections: `${repoUrl}/DOCS/corrections.md`,
  
  // כללי שימוש
  conduct: `${repoUrl}/CONDUCT.md`,
  ethics: `${repoUrl}/ETHICS.md`,
  
  // תבניות
  entryTemplate: `${repoUrl}/TEMPLATES/entry_template.md`,
  
  // README
  readme: `${repoUrl}/README.md`,
  
  // מאגר GitHub (עמוד ראשי)
  repository: import.meta.env.VITE_GITHUB_REPO_URL || 'https://github.com/AnLoMinus/StrikeGuide',
  
  // אתר GitHub Pages
  website: 'https://anlominus.github.io/StrikeGuide/',
  
  // RepoCraft מקור
  repocraft: 'https://github.com/AnLoMinus/RepoCraft'
}

export default GITHUB_URLS

