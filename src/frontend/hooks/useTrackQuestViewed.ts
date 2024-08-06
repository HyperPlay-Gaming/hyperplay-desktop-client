import { useEffect } from 'react'

export function useTrackQuestViewed(selectedQuestId: number | null) {
  useEffect(() => {
    if (selectedQuestId !== null) {
      window.api.trackEvent({
        event: 'Quest Viewed',
        properties: { quest: { id: selectedQuestId.toString() } }
      })
    }
  }, [selectedQuestId])
}
