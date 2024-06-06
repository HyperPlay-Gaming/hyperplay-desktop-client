import React, { useState } from 'react'
import { Game, QuestDetails } from '@hyperplay/ui'
import { useTranslation } from 'react-i18next'
import useGetQuest from 'frontend/hooks/useGetQuest'
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import { getGameInfo } from 'frontend/helpers'
import useGetSteamGame from 'frontend/hooks/useGetSteamGame'

export interface QuestDetailsViewPlayWrapperProps {
  selectedQuestId: number | null
}

export function QuestDetailsViewPlayWrapper({
  selectedQuestId
}: QuestDetailsViewPlayWrapperProps) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [collapseIsOpen, setCollapseIsOpen] = useState(false)

  const questResult = useGetQuest(selectedQuestId)
  const questMeta = questResult.data.data

  const getSteamGameResult = useGetSteamGame(
    questMeta?.eligibility?.steam_games ?? []
  )
  if (selectedQuestId === null) {
    return null
  }

  const steamGames: Game[] =
    getSteamGameResult?.data?.map((val, index) => ({
      title: val.data?.name ?? index.toString(),
      imageUrl: val.data?.capsule_image ?? '',
      loading: val.isLoading || val.isFetching
    })) ?? []

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
    claim: t('quest.claimAll', 'Claim all'),
    signIn: t('quest.signIn', 'Sign in'),
    play: t('quest.Play', 'Play'),
    secondCTAText: t('quest.View Game', 'View Game'),
    connectSteamAccount: t(
      'quest.connectSteamAccount',
      'Connect Steam account'
    ),
    questType: {
      REPUTATION: t('quest.reputation', 'Reputation'),
      PLAYSTREAK: t('quest.playstreak', 'Play Streak')
    }
  }

  if (!questMeta || questResult.data.isLoading || questResult.data.isFetching) {
    return (
      <QuestDetails
        onSignInClick={() => console.log('sign in click')}
        onConnectSteamAccountClick={() => console.log('steam connect click')}
        isSignedIn={true}
        i18n={i18n}
        rewards={[]}
        title={''}
        description={''}
        collapseIsOpen={collapseIsOpen}
        toggleCollapse={() => setCollapseIsOpen(!collapseIsOpen)}
        onClaimClick={() => console.log('claim click')}
        eligibility={{
          reputation: {
            games: [],
            completionPercent: 0,
            eligible: false,
            steamAccountLinked: false
          }
        }}
        classNames={{ root: styles.questDetailsRoot }}
        loading={true}
      />
    )
  }
  const rewards =
    questMeta.rewards.map((val) => ({
      title: val.name,
      imageUrl: val.image_url
    })) ?? []

  async function navigateToGamePage(appName: string) {
    const gameInfo = await getGameInfo(appName, 'hyperplay')
    navigate(`/gamepage/hyperplay/${appName}`, {
      state: { gameInfo, fromDM: false }
    })
  }

  return (
    <QuestDetails
      onSignInClick={() => console.log('sign in click')}
      onConnectSteamAccountClick={() => console.log('steam connect click')}
      isSignedIn={true}
      i18n={i18n}
      rewards={rewards}
      title={questMeta.name}
      description={questMeta.description}
      collapseIsOpen={collapseIsOpen}
      toggleCollapse={() => setCollapseIsOpen(!collapseIsOpen)}
      onClaimClick={() => console.log('claim click')}
      eligibility={{
        reputation: {
          games: steamGames,
          completionPercent: questMeta.eligibility.completion_threshold,
          eligible: false,
          steamAccountLinked: false
        }
      }}
      classNames={{ root: styles.questDetailsRoot }}
      isQuestsPage={true}
      onPlayClick={async () =>
        window.api.launch({
          appName: questMeta.project_id,
          launchArguments: '',
          runner: 'hyperplay'
        })
      }
      onSecondCTAClick={async () => navigateToGamePage(questMeta.project_id)}
    />
  )
}
