import React, { useState } from 'react'
import { QuestsSummaryTableWrapper } from './components/QuestsSummaryTableWrapper'
import { QuestDetailsViewPlayWrapper } from './components/QuestDetailsViewPlay'
import styles from './index.module.scss'
import { Background } from '@hyperplay/ui'
import classNames from 'classnames'

export function QuestsPage() {
  const [selectedQuestId, setSelectedQuestId] = useState<number | null>(null)
  return (
    <>
      <Background style={{ position: 'absolute' }}></Background>
      <div className={classNames('contentContainer', styles.root)}>
        <QuestsSummaryTableWrapper
          setSelectedQuestId={setSelectedQuestId}
          selectedQuestId={selectedQuestId}
        />
        <QuestDetailsViewPlayWrapper selectedQuestId={selectedQuestId} />
      </div>
    </>
  )
}
