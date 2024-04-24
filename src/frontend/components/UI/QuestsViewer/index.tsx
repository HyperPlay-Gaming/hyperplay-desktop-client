import React, { useState } from 'react'
import {
  QuestLog,
  QuestDetails,
  QuestDetailsProps,
  QuestLogInfo,
  Game
} from '@hyperplay/ui'
import useGetQuests from 'frontend/hooks/useGetQuests'
import styles from './index.module.scss'
import useGetQuest from 'frontend/hooks/useGetQuest'
import useGetSteamGame from 'frontend/hooks/useGetSteamGame'
import useAuthSession from 'frontend/hooks/useAuthSession'
import { useTranslation } from 'react-i18next'

export interface QuestsViewerProps {
  projectId: string
}

export function QuestsViewer({ projectId: appName }: QuestsViewerProps) {
  const questsResults = useGetQuests(appName)
  const quests = questsResults?.data?.data
  const { t } = useTranslation()

  const [selectedQuestId, setSelectedQuestId] = useState<number | null>(null)
  const questResult = useGetQuest(selectedQuestId)
  let questLog = null
  if (Array.isArray(quests)) {
    const questsUi = quests.map((val) => {
      const questUi_i: QuestLogInfo = {
        questType: 'REPUTATION',
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
    questLog = <QuestLog quests={questsUi} className={styles.questLog} />
  } else if (questsResults?.data.isLoading || questsResults?.data.isFetching) {
    questLog = (
      <QuestLog quests={[]} className={styles.questLog} loading={true} />
    )
  }

  let questDetails = null
  const questMeta = questResult.data.data

  const getSteamGameResult = useGetSteamGame(
    questMeta?.eligibility?.steam_games ?? []
  )

  const steamGames: Game[] =
    getSteamGameResult?.data?.map((val, index) => ({
      title: val.data?.name ?? index.toString(),
      imageUrl: val.data?.capsule_image ?? '',
      loading: val.isLoading || val.isFetching
    })) ?? []

  const [collapseIsOpen, setCollapseIsOpen] = useState(false)
  const session = useAuthSession()
  const accounts = session.data?.linkedAccounts
  const steamIsLinked = accounts?.has('steam')
  const i18n = {
    reward: t('quest.reward', 'Reward'),
    associatedGames: t('quest.associatedGames', 'Associated games'),
    linkSteamAccount: t(
      'quest.linkAccount',
      'Link your Steam account to check eligibility.'
    ),
    needMoreAchievements: t(
      'quest.needMoreAchievements',
      `You need to have completed {{percent}}% of the achievements in one of these games.`,
      { percent: questMeta?.eligibility?.completion_threshold ?? '??' }
    ),
    claim: steamIsLinked
      ? t('quest.claimAll', 'Claim all')
      : t('quest.connectSteamAccount', 'Connect Steam account'),
    questType: {
      REPUTATION: t('quest.reputation', 'Reputation')
    }
  }

  if (selectedQuestId !== null && questMeta !== undefined) {
    const questDetailsProps: QuestDetailsProps = {
      title: questMeta.name,
      description: questMeta.description,
      eligibility: {
        reputation: {
          games: steamGames,
          completionPercent: questMeta.eligibility.completion_threshold,
          eligible: false,
          steamAccountLinked: false
        }
      },
      rewards: questMeta.rewards.map((val) => ({
        title: val.name,
        imageUrl: val.image_url
      })),
      i18n,
      onClaimClick: () => console.log('claim clicked for ', questMeta.name),
      collapseIsOpen,
      toggleCollapse: () => setCollapseIsOpen(!collapseIsOpen)
    }
    questDetails = (
      <QuestDetails
        {...questDetailsProps}
        className={styles.questDetails}
        ctaDisabled={true}
      />
    )
  } else if (questResult?.data.isLoading || questResult?.data.isFetching) {
    const emptyQuestDetailsProps: QuestDetailsProps = {
      title: '',
      description: '',
      eligibility: {
        reputation: {
          games: [],
          completionPercent: 0,
          eligible: false,
          steamAccountLinked: false
        }
      },
      i18n,
      rewards: [],
      onClaimClick: () => console.log('claim clicked for ', questMeta?.name),
      collapseIsOpen,
      toggleCollapse: () => setCollapseIsOpen(!collapseIsOpen)
    }
    questDetails = (
      <QuestDetails
        {...emptyQuestDetailsProps}
        className={styles.questDetails}
        ctaDisabled={true}
      />
    )
  }

  if (!quests?.length) {
    return null
  }

  return (
    <div className={styles.questsViewerContainer}>
      {questLog}
      {questDetails}
    </div>
  )
}
