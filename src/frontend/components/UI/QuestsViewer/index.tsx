import React, { useState } from 'react'
import styles from './index.module.scss'
import { QuestLogWrapper } from './components/QuestLogWrapper'
import { Alert } from '@hyperplay/ui'
import { useTranslation } from 'react-i18next'
import useAuthSession from 'frontend/hooks/useAuthSession'
import '@hyperplay/quests-ui/style.css'
import useGetQuests from 'frontend/hooks/useGetQuests'
import QuestDetails from '../QuestDetails'
import { useGetQuestStates } from 'frontend/hooks/useGetQuestStates'

export interface QuestsViewerProps {
  projectId: string
}

export function QuestsViewer({ projectId: appName }: QuestsViewerProps) {
  const questResults = useGetQuests(appName)
  const [selectedQuestId, setSelectedQuestId] = useState<number | null>(null)
  const { isSignedIn } = useAuthSession()
  const { t } = useTranslation()
  let quests = questResults?.data?.data

  const { questIdToQuestStateMap, isPending: isGetQuestStatesPending } =
    useGetQuestStates({
      quests
    })

  /**
   * Filter out the completed status quests where the user hasn't met the eligibility requirements yet.
   * In these cases, the user can no longer earn a reward or claim a reward.
   */
  let initialQuestId = quests?.[0]?.id ?? null
  if (!isGetQuestStatesPending && quests) {
    quests = quests.filter((quest_i) =>
      Object.hasOwn(questIdToQuestStateMap, quest_i.id)
    )
    initialQuestId = quests?.[0]?.id ?? null
  }
  const visibleQuestId = selectedQuestId ?? initialQuestId

  let alertComponent = null
  if (!isSignedIn) {
    alertComponent = (
      <Alert
        message={t(
          'quests.playstreak.signInWarning.overlay',
          'You are currently not logged in, play streak progress will not be tracked. Please exit the game and login to HyperPlay via the top-right dropdown to track progress.'
        )}
        variant="warning"
      />
    )
  }

  return (
    <div className={styles.container}>
      {alertComponent}
      <div className={styles.questsViewerContainer}>
        <QuestLogWrapper
          questIdToQuestStateMap={questIdToQuestStateMap}
          isLoading={questResults?.data.isPending || isGetQuestStatesPending}
          quests={quests}
          projectId={appName}
          selectedQuestId={visibleQuestId}
          setSelectedQuestId={setSelectedQuestId}
        />
        <QuestDetails
          questId={visibleQuestId}
          className={styles.detailsWrapper}
        />
      </div>
    </div>
  )
}
