import React, { useState } from 'react'
import { QuestsSummaryTableWrapper } from './components/QuestsSummaryTableWrapper'
import { QuestDetailsViewPlayWrapper } from './components/QuestDetailsViewPlay'
import styles from './index.module.scss'
import { Alert, Background } from '@hyperplay/ui'
import classNames from 'classnames'
import useAuthSession from 'frontend/hooks/useAuthSession'

export function QuestsPage() {
  const [selectedQuestId, setSelectedQuestId] = useState<number | null>(null)
  const { isSignedIn } = useAuthSession()

  let alertComponent = null
  const showAlert = !isSignedIn
  let contentWithAlertClass = styles['no-alert']
  if (showAlert) {
    contentWithAlertClass = styles['with-alert']
    alertComponent = (
      <Alert
        className={styles.alert}
        message="Be sure to log into HyperPlay to maintain your play streak progress."
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
