import React from 'react'
import {
  PointsBalanceProps,
  QuestLog,
  QuestLogInfo,
  QuestLogTranslations
} from '@hyperplay/ui'
import styles from './index.module.scss'
import { useTranslation } from 'react-i18next'
import useGetG7UserCredits from 'frontend/hooks/useGetG7UserCredits'
import useGetPointsBalancesForProject from 'frontend/hooks/useGetPointsBalances'
import useGetQuests from 'frontend/hooks/useGetQuests'
import { useGetQuestStates } from 'frontend/hooks/useGetQuestStates'

export interface QuestLogWrapperProps {
  questsResults: ReturnType<typeof useGetQuests>
  projectId: string
  selectedQuestId: number | null
  setSelectedQuestId: (id: number | null) => void
}

export function QuestLogWrapper({
  questsResults,
  projectId: appName,
  selectedQuestId,
  setSelectedQuestId
}: QuestLogWrapperProps) {
  const quests = questsResults?.data?.data
  const userCredits = useGetG7UserCredits()
  const userCreditsBalance = userCredits?.data?.data
  const pointsBalancesQuery = useGetPointsBalancesForProject(appName)
  const pointsBalances = pointsBalancesQuery?.data?.data
  const { t } = useTranslation()
  const { questIdToQuestStateMap, isPending: isGetQuestStatesPending } =
    useGetQuestStates({
      quests
    })

  const questsUi =
    quests?.map((quest) => {
      const questUi_i: QuestLogInfo = {
        questType: quest.type,
        title: quest.name,
        state: Object.hasOwn(questIdToQuestStateMap, quest.id)
          ? questIdToQuestStateMap[quest.id]
          : 'ACTIVE',
        onClick: () => {
          setSelectedQuestId(quest.id)
        },
        selected: selectedQuestId === quest.id,
        id: quest.id
      }
      return questUi_i
    }) ?? []

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

  const pointsBalanceProps: PointsBalanceProps[] = []
  if (userCreditsBalance !== undefined) {
    pointsBalanceProps.push({
      symbol: 'G7C',
      name: 'Game7 Credits',
      isGame7Credits: true,
      balance: userCreditsBalance,
      i18n: {
        totalClaimed: t('quest.g7Numclaimed', 'Total Claimed G7 Credits')
      }
    })
  }
  if (pointsBalances) {
    for (const pointsCollection_i of pointsBalances) {
      pointsBalanceProps.push({
        symbol: pointsCollection_i.pointsCollection.symbol,
        name: pointsCollection_i.pointsCollection.name,
        imageUrl: pointsCollection_i.pointsCollection.image,
        balance: pointsCollection_i.balance
      })
    }
  }

  let questLog = null
  const isLoading =
    questsResults?.data.isLoading ||
    questsResults?.data.isFetching ||
    isGetQuestStatesPending
  questLog = (
    <QuestLog
      quests={questsUi ?? []}
      className={styles.questLog}
      i18n={i18n}
      pointsProps={pointsBalanceProps}
      loading={isLoading}
    />
  )

  if (!quests?.length) {
    return null
  }

  return questLog
}
