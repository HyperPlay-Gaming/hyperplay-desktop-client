import React, { useEffect, useState } from 'react'
import { Game, QuestDetails, QuestDetailsTranslations } from '@hyperplay/ui'
import { useTranslation } from 'react-i18next'
import useGetQuest from 'frontend/hooks/useGetQuest'
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import { fetchEpicListing, getGameInfo } from 'frontend/helpers'
import useGetSteamGame from 'frontend/hooks/useGetSteamGame'
import useGetUserPlayStreak from 'frontend/hooks/useGetUserPlayStreak'
import { getPlaystreakArgsFromQuestData } from 'frontend/helpers/getPlaystreakArgsFromQuestData'
import { useGetRewards } from 'frontend/hooks/useGetRewards'
import { useMutation } from '@tanstack/react-query'
import { Runner } from 'common/types'

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
  const questPlayStreakResult = useGetUserPlayStreak(selectedQuestId)
  const questPlayStreakData = questPlayStreakResult.data.data

  const rewardsQuery = useGetRewards(selectedQuestId)
  const questRewards = rewardsQuery.data.data

  const getSteamGameResult = useGetSteamGame(
    questMeta?.eligibility?.steam_games ?? []
  )

  const navigateToGame = useMutation({
    mutationFn: async (appName: string) => {
      const { appName: epicAppName, epicListingUrl } = await fetchEpicListing(
        appName
      )

      let runner: Runner = 'hyperplay'
      let name = appName
      if (epicListingUrl) {
        runner = 'legendary'
        if (epicAppName) {
          name = epicAppName
        }
      }

      // check for gameinfo to see if it is on the library
      return getGameInfo(name, runner)
        .then((res) => {
          if (!res) {
            throw new Error('Game not found in library')
          }

          return navigate(`/gamepage/${runner}/${name}`, {
            state: { gameInfo: res, fromQuests: true }
          })
        })
        .catch(async () => {
          // if hyperplay game, add to library and navigate to game page
          if (runner === 'hyperplay') {
            await window.api.addHyperplayGame(name)
            const gameInfo = await getGameInfo(name, runner)

            return navigate(`/gamepage/hyperplay/${name}`, {
              state: { gameInfo, fromQuests: true }
            })
          }
          // if epic game, open in epic store
          return navigate(`/store-page?store-url=${epicListingUrl}`)
        })
    },
    onError: (error, variable) => {
      window.api.logError(
        `Error navigating to ${variable} game: ${error.message}`
      )
    }
  })

  useEffect(() => {
    if (selectedQuestId !== null) {
      window.api.trackEvent({
        event: 'Quest Viewed',
        properties: { quest: { id: selectedQuestId.toString() } }
      })
    }
  }, [selectedQuestId])

  if (selectedQuestId === null) {
    return null
  }

  const steamGames: Game[] =
    getSteamGameResult?.data?.map((val, index) => ({
      title: val.data?.name ?? index.toString(),
      imageUrl: val.data?.capsule_image ?? '',
      loading: val.isLoading || val.isFetching
    })) ?? []

  const i18n: QuestDetailsTranslations = {
    rewards: t('quest.reward', 'Rewards'),
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
    play: navigateToGame.isPending
      ? t('please-wait', 'Please wait...')
      : t('quest.View Game', 'View Game'),
    secondCTAText: t('quest.View Game', 'View Game'),
    connectSteamAccount: t(
      'quest.connectSteamAccount',
      'Connect Steam account'
    ),
    questType: {
      REPUTATION: t('quest.reputation', 'Reputation'),
      PLAYSTREAK: t('quest.type.playstreak', 'Play Streak')
    },
    sync: t('quest.sync', 'Sync'),
    streakProgressI18n: {
      streakProgress: t('quest.playstreak.streakProgress', 'Streak Progress'),
      days: t('quest.playstreak.days', 'days'),
      playToStart: t(
        'quest.playstreak.playToStart',
        'Play this game to start your streak!'
      ),
      playEachDay: t(
        'quest.playstreak.playEachDay',
        `Play each day so your streak won't reset!`
      ),
      streakCompleted: t(
        'quest.playstreak.streakCompleted',
        'Streak completed! Claim your rewards now.'
      ),
      now: t('quest.playstreak.now', 'Now'),
      dayResets: t('quest.playstreak.dayResets', 'Day resets:'),
      progressTowardsStreak: t(
        'quest.playstreak.progressTowardsStreak',
        `progress towards today's streak.`
      )
    }
  }

  if (!questMeta || questResult.data.isLoading || questResult.data.isFetching) {
    return (
      <QuestDetails
        questType="PLAYSTREAK"
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
          },
          playStreak: {
            currentStreakInDays: 0,
            requiredStreakInDays: 1,
            minimumSessionTimeInSeconds: 100,
            accumulatedPlaytimeTodayInSeconds: 0,
            lastPlaySessionCompletedDateTimeUTC: new Date().toISOString()
          }
        }}
        classNames={{ root: styles.questDetailsRoot }}
        loading={true}
        key={'questDetailsLoading'}
      />
    )
  }

  return (
    <QuestDetails
      ctaDisabled={navigateToGame.isPending}
      questType={questMeta.type}
      onSignInClick={() => console.log('sign in click')}
      onConnectSteamAccountClick={() => console.log('steam connect click')}
      isSignedIn={true}
      i18n={i18n}
      rewards={questRewards ?? []}
      title={questMeta.name}
      description={questMeta.description}
      collapseIsOpen={collapseIsOpen}
      toggleCollapse={() => setCollapseIsOpen(!collapseIsOpen)}
      onClaimClick={() => console.log('claim click')}
      eligibility={{
        reputation: {
          games: steamGames,
          completionPercent: questMeta.eligibility?.completion_threshold ?? 100,
          eligible: false,
          steamAccountLinked: false
        },
        playStreak: getPlaystreakArgsFromQuestData(
          questMeta,
          questPlayStreakData
        )
      }}
      classNames={{ root: styles.questDetailsRoot }}
      isQuestsPage={true}
      onPlayClick={async () => navigateToGame.mutateAsync(questMeta.project_id)}
      key={`questDetailsLoadedId${questMeta.id}streak${!!questPlayStreakData}`}
    />
  )
}
