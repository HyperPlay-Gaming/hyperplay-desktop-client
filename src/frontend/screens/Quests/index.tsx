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
          projectId="0xb5b77decf0bbeb40a2b9c5c85efc9e4dd72985fc9080733857bd7c2afc702f43"
          selectedQuestId={selectedQuestId}
        />
        <QuestDetailsViewPlayWrapper selectedQuestId={selectedQuestId} />
      </div>
    </>
  )
}
