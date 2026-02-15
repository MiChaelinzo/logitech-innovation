import { useEffect, useCallback } from 'react'
import { useKV } from '@github/spark/hooks'

export interface UserInteraction {
  type: 'demo' | 'video' | 'preset' | 'app-scenario' | 'roi-calc' | 'pricing' | 'feature' | 'testimonial'
  itemId: string
  timestamp: number
  duration?: number
}

export function useInteractionTracker() {
  const [interactions, setInteractions] = useKV<UserInteraction[]>('user-interactions', [])

  const trackInteraction = useCallback((
    type: UserInteraction['type'],
    itemId: string,
    duration?: number
  ) => {
    const newInteraction: UserInteraction = {
      type,
      itemId,
      timestamp: Date.now(),
      duration
    }

    setInteractions(current => {
      const updated = [...(current || []), newInteraction]
      return updated.slice(-50)
    })
  }, [setInteractions])

  const getInteractionCount = useCallback((type?: UserInteraction['type']) => {
    if (!interactions) return 0
    if (!type) return interactions.length
    return interactions.filter(i => i.type === type).length
  }, [interactions])

  const getRecentInteractions = useCallback((count: number = 5) => {
    if (!interactions) return []
    return interactions.slice(-count)
  }, [interactions])

  return {
    interactions: interactions || [],
    trackInteraction,
    getInteractionCount,
    getRecentInteractions
  }
}
