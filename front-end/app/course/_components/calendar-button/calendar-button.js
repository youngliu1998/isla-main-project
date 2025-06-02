'use client'

import { AddToCalendarButton } from 'add-to-calendar-button-react'

function parseActivityData(str) {
  // 範例：'2025.06.19 (四) 10:30 - 18:30'
  if (!str || typeof str !== 'string') return { start: '', end: '' }

  try {
    const [dateRaw, timeRange] = str.split(')').map((s) => s.trim())
    const dateFormatted = str.split('(')[0].replace(/\./g, '-').trim()
    const [startTime, endTime] = timeRange.split('-').map((s) => s.trim())

    if (!dateFormatted || !startTime || !endTime) throw new Error('格式錯誤')

    const start = `${dateFormatted}T${startTime}:00`
    const end = `${dateFormatted}T${endTime}:00`

    return { start, end }
  } catch {
    return { start: '', end: '' }
  }
}

export default function CalendarButton({ activityData, title, location }) {
  const { start, end } = parseActivityData(activityData)

  // 防呆處理：資料不完整就不渲染按鈕
  if (!start.includes('T') || !end.includes('T')) return null

  const [startDate, startTime] = start.split('T')
  const [endDate, endTimeFull] = end.split('T')
  const endTime = endTimeFull.slice(0, 5)

  return (
    <AddToCalendarButton
      name={title}
      startDate={startDate}
      startTime={startTime.slice(0, 5)}
      endDate={endDate}
      endTime={endTime}
      location={location}
      options={['Apple', 'Google', 'Yahoo', 'iCal']}
      timeZone="Asia/Taipei"
    />
  )
}
