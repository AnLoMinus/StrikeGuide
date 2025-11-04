import React, { useState, useEffect } from 'react'

function EntryForm({ entry, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    manifestation: '',
    trigger: '',
    yirat_shamayim_level: 2,
    predicted_makkah: '',
    severity: 4,
    reason: '',
    corrective_actions: '',
    notes: '',
    status: 'הולך לקרות / Pending'
  })

  useEffect(() => {
    if (entry) {
      setFormData(entry)
    }
  }, [entry])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'yirat_shamayim_level' || name === 'severity' 
        ? parseInt(value) 
        : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  const analyzeMakkah = () => {
    // פונקציה פשוטה לניתוח אוטומטי - בפועל יש לשפר לפי כללים
    const level = formData.yirat_shamayim_level
    const suggestions = {
      1: 'מבחן קל, חיזוק רוחני',
      2: 'מבחן בינוני, אובדן זמן/בריאות זמני',
      3: 'מבחן משמעותי, קשיים במערכות יחסים',
      4: 'מבחן חמור, אובדן כבוד/בריאות',
      5: 'מבחן קריטי, ניתוק משמעותי'
    }
    setFormData(prev => ({
      ...prev,
      predicted_makkah: suggestions[level] || 'מבחן רוחני',
      severity: level * 2
    }))
  }

  return (
    <div className="card max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {entry ? 'עריכת רשומה' : 'רשומה חדשה'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Name / כינוי הרוח *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Manifestation / מופעים *
          </label>
          <textarea
            name="manifestation"
            value={formData.manifestation}
            onChange={handleChange}
            className="input-field"
            rows="3"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Trigger / טריגר *
          </label>
          <textarea
            name="trigger"
            value={formData.trigger}
            onChange={handleChange}
            className="input-field"
            rows="2"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Yirat Shamayim Level / דרגת יראת שמים (1-5) *
            </label>
            <input
              type="number"
              name="yirat_shamayim_level"
              value={formData.yirat_shamayim_level}
              onChange={handleChange}
              min="1"
              max="5"
              className="input-field"
              required
            />
            <button
              type="button"
              onClick={analyzeMakkah}
              className="mt-2 text-sm text-primary-600 hover:underline"
            >
              🔍 ניתוח אוטומטי
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Severity / חומרה (1-10) *
            </label>
            <input
              type="number"
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              min="1"
              max="10"
              className="input-field"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Predicted Makkah / המכה הצפויה *
          </label>
          <textarea
            name="predicted_makkah"
            value={formData.predicted_makkah}
            onChange={handleChange}
            className="input-field"
            rows="2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Reason / שורש ההשלכה *
          </label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="input-field"
            rows="2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Corrective Actions / דרכי תיקון *
          </label>
          <textarea
            name="corrective_actions"
            value={formData.corrective_actions}
            onChange={handleChange}
            className="input-field"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Status / סטטוס *
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="הולך לקרות / Pending">הולך לקרות / Pending</option>
            <option value="בתהליך תיקון / In Correction">בתהליך תיקון / In Correction</option>
            <option value="בוטל / Cancelled">בוטל / Cancelled</option>
            <option value="עודכן / Updated">עודכן / Updated</option>
            <option value="הושלם / Completed">הושלם / Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Notes / הערות נוספות
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="input-field"
            rows="2"
          />
        </div>

        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
          >
            ביטול
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            שמירה
          </button>
        </div>
      </form>
    </div>
  )
}

export default EntryForm

