// StrikeGuide - אפליקציה טהורה HTML/CSS/JS
// State management
let entries = []
let currentEditingEntry = null

// טעינה ראשונית
document.addEventListener('DOMContentLoaded', () => {
  loadEntries()
})

// טעינת רשומות מ-GitHub
async function loadEntries() {
  try {
    let response = await fetch(GITHUB_URLS.entriesCSV)
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
        entries = data
        updateUI()
        return
      }
    }
  } catch (error) {
    console.log('לא ניתן לטעון מ-CSV, משתמש בדוגמאות', error)
  }
  
  // אם לא הצליח, לא נטען רשומות לדוגמה אוטומטית
  updateUI()
}

// פונקציה לפרסור CSV
function parseCSVLine(line) {
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

// טעינת רשומות לדוגמה
function loadSampleEntries() {
  entries = [
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
  updateUI()
}

// עדכון UI
function updateUI() {
  if (entries.length === 0) {
    showWelcomeScreen()
  } else {
    showEntryList()
  }
  updateButtons()
}

// עדכון כפתורים
function updateButtons() {
  const loadSamplesBtn = document.getElementById('loadSamplesBtn')
  const exportBtn = document.getElementById('exportBtn')
  const listBtn = document.getElementById('listBtn')
  
  if (entries.length === 0) {
    if (loadSamplesBtn) loadSamplesBtn.style.display = 'inline-block'
    if (exportBtn) exportBtn.style.display = 'none'
    if (listBtn) listBtn.style.display = 'none'
  } else {
    if (loadSamplesBtn) loadSamplesBtn.style.display = 'none'
    if (exportBtn) exportBtn.style.display = 'inline-block'
    if (listBtn) listBtn.style.display = 'inline-block'
  }
}

// הצגת מסך ראשי
function showWelcomeScreen() {
  document.getElementById('welcomeScreen').style.display = 'block'
  document.getElementById('entryForm').style.display = 'none'
  document.getElementById('entryList').style.display = 'none'
  document.getElementById('statistics').style.display = 'none'
}

// הצגת טופס
function showNewEntryForm() {
  currentEditingEntry = null
  document.getElementById('formTitle').textContent = 'רשומה חדשה'
  document.getElementById('entryFormElement').reset()
  document.getElementById('entryFormElement').querySelector('[name="yirat_shamayim_level"]').value = 2
  document.getElementById('entryFormElement').querySelector('[name="severity"]').value = 4
  document.getElementById('entryFormElement').querySelector('[name="status"]').value = 'הולך לקרות / Pending'
  
  document.getElementById('welcomeScreen').style.display = 'none'
  document.getElementById('entryForm').style.display = 'block'
  document.getElementById('entryList').style.display = 'none'
  document.getElementById('statistics').style.display = 'none'
}

// ביטול טופס
function cancelForm() {
  showEntryList()
}

// ניתוח אוטומטי
function analyzeMakkah() {
  const level = parseInt(document.getElementById('entryFormElement').querySelector('[name="yirat_shamayim_level"]').value)
  const suggestions = {
    1: 'מבחן קל, חיזוק רוחני',
    2: 'מבחן בינוני, אובדן זמן/בריאות זמני',
    3: 'מבחן משמעותי, קשיים במערכות יחסים',
    4: 'מבחן חמור, אובדן כבוד/בריאות',
    5: 'מבחן קריטי, ניתוק משמעותי'
  }
  document.getElementById('entryFormElement').querySelector('[name="predicted_makkah"]').value = suggestions[level] || 'מבחן רוחני'
  document.getElementById('entryFormElement').querySelector('[name="severity"]').value = level * 2
}

// טיפול בהגשת טופס
function handleFormSubmit(event) {
  event.preventDefault()
  const formData = new FormData(event.target)
  const entry = {
    name: formData.get('name'),
    manifestation: formData.get('manifestation'),
    trigger: formData.get('trigger'),
    yirat_shamayim_level: parseInt(formData.get('yirat_shamayim_level')),
    predicted_makkah: formData.get('predicted_makkah'),
    severity: parseInt(formData.get('severity')),
    reason: formData.get('reason'),
    corrective_actions: formData.get('corrective_actions'),
    status: formData.get('status'),
    notes: formData.get('notes') || ''
  }
  
  if (currentEditingEntry) {
    entry.id = currentEditingEntry.id
    entry.timestamp_gregorian = currentEditingEntry.timestamp_gregorian
    entry.timestamp_hebrew = currentEditingEntry.timestamp_hebrew
    entries = entries.map(e => e.id === entry.id ? entry : e)
  } else {
    entry.id = `SG-${String(entries.length + 1).padStart(4, '0')}`
    entry.timestamp_gregorian = new Date().toISOString().slice(0, 19).replace('T', ' ')
    entry.timestamp_hebrew = 'תאריך עברי'
  }
  
  if (!currentEditingEntry) {
    entries.push(entry)
  }
  
  updateUI()
}

// עריכת רשומה לפי ID
function editEntryById(id) {
  const entry = entries.find(e => e.id === id)
  if (!entry) return
  editEntry(entry)
}

// עריכת רשומה
function editEntry(entry) {
  currentEditingEntry = entry
  document.getElementById('formTitle').textContent = 'עריכת רשומה'
  const form = document.getElementById('entryFormElement')
  form.querySelector('[name="name"]').value = entry.name
  form.querySelector('[name="manifestation"]').value = entry.manifestation
  form.querySelector('[name="trigger"]').value = entry.trigger
  form.querySelector('[name="yirat_shamayim_level"]').value = entry.yirat_shamayim_level
  form.querySelector('[name="predicted_makkah"]').value = entry.predicted_makkah
  form.querySelector('[name="severity"]').value = entry.severity
  form.querySelector('[name="reason"]').value = entry.reason
  form.querySelector('[name="corrective_actions"]').value = entry.corrective_actions
  form.querySelector('[name="status"]').value = entry.status
  form.querySelector('[name="notes"]').value = entry.notes || ''
  
  document.getElementById('welcomeScreen').style.display = 'none'
  document.getElementById('entryForm').style.display = 'block'
  document.getElementById('entryList').style.display = 'none'
  document.getElementById('statistics').style.display = 'none'
}

// מחיקת רשומה
function deleteEntry(id) {
  if (confirm('האם אתה בטוח שברצונך למחוק את הרשומה?')) {
    entries = entries.filter(entry => entry.id !== id)
    updateUI()
  }
}

// הצגת רשימת רשומות
function showEntryList() {
  document.getElementById('welcomeScreen').style.display = 'none'
  document.getElementById('entryForm').style.display = 'none'
  document.getElementById('entryList').style.display = 'block'
  document.getElementById('statistics').style.display = 'block'
  
  renderStatistics()
  renderEntryList()
}

// רינדור סטטיסטיקה
function renderStatistics() {
  if (entries.length === 0) {
    document.getElementById('statistics').innerHTML = ''
    return
  }
  
  const stats = {
    total: entries.length,
    byLevel: {},
    bySeverity: { minor: 0, moderate: 0, severe: 0, critical: 0 },
    byStatus: {}
  }
  
  entries.forEach(entry => {
    const level = entry.yirat_shamayim_level
    stats.byLevel[level] = (stats.byLevel[level] || 0) + 1
    
    if (entry.severity <= 3) stats.bySeverity.minor++
    else if (entry.severity <= 6) stats.bySeverity.moderate++
    else if (entry.severity <= 8) stats.bySeverity.severe++
    else stats.bySeverity.critical++
    
    const status = entry.status.split(' / ')[0]
    stats.byStatus[status] = (stats.byStatus[status] || 0) + 1
  })
  
  let html = '<div class="card stats-card"><h2 class="stats-title">סטטיסטיקה</h2>'
  html += '<div class="stats-grid">'
  html += `<div><p class="stats-label">סה"כ רשומות</p><p class="stats-value">${stats.total}</p></div>`
  html += '<div><p class="stats-label">לפי דרגת יראת שמים</p>'
  for (let i = 1; i <= 5; i++) {
    html += `<div class="stats-row"><span>דרגה ${i}:</span><span class="stats-bold">${stats.byLevel[i] || 0}</span></div>`
  }
  html += '</div>'
  html += '<div><p class="stats-label">לפי חומרה</p>'
  html += `<div class="stats-row"><span>מינור (1-3):</span><span class="stats-bold severity-minor">${stats.bySeverity.minor}</span></div>`
  html += `<div class="stats-row"><span>בינוני (4-6):</span><span class="stats-bold severity-moderate">${stats.bySeverity.moderate}</span></div>`
  html += `<div class="stats-row"><span>חמור (7-8):</span><span class="stats-bold severity-severe">${stats.bySeverity.severe}</span></div>`
  html += `<div class="stats-row"><span>קריטי (9-10):</span><span class="stats-bold severity-critical">${stats.bySeverity.critical}</span></div>`
  html += '</div></div>'
  html += '<div class="stats-status"><p class="stats-label">לפי סטטוס</p><div class="stats-status-grid">'
  for (const [status, count] of Object.entries(stats.byStatus)) {
    html += `<div class="stats-status-item"><p class="stats-status-label">${status}</p><p class="stats-status-value">${count}</p></div>`
  }
  html += '</div></div></div>'
  
  document.getElementById('statistics').innerHTML = html
}

// רינדור רשימת רשומות
function renderEntryList() {
  if (entries.length === 0) {
    document.getElementById('entryList').innerHTML = '<div class="card empty-card"><p class="empty-text">אין רשומות עדיין</p><p class="empty-subtext">צור רשומה חדשה כדי להתחיל</p></div>'
    return
  }
  
  let html = '<div class="entries-container">'
  html += '<div class="entries-header"><h2 class="entries-title">רשימת רשומות</h2><span class="entries-count">' + entries.length + ' רשומות</span></div>'
  
  entries.forEach(entry => {
    html += renderEntryCard(entry)
  })
  
  html += '</div>'
  document.getElementById('entryList').innerHTML = html
}

// רינדור כרטיס רשומה
function renderEntryCard(entry) {
  const severityColor = getSeverityColor(entry.severity)
  const levelColor = getLevelColor(entry.yirat_shamayim_level)
  const statusBadge = getStatusBadge(entry.status)
  
  let html = '<div class="entry-card">'
  html += '<div class="entry-header"><div style="display: flex; justify-content: space-between; align-items: flex-start;">'
  html += '<div class="entry-header-content">'
  html += '<div class="entry-id-name"><span class="entry-id">' + escapeHtml(entry.id) + '</span><h3 class="entry-name">' + escapeHtml(entry.name) + '</h3></div>'
  html += '<div class="entry-dates"><span>📅 ' + escapeHtml(entry.timestamp_gregorian) + '</span><span>✡️ ' + escapeHtml(entry.timestamp_hebrew) + '</span></div>'
  html += '</div>'
  html += '<div class="entry-actions"><button class="btn-edit" onclick="editEntryById(\'' + entry.id + '\')">✏️ עריכה</button>'
  html += '<button class="btn-delete" onclick="deleteEntry(\'' + entry.id + '\')">🗑️ מחיקה</button></div>'
  html += '</div></div>'
  
  html += '<div class="entry-body">'
  html += '<div class="entry-badges">'
  html += '<span class="badge ' + statusBadge + '">📊 ' + escapeHtml(entry.status.split(' / ')[0]) + '</span>'
  html += '<span class="badge ' + severityColor + '">⚠️ חומרה: ' + entry.severity + '/10</span>'
  html += '<span class="badge ' + levelColor + '">🙏 יראת שמים: ' + entry.yirat_shamayim_level + '/5</span>'
  html += '</div>'
  
  html += '<div class="entry-grid">'
  html += '<div class="entry-section entry-section-blue"><div class="entry-section-header"><span>👁️</span><h4>מופעים</h4></div><p>' + escapeHtml(entry.manifestation) + '</p></div>'
  html += '<div class="entry-section entry-section-orange"><div class="entry-section-header"><span>⚡</span><h4>טריגר</h4></div><p>' + escapeHtml(entry.trigger) + '</p></div>'
  html += '</div>'
  
  html += '<div class="entry-section entry-section-red"><div class="entry-section-header"><span>🔥</span><h4>המכה הצפויה</h4></div><p>' + escapeHtml(entry.predicted_makkah) + '</p></div>'
  html += '<div class="entry-section entry-section-purple"><div class="entry-section-header"><span>🔍</span><h4>שורש ההשלכה</h4></div><p>' + escapeHtml(entry.reason) + '</p></div>'
  html += '<div class="entry-section entry-section-green"><div class="entry-section-header"><span>✅</span><h4>דרכי תיקון</h4></div>'
  
  const actions = entry.corrective_actions.split(';')
  html += '<div class="entry-actions-list">'
  actions.forEach(action => {
    html += '<div class="entry-action-item"><span class="action-bullet">•</span><span>' + escapeHtml(action.trim()) + '</span></div>'
  })
  html += '</div></div>'
  
  if (entry.notes) {
    html += '<div class="entry-section entry-section-gray"><div class="entry-section-header"><span>📝</span><h4>הערות נוספות</h4></div>'
    let notesHtml = escapeHtml(entry.notes)
    if (entry.notes.includes('http') || entry.notes.includes('github')) {
      notesHtml = notesHtml.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="link-external">$1</a>')
    }
    html += '<p>' + notesHtml + '</p>'
    if (entry.notes.includes('corrections.md')) {
      html += '<a href="' + GITHUB_URLS.corrections + '" target="_blank" rel="noopener noreferrer" class="link-corrections">📖 קרא את המדריך המלא ב-GitHub →</a>'
    }
    html += '</div>'
  }
  
  html += '</div></div>'
  return html
}

// פונקציות עזר
function getSeverityColor(severity) {
  if (severity <= 3) return 'badge-green'
  if (severity <= 6) return 'badge-yellow'
  if (severity <= 8) return 'badge-orange'
  return 'badge-red'
}

function getLevelColor(level) {
  if (level <= 2) return 'badge-blue'
  if (level <= 3) return 'badge-yellow'
  return 'badge-red'
}

function getStatusBadge(status) {
  const statusMap = {
    'הולך לקרות / Pending': 'badge-gray',
    'בתהליך תיקון / In Correction': 'badge-blue',
    'בוטל / Cancelled': 'badge-gray',
    'עודכן / Updated': 'badge-purple',
    'הושלם / Completed': 'badge-green'
  }
  return statusMap[status] || 'badge-gray'
}

function escapeHtml(text) {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

// ייצוא ל-CSV
function exportToCSV() {
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

