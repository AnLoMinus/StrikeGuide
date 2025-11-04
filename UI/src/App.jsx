import React, { useState, useEffect } from 'react'
import EntryForm from './components/EntryForm'
import EntryList from './components/EntryList'
import Statistics from './components/Statistics'
import { GITHUB_URLS } from './config'

function App() {
  const [entries, setEntries] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState(null)

  // טעינת רשומות מהקובץ CSV (בפועל יטען מ-API או מקובץ)
  useEffect(() => {
    const loadEntries = async () => {
      try {
        // ניסיון לטעון מהקובץ CSV ב-GitHub
        try {
          // ניסיון ראשון: טעינה מ-GitHub
          let response = await fetch(GITHUB_URLS.entriesCSV)
          
          // אם לא הצליח, נסה מהקבצים המקומיים
          if (!response.ok) {
            response = await fetch('/DATA/entries.csv')
          }
          if (response.ok) {
            const text = await response.text()
            const lines = text.split('\n').filter(line => line.trim())
            const headers = lines[0].split(',')
            const data = lines.slice(1).map(line => {
              const values = parseCSVLine(line)
              const entry = {}
              headers.forEach((header, index) => {
                entry[header.toLowerCase().replace(/ /g, '_')] = values[index] || ''
              })
              return {
                id: entry.id || '',
                name: entry.name || '',
                manifestation: entry.manifestation || '',
                trigger: entry.trigger || '',
                yirat_shamayim_level: parseInt(entry.yirat_shamayim_level) || 2,
                predicted_makkah: entry.predicted_makkah || '',
                severity: parseInt(entry.severity) || 4,
                reason: entry.reason || '',
                corrective_actions: entry.corrective_actions || '',
                timestamp_gregorian: entry.timestamp_gregorian || new Date().toISOString().slice(0, 19).replace('T', ' '),
                timestamp_hebrew: entry.timestamp_hebrew || 'תאריך עברי',
                status: entry.status || 'הולך לקרות / Pending',
                notes: entry.notes || ''
              }
            }).filter(entry => entry.id && entry.name)
            
            if (data.length > 0) {
              setEntries(data)
              return
            }
          }
        } catch (csvError) {
          console.log('לא ניתן לטעון מ-CSV, משתמש בדוגמאות', csvError)
        }
        
        // אם לא הצליח, טוען רשומות לדוגמה
        const sampleEntries = [
          {
            id: 'SG-0001',
            name: 'רוח ההסתרה',
            manifestation: 'השתקפויות של פחד/עכבות, חוסר אונים, חלומות מטרידים',
            trigger: 'ניתוק מעשיית מצווה, כעס גלוי, גאווה',
            yirat_shamayim_level: 2,
            predicted_makkah: 'מבחן של אובדן זמן/בריאות זמני, תחושת נידוי',
            severity: 4,
            reason: 'נשארה חסימה רוחנית שלא תוקנה; צורך בחזרה בתשובה ובמעשה חסד',
            corrective_actions: 'עשיית תשובה פרקטית; לימוד מסכת אבות פרקים נבחרים; מעשה חסד יומי; בקשת רב מנוסה להכוונה',
            timestamp_gregorian: '2025-11-04 02:43:20',
            timestamp_hebrew: 'י״ג בְּחֶשְׁוָן תשפ״ו',
            status: 'בתהליך תיקון / In Correction',
            notes: `ראו ${GITHUB_URLS.corrections} לפרקטיקות מפורטות`
          },
          {
            id: 'SG-0002',
            name: 'רוח העצבות',
            manifestation: 'דיכאון מתמשך, חוסר מוטיבציה, נסיגה חברתית',
            trigger: 'הזנחת תפילה, לימוד תורה מועט, חוסר שמחה במצוות',
            yirat_shamayim_level: 3,
            predicted_makkah: 'מבחן של בדידות, קשיים בתקשורת, אובדן שמחה',
            severity: 5,
            reason: 'חוסר חיבור לרוחניות גורם לניתוק פנימי',
            corrective_actions: 'תפילה יומית קבועה; לימוד פרק תהילים יומי; השתתפות בשיעור תורה שבועי; עשיית מעשה שמחה; התחברות לקהילה',
            timestamp_gregorian: '2025-11-03 14:30:00',
            timestamp_hebrew: 'י״ב בְּחֶשְׁוָן תשפ״ו',
            status: 'הולך לקרות / Pending',
            notes: 'מומלץ לפנות לרב/יועץ רוחני'
          },
          {
            id: 'SG-0003',
            name: 'רוח הגאווה',
            manifestation: 'התנשאות, ביקורתיות יתר, חוסר ענווה',
            trigger: 'התנהגות מתנשאת, ביטול אחרים, חוסר הכרת טובה',
            yirat_shamayim_level: 4,
            predicted_makkah: 'מבחן של נפילה, אובדן כבוד, בדידות',
            severity: 7,
            reason: 'גאווה מביאה לריחוק משמיים ומבני אדם',
            corrective_actions: 'לימוד מסכת אבות פרק ד\' (ענווה); עשיית מעשה שפלות; בקשת סליחה ממי שנפגע; הכרת הטוב יומיומית; לימוד על מידת הענווה',
            timestamp_gregorian: '2025-11-02 10:15:00',
            timestamp_hebrew: 'י״א בְּחֶשְׁוָן תשפ״ו',
            status: 'בתהליך תיקון / In Correction',
            notes: 'תיקון זה דורש זמן ומאמץ מתמשך'
          }
        ]
        setEntries(sampleEntries)
      } catch (error) {
        console.error('Error loading entries:', error)
        // אם יש שגיאה, עדיין נציג רשומות לדוגמה
        setEntries([
          {
            id: 'SG-0001',
            name: 'רוח ההסתרה',
            manifestation: 'השתקפויות של פחד/עכבות, חוסר אונים, חלומות מטרידים',
            trigger: 'ניתוק מעשיית מצווה, כעס גלוי, גאווה',
            yirat_shamayim_level: 2,
            predicted_makkah: 'מבחן של אובדן זמן/בריאות זמני, תחושת נידוי',
            severity: 4,
            reason: 'נשארה חסימה רוחנית שלא תוקנה; צורך בחזרה בתשובה ובמעשה חסד',
            corrective_actions: 'עשיית תשובה פרקטית; לימוד מסכת אבות פרקים נבחרים; מעשה חסד יומי; בקשת רב מנוסה להכוונה',
            timestamp_gregorian: '2025-11-04 02:43:20',
            timestamp_hebrew: 'י״ג בְּחֶשְׁוָן תשפ״ו',
            status: 'בתהליך תיקון / In Correction',
            notes: `ראו ${GITHUB_URLS.corrections} לפרקטיקות מפורטות`
          }
        ])
      }
    }
    loadEntries()
  }, [])
  
  // פונקציה לפרסור שורות CSV (מטפלת בפסיקים בתוך מרכאות)
  const parseCSVLine = (line) => {
    const result = []
    let current = ''
    let inQuotes = false
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }
    result.push(current.trim())
    return result
  }

  const handleAddEntry = (newEntry) => {
    const entryWithId = {
      ...newEntry,
      id: `SG-${String(entries.length + 1).padStart(4, '0')}`,
      timestamp_gregorian: new Date().toISOString().slice(0, 19).replace('T', ' '),
      timestamp_hebrew: getHebrewDate(),
      status: 'הולך לקרות / Pending'
    }
    setEntries([...entries, entryWithId])
    setShowForm(false)
  }

  const handleUpdateEntry = (updatedEntry) => {
    setEntries(entries.map(entry => 
      entry.id === updatedEntry.id ? updatedEntry : entry
    ))
    setSelectedEntry(null)
    setShowForm(false)
  }

  const handleDeleteEntry = (id) => {
    if (confirm('האם אתה בטוח שברצונך למחוק את הרשומה?')) {
      setEntries(entries.filter(entry => entry.id !== id))
    }
  }

  const handleEditEntry = (entry) => {
    setSelectedEntry(entry)
    setShowForm(true)
  }

  const getHebrewDate = () => {
    // פונקציה פשוטה - בפועל יש להשתמש בספרייה להמרת תאריכים
    return 'תאריך עברי'
  }

  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Manifestation', 'Trigger', 'Yirat Shamayim Level', 'Predicted Makkah', 'Severity', 'Reason', 'Corrective Actions', 'Timestamp Gregorian', 'Timestamp Hebrew', 'Status', 'Notes']
    const csvContent = [
      headers.join(','),
      ...entries.map(entry => [
        entry.id,
        entry.name,
        `"${entry.manifestation}"`,
        `"${entry.trigger}"`,
        entry.yirat_shamayim_level,
        `"${entry.predicted_makkah}"`,
        entry.severity,
        `"${entry.reason}"`,
        `"${entry.corrective_actions}"`,
        entry.timestamp_gregorian,
        entry.timestamp_hebrew,
        entry.status,
        `"${entry.notes || ''}"`
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `strikeguide-entries-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center">
            🔥⚖️ StrikeGuide - מאגר תיקוני מכות רוחניות
          </h1>
          <p className="text-center mt-2 text-primary-100">
            מיפוי, ניתוח והכוונה לתיקון
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {entries.length === 0 && !showForm ? (
          <div className="card max-w-3xl mx-auto text-center py-12">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-primary-700 mb-4">
                ברוכים הבאים ל-StrikeGuide! 🙏
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                מאגר תיקוני מכות רוחניות - מיפוי, ניתוח והכוונה לתיקון
              </p>
            </div>
            <div className="bg-primary-50 rounded-lg p-6 mb-6 text-right">
              <h3 className="text-xl font-bold mb-4">מה זה StrikeGuide?</h3>
              <p className="text-gray-700 mb-4">
                מאגר זה מיועד לרשום, להבהיר ולתקשר את ה"מכות" (ההשלכות/התוצאות/תיקונים) 
                שעלולות לבוא על ישות/רוח/נפש לפי מידת יראת־שמיים והתנהגות רוחנית.
              </p>
              <p className="text-gray-700">
                מטרת המאגר היא לשקף אמת, להניע תיקון ולתת מפת דרכים מעשית לשינוי.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => {
                  setSelectedEntry(null)
                  setShowForm(true)
                }}
                className="btn-primary text-lg px-6 py-3"
              >
                ➕ צור רשומה חדשה
              </button>
              <button
                onClick={() => {
                  // טוען רשומות לדוגמה
                  const sampleEntries = [
                    {
                      id: 'SG-0001',
                      name: 'רוח ההסתרה',
                      manifestation: 'השתקפויות של פחד/עכבות, חוסר אונים, חלומות מטרידים',
                      trigger: 'ניתוק מעשיית מצווה, כעס גלוי, גאווה',
                      yirat_shamayim_level: 2,
                      predicted_makkah: 'מבחן של אובדן זמן/בריאות זמני, תחושת נידוי',
                      severity: 4,
                      reason: 'נשארה חסימה רוחנית שלא תוקנה; צורך בחזרה בתשובה ובמעשה חסד',
                      corrective_actions: 'עשיית תשובה פרקטית; לימוד מסכת אבות פרקים נבחרים; מעשה חסד יומי; בקשת רב מנוסה להכוונה',
                      timestamp_gregorian: '2025-11-04 02:43:20',
                      timestamp_hebrew: 'י״ג בְּחֶשְׁוָן תשפ״ו',
                      status: 'בתהליך תיקון / In Correction',
                      notes: `ראו ${GITHUB_URLS.corrections} לפרקטיקות מפורטות`
                    },
                    {
                      id: 'SG-0002',
                      name: 'רוח העצבות',
                      manifestation: 'דיכאון מתמשך, חוסר מוטיבציה, נסיגה חברתית',
                      trigger: 'הזנחת תפילה, לימוד תורה מועט, חוסר שמחה במצוות',
                      yirat_shamayim_level: 3,
                      predicted_makkah: 'מבחן של בדידות, קשיים בתקשורת, אובדן שמחה',
                      severity: 5,
                      reason: 'חוסר חיבור לרוחניות גורם לניתוק פנימי',
                      corrective_actions: 'תפילה יומית קבועה; לימוד פרק תהילים יומי; השתתפות בשיעור תורה שבועי; עשיית מעשה שמחה; התחברות לקהילה',
                      timestamp_gregorian: '2025-11-03 14:30:00',
                      timestamp_hebrew: 'י״ב בְּחֶשְׁוָן תשפ״ו',
                      status: 'הולך לקרות / Pending',
                      notes: 'מומלץ לפנות לרב/יועץ רוחני'
                    },
                    {
                      id: 'SG-0003',
                      name: 'רוח הגאווה',
                      manifestation: 'התנשאות, ביקורתיות יתר, חוסר ענווה',
                      trigger: 'התנהגות מתנשאת, ביטול אחרים, חוסר הכרת טובה',
                      yirat_shamayim_level: 4,
                      predicted_makkah: 'מבחן של נפילה, אובדן כבוד, בדידות',
                      severity: 7,
                      reason: 'גאווה מביאה לריחוק משמיים ומבני אדם',
                      corrective_actions: 'לימוד מסכת אבות פרק ד\' (ענווה); עשיית מעשה שפלות; בקשת סליחה ממי שנפגע; הכרת הטוב יומיומית; לימוד על מידת הענווה',
                      timestamp_gregorian: '2025-11-02 10:15:00',
                      timestamp_hebrew: 'י״א בְּחֶשְׁוָן תשפ״ו',
                      status: 'בתהליך תיקון / In Correction',
                      notes: 'תיקון זה דורש זמן ומאמץ מתמשך'
                    }
                  ]
                  setEntries(sampleEntries)
                }}
                className="btn-secondary text-lg px-6 py-3"
              >
                📋 טען דוגמאות
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => {
                  setSelectedEntry(null)
                  setShowForm(true)
                }}
                className="btn-primary"
              >
                ➕ רשומה חדשה
              </button>
              {entries.length > 0 && (
                <>
                  <button
                    onClick={exportToCSV}
                    className="btn-secondary"
                  >
                    📥 ייצוא ל-CSV
                  </button>
                  <button
                    onClick={() => setShowForm(false)}
                    className="btn-secondary"
                  >
                    📋 רשימת רשומות
                  </button>
                </>
              )}
            </div>

            {showForm ? (
              <EntryForm
                entry={selectedEntry}
                onSave={selectedEntry ? handleUpdateEntry : handleAddEntry}
                onCancel={() => {
                  setShowForm(false)
                  setSelectedEntry(null)
                }}
              />
            ) : (
              <>
                <Statistics entries={entries} />
                <EntryList
                  entries={entries}
                  onEdit={handleEditEntry}
                  onDelete={handleDeleteEntry}
                />
              </>
            )}
          </>
        )}
      </main>

      <footer className="bg-gray-800 text-white mt-12 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            "רֵאשִׁית חָכְמָה יִרְאַת ה'." 🙏
          </p>
          <p className="text-xs mt-2 text-gray-400">
            ראו <a href={GITHUB_URLS.conduct} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300">CONDUCT.md</a> ו-<a href={GITHUB_URLS.ethics} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300">ETHICS.md</a> לכללי שימוש
            {' | '}
            <a href={GITHUB_URLS.repository} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300">📦 מאגר GitHub</a>
            {' | '}
            <a href={GITHUB_URLS.website} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300">🌐 אתר</a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App

