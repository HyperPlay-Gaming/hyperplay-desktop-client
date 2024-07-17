import React, { useState } from 'react'
import { QuestsSummaryTableWrapper } from './components/QuestsSummaryTableWrapper'
import { QuestDetailsViewPlayWrapper } from './components/QuestDetailsViewPlay'
import styles from './index.module.scss'
import { Alert, Background } from '@hyperplay/ui'
import classNames from 'classnames'
import useAuthSession from 'frontend/hooks/useAuthSession'
import { useTranslation } from 'react-i18next'

export function QuestsPage() {
  const [selectedQuestId, setSelectedQuestId] = useState<number | null>(null)
  const { isSignedIn } = useAuthSession()
  const { t } = useTranslation()

  let alertComponent = null
  const showAlert = !isSignedIn
  let contentWithAlertClass = styles['no-alert']
  if (showAlert) {
    contentWithAlertClass = styles['with-alert']
    alertComponent = (
      <Alert
        className={styles.alert}
        message={t(
          'quests.playstreak.signInWarning.client',
          'You are currently not logged in, play streak progress will not be tracked. Please login to HyperPlay via the top-right dropdown to track progress.'
        )}
        variant="warning"
      />
    )
  }

  return (
    <>
      <Background style={{ position: 'absolute' }}></Background>
      <div
        className={classNames(
          'contentContainer',
          contentWithAlertClass,
          styles.root
        )}
      >
        {alertComponent}
        <QuestsSummaryTableWrapper
          setSelectedQuestId={setSelectedQuestId}
          selectedQuestId={selectedQuestId}
        />
        <QuestDetailsViewPlayWrapper selectedQuestId={selectedQuestId} />
      </div>
    </>
  )
}
