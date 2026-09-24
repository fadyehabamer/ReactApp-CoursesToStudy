export const STORAGE_KEY = 'savedCourses'

// Reads saved courses defensively: bad JSON, a non-array value or storage
// being unavailable (private mode, blocked cookies) must not crash the app.
export function loadCourses(storage = window.localStorage) {
  try {
    const parsed = JSON.parse(storage.getItem(STORAGE_KEY))
    if (!Array.isArray(parsed)) return []
    return parsed.filter(course => course && typeof course.name === 'string')
  } catch (e) {
    return []
  }
}

export function saveCourses(courses, storage = window.localStorage) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(courses))
  } catch (e) {
    // Quota exceeded or storage disabled: keep working in memory.
  }
}
