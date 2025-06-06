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
import { Quest } from '@hyperplay/utils'
import { useGetQuestStates } from '@hyperplay/quests-ui'
export interface QuestLogWrapperProps {
  quests: Quest[] | null | undefined
  isLoading: boolean
  projectId: string
  selectedQuestId: number | null
  setSelectedQuestId: (id: number | null) => void
}

export function QuestLogWrapper({
  quests,
  isLoading,
  projectId: appName,
  selectedQuestId,
  setSelectedQuestId
}: QuestLogWrapperProps) {
  const userCredits = useGetG7UserCredits()
  const userCreditsBalance = userCredits?.data?.data
  const pointsBalancesQuery = useGetPointsBalancesForProject(appName)
  const pointsBalances = pointsBalancesQuery?.data?.data
  const { t } = useTranslation()
  const { questIdToQuestStateMap, isPending: isGetQuestStatesPending } =
    useGetQuestStates({
      quests,
      getQuest: window.api.getQuest,
      getUserPlayStreak: window.api.getUserPlayStreak,
      getExternalEligibility: window.api.getExternalEligibility
    })

  const questsUi =
    quests?.map((quest) => {
      const questUi_i: QuestLogInfo = {
        questType: quest.type,
        title: quest.name,
        // @ts-expect-error Already filtered in parent component
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
      PLAYSTREAK: t('quest.type.playstreak', 'Play Streak'),
      LEADERBOARD: t('quest.type.leaderboard', 'Leaderboard')
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
  questLog = (
    <QuestLog
      quests={questsUi ?? []}
      className={styles.questLog}
      i18n={i18n}
      pointsProps={pointsBalanceProps}
      loading={isLoading || isGetQuestStatesPending}
    />
  )

  if (!quests?.length) {
    return null
  }

  return questLog
}
