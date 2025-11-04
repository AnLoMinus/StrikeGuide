import React from 'react'
import { GITHUB_URLS } from '../config'

function EntryList({ entries, onEdit, onDelete }) {
  if (entries.length === 0) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-500 text-lg">אין רשומות עדיין</p>
        <p className="text-gray-400 mt-2">צור רשומה חדשה כדי להתחיל</p>
      </div>
    )
  }

  const getSeverityColor = (severity) => {
    if (severity <= 3) return 'bg-green-100 text-green-800 border-green-300'
    if (severity <= 6) return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    if (severity <= 8) return 'bg-orange-100 text-orange-800 border-orange-300'
    return 'bg-red-100 text-red-800 border-red-300'
  }

  const getLevelColor = (level) => {
    if (level <= 2) return 'bg-blue-100 text-blue-800 border-blue-300'
    if (level <= 3) return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    return 'bg-red-100 text-red-800 border-red-300'
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      'הולך לקרות / Pending': 'bg-gray-100 text-gray-800 border-gray-300',
      'בתהליך תיקון / In Correction': 'bg-blue-100 text-blue-800 border-blue-300',
      'בוטל / Cancelled': 'bg-gray-100 text-gray-600 border-gray-300',
      'עודכן / Updated': 'bg-purple-100 text-purple-800 border-purple-300',
      'הושלם / Completed': 'bg-green-100 text-green-800 border-green-300'
    }
    return statusMap[status] || 'bg-gray-100 text-gray-800 border-gray-300'
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">רשימת רשומות</h2>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {entries.length} רשומות
        </span>
      </div>
      
      {entries.map(entry => (
        <div 
          key={entry.id} 
          className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          {/* Header עם רקע צבעוני */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-mono">
                    {entry.id}
                  </span>
                  <h3 className="text-2xl font-bold">
                    {entry.name}
                  </h3>
                </div>
                <div className="flex items-center gap-4 mt-3 text-primary-100 text-sm">
                  <span className="flex items-center gap-1">
                    📅 {entry.timestamp_gregorian}
                  </span>
                  <span className="flex items-center gap-1">
                    ✡️ {entry.timestamp_hebrew}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(entry)}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  ✏️ עריכה
                </button>
                <button
                  onClick={() => onDelete(entry.id)}
                  className="bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  🗑️ מחיקה
                </button>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {/* Badges - סטטוס, חומרה, דרגה */}
            <div className="flex flex-wrap gap-3">
              <span className={`px-4 py-2 rounded-lg border text-sm font-medium ${getStatusBadge(entry.status)}`}>
                📊 {entry.status.split(' / ')[0]}
              </span>
              <span className={`px-4 py-2 rounded-lg border text-sm font-medium ${getSeverityColor(entry.severity)}`}>
                ⚠️ חומרה: {entry.severity}/10
              </span>
              <span className={`px-4 py-2 rounded-lg border text-sm font-medium ${getLevelColor(entry.yirat_shamayim_level)}`}>
                🙏 יראת שמים: {entry.yirat_shamayim_level}/5
              </span>
            </div>

            {/* מופעים וטריגר */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-4 border-r-4 border-blue-400">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">👁️</span>
                  <h4 className="font-bold text-blue-900">מופעים</h4>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{entry.manifestation}</p>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-4 border-r-4 border-orange-400">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">⚡</span>
                  <h4 className="font-bold text-orange-900">טריגר</h4>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{entry.trigger}</p>
              </div>
            </div>

            {/* המכה הצפויה */}
            <div className="bg-red-50 rounded-lg p-5 border-r-4 border-red-400">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🔥</span>
                <h4 className="font-bold text-red-900 text-lg">המכה הצפויה</h4>
              </div>
              <p className="text-gray-800 leading-relaxed">{entry.predicted_makkah}</p>
            </div>

            {/* שורש ההשלכה */}
            <div className="bg-purple-50 rounded-lg p-5 border-r-4 border-purple-400">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🔍</span>
                <h4 className="font-bold text-purple-900 text-lg">שורש ההשלכה</h4>
              </div>
              <p className="text-gray-800 leading-relaxed">{entry.reason}</p>
            </div>

            {/* דרכי תיקון */}
            <div className="bg-green-50 rounded-lg p-5 border-r-4 border-green-400">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">✅</span>
                <h4 className="font-bold text-green-900 text-lg">דרכי תיקון</h4>
              </div>
              <div className="text-gray-800 leading-relaxed">
                {entry.corrective_actions.split(';').map((action, index) => (
                  <div key={index} className="flex items-start gap-2 mb-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span className="flex-1">{action.trim()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* הערות */}
            {entry.notes && (
              <div className="bg-gray-50 rounded-lg p-4 border-r-4 border-gray-400">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">📝</span>
                  <h4 className="font-bold text-gray-900">הערות נוספות</h4>
                </div>
                <div className="text-gray-700 text-sm">
                  {entry.notes.includes('http') || entry.notes.includes('github') ? (
                    <p dangerouslySetInnerHTML={{ 
                      __html: entry.notes.replace(
                        /(https?:\/\/[^\s]+)/g, 
                        '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">$1</a>'
                      )
                    }} />
                  ) : (
                    <p>{entry.notes}</p>
                  )}
                  {entry.notes.includes('corrections.md') && (
                    <a 
                      href={GITHUB_URLS.corrections} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-blue-600 hover:text-blue-800 hover:underline text-sm"
                    >
                      📖 קרא את המדריך המלא ב-GitHub →
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default EntryList

