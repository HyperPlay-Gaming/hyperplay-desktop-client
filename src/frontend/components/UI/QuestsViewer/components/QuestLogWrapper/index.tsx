import React from 'react'
import {
  PointsBalanceProps,
  QuestLog,
  QuestLogInfo,
  QuestLogTranslations
} from '@hyperplay/ui'
import useGetQuests from 'frontend/hooks/useGetQuests'
import styles from './index.module.scss'
import { useTranslation } from 'react-i18next'
import { Quest } from 'common/types'
import useGetG7UserCredits from 'frontend/hooks/useGetG7UserCredits'

export interface QuestLogWrapperProps {
  projectId: string
  selectedQuestId: number | null
  setSelectedQuestId: (id: number | null) => void
}

export function QuestLogWrapper({
  projectId: appName,
  selectedQuestId,
  setSelectedQuestId
}: QuestLogWrapperProps) {
  const questsResults = useGetQuests(appName)
  const userCredits = useGetG7UserCredits()
  const userCreditsBalance = userCredits?.data?.data
  const quests = questsResults?.data?.data
  const { t } = useTranslation()

  const i18n: QuestLogTranslations = {
    quests: t('quest.quests', 'Quests'),
    claimed: t('quest.claimed', 'Claimed'),
    readyForClaim: t('quest.readyForClaim', 'Ready for claim'),
    active: t('quest.active', 'Active'),
    type: {
      REPUTATION: t('quest.reputation', 'Reputation'),
      PLAYSTREAK: t('quest.type.playstreak', 'Play Streak')
    },
    pointsClaimed: t('quest.pointsClaimed', 'Points Claimed')
  }

  let pointsBalanceProps: PointsBalanceProps[] | undefined = undefined
  if (userCreditsBalance !== undefined) {
    pointsBalanceProps = [
      {
        symbol: 'G7C',
        name: 'Game7 Credits',
        isGame7Credits: true,
        balance: userCreditsBalance
      }
    ]
  }

  let questLog = null
  if (Array.isArray(quests)) {
    const questsUi = quests.map((val: Quest) => {
      const questUi_i: QuestLogInfo = {
        questType: val.type,
        title: val.name,
        state: 'ACTIVE',
        onClick: () => {
          // deselect
          if (selectedQuestId === val.id) {
            setSelectedQuestId(null)
            return
          }
          //select
          setSelectedQuestId(val.id)
        },
        selected: selectedQuestId === val.id,
        id: val.id
      }
      return questUi_i
    })
    questLog = (
      <QuestLog
        quests={questsUi}
        className={styles.questLog}
        i18n={i18n}
        pointsProps={pointsBalanceProps}
      />
    )
  } else if (questsResults?.data.isLoading || questsResults?.data.isFetching) {
    questLog = (
      <QuestLog
        quests={[]}
        className={styles.questLog}
        loading={true}
        i18n={i18n}
      />
    )
  }

  if (!quests?.length) {
    return null
  }

  return questLog
}
