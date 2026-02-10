import { useEffect, useCallback } from 'react'
import { useKV } from '@github/spark/hooks'

type UserStats = {
  presetsDownloaded: number
  presetsSaved: number
  demosCompleted: number
  calculationsRun: number
  daysActive: number
  level: number
  xp: number
  lastVisit: string
}

export function useUserActivity() {
  const [userStats, setUserStats] = useKV<UserStats>('user-stats', {
    presetsDownloaded: 0,
    presetsSaved: 0,
    demosCompleted: 0,
    calculationsRun: 0,
    daysActive: 1,
    level: 1,
    xp: 0,
    lastVisit: new Date().toISOString()
  })

  useEffect(() => {
    const checkDailyVisit = () => {
      if (!userStats) return

      const today = new Date().toDateString()
      const lastVisit = new Date(userStats.lastVisit).toDateString()

      if (today !== lastVisit) {
        setUserStats((current) => ({
          ...current!,
          daysActive: (current?.daysActive || 0) + 1,
          xp: (current?.xp || 0) + 10,
          lastVisit: new Date().toISOString()
        }))
      }
    }

    checkDailyVisit()
  }, [userStats, setUserStats])

  const addXP = useCallback((amount: number) => {
    setUserStats((current) => {
      const stats = current || {
        presetsDownloaded: 0,
        presetsSaved: 0,
        demosCompleted: 0,
        calculationsRun: 0,
        daysActive: 1,
        level: 1,
        xp: 0,
        lastVisit: new Date().toISOString()
      }
      const newXP = stats.xp + amount
      const newLevel = Math.floor(Math.sqrt(newXP / 100)) + 1
      return {
        ...stats,
        xp: newXP,
        level: newLevel
      }
    })
  }, [setUserStats])

  const incrementDemoCompleted = useCallback(() => {
    setUserStats((current) => {
      const stats = current || {
        presetsDownloaded: 0,
        presetsSaved: 0,
        demosCompleted: 0,
        calculationsRun: 0,
        daysActive: 1,
        level: 1,
        xp: 0,
        lastVisit: new Date().toISOString()
      }
      return {
        ...stats,
        demosCompleted: stats.demosCompleted + 1,
        xp: stats.xp + 5
      }
    })
  }, [setUserStats])

  const incrementPresetSaved = useCallback(() => {
    setUserStats((current) => {
      const stats = current || {
        presetsDownloaded: 0,
        presetsSaved: 0,
        demosCompleted: 0,
        calculationsRun: 0,
        daysActive: 1,
        level: 1,
        xp: 0,
        lastVisit: new Date().toISOString()
      }
      return {
        ...stats,
        presetsSaved: stats.presetsSaved + 1,
        xp: stats.xp + 3
      }
    })
  }, [setUserStats])

  const incrementCalculationRun = useCallback(() => {
    setUserStats((current) => {
      const stats = current || {
        presetsDownloaded: 0,
        presetsSaved: 0,
        demosCompleted: 0,
        calculationsRun: 0,
        daysActive: 1,
        level: 1,
        xp: 0,
        lastVisit: new Date().toISOString()
      }
      return {
        ...stats,
        calculationsRun: stats.calculationsRun + 1,
        xp: stats.xp + 5
      }
    })
  }, [setUserStats])

  const incrementPresetDownloaded = useCallback(() => {
    setUserStats((current) => {
      const stats = current || {
        presetsDownloaded: 0,
        presetsSaved: 0,
        demosCompleted: 0,
        calculationsRun: 0,
        daysActive: 1,
        level: 1,
        xp: 0,
        lastVisit: new Date().toISOString()
      }
      return {
        ...stats,
        presetsDownloaded: stats.presetsDownloaded + 1,
        xp: stats.xp + 2
      }
    })
  }, [setUserStats])

  return {
    userStats,
    addXP,
    incrementDemoCompleted,
    incrementPresetSaved,
    incrementCalculationRun,
    incrementPresetDownloaded
  }
}
