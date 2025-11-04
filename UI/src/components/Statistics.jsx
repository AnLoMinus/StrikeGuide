import React from 'react'

function Statistics({ entries }) {
  if (entries.length === 0) {
    return null
  }

  const stats = {
    total: entries.length,
    byLevel: {},
    bySeverity: { minor: 0, moderate: 0, severe: 0, critical: 0 },
    byStatus: {}
  }

  entries.forEach(entry => {
    // סטטיסטיקה לפי דרגת יראת שמים
    const level = entry.yirat_shamayim_level
    stats.byLevel[level] = (stats.byLevel[level] || 0) + 1

    // סטטיסטיקה לפי חומרה
    if (entry.severity <= 3) stats.bySeverity.minor++
    else if (entry.severity <= 6) stats.bySeverity.moderate++
    else if (entry.severity <= 8) stats.bySeverity.severe++
    else stats.bySeverity.critical++

    // סטטיסטיקה לפי סטטוס
    const status = entry.status.split(' / ')[0]
    stats.byStatus[status] = (stats.byStatus[status] || 0) + 1
  })

  return (
    <div className="card mb-6">
      <h2 className="text-2xl font-bold mb-4">סטטיסטיקה</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p className="text-sm text-gray-600">סה"כ רשומות</p>
          <p className="text-3xl font-bold text-primary-600">{stats.total}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-2">לפי דרגת יראת שמים</p>
          <div className="space-y-1">
            {[1, 2, 3, 4, 5].map(level => (
              <div key={level} className="flex justify-between">
                <span className="text-sm">דרגה {level}:</span>
                <span className="font-bold">{stats.byLevel[level] || 0}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-2">לפי חומרה</p>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm">מינור (1-3):</span>
              <span className="font-bold text-green-600">{stats.bySeverity.minor}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">בינוני (4-6):</span>
              <span className="font-bold text-yellow-600">{stats.bySeverity.moderate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">חמור (7-8):</span>
              <span className="font-bold text-orange-600">{stats.bySeverity.severe}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">קריטי (9-10):</span>
              <span className="font-bold text-red-600">{stats.bySeverity.critical}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t">
        <p className="text-sm text-gray-600 mb-2">לפי סטטוס</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(stats.byStatus).map(([status, count]) => (
            <div key={status} className="text-center">
              <p className="text-sm text-gray-600">{status}</p>
              <p className="text-xl font-bold">{count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Statistics

