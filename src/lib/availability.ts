export function getAvailableSpots(date: string): number {
  // Mock: return 1-6 spots randomly based on date hash
  const hash = date.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return (hash % 6) + 1
}

export function getWeeklyAvailability(): { spotsLeft: number; totalSlots: number } {
  // Mock data - connect to real booking API later
  return { spotsLeft: 3, totalSlots: 18 }
}
