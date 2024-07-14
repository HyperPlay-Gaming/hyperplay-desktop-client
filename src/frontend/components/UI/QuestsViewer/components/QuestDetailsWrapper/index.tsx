import React, { useState } from 'react'
import { QuestDetails, QuestDetailsProps, Game } from '@hyperplay/ui'
import styles from './index.module.scss'
import useGetQuest from 'frontend/hooks/useGetQuest'
import useGetSteamGame from 'frontend/hooks/useGetSteamGame'
import useAuthSession from 'frontend/hooks/useAuthSession'
import { useTranslation } from 'react-i18next'
import { useWriteContract, useAccount, useSwitchChain } from 'wagmi'
import { Reward } from 'common/types'
import authState from 'frontend/state/authState'
import { mintReward } from './rewards/mintReward'
import { claimPoints } from './rewards/claimPoints'
import {
  completeExternalTask,
  resyncExternalTasks
} from './rewards/completeExternalTask'
import useGetUserPlayStreak from 'frontend/hooks/useGetUserPlayStreak'
import { useMutation } from '@tanstack/react-query'
import { getRewardCategory } from 'frontend/helpers/getRewardCategory'
import { getDecimalNumberFromAmount } from '@hyperplay/utils'
import { useFlags } from 'launchdarkly-react-client-sdk'
import { getPlayStreak } from 'frontend/helpers/getPlayStreak'

export interface QuestDetailsWrapperProps {
  selectedQuestId: number | null
}

export function QuestDetailsWrapper({
  selectedQuestId
}: QuestDetailsWrapperProps) {
  const flags = useFlags()
  const { writeContract, error, isError, status } = useWriteContract()
  if (isError) {
    console.error(error)
  }
  const { switchChainAsync } = useSwitchChain()
  const account = useAccount()
  const { t } = useTranslation()
  const questResult = useGetQuest(selectedQuestId)
  const questMeta = questResult.data.data

  const questPlayStreakResult = useGetUserPlayStreak(selectedQuestId)
  const questPlayStreakData = questPlayStreakResult.data.data

  const resyncMutation = useMutation({
    mutationFn: async (rewards: Reward[]) => {
      return resyncExternalTasks(rewards)
    }
  })

  const completeTaskMutation = useMutation({
    mutationFn: async (reward: Reward) => {
      return completeExternalTask(reward)
    }
  })

  const claimPointsMutation = useMutation({
    mutationFn: async (reward: Reward) => {
      return claimPoints(reward)
    }
  })

  let questDetails = null

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
  // TODO: uncomment when reputation quest is activated and pass in quest details eligibility
  // const accounts = session.data?.linkedAccounts
  // const steamIsLinked = accounts?.has('steam')

  const userId = session.data?.userId

  const showResyncButton =
    questMeta?.type === 'PLAYSTREAK' &&
    !!questPlayStreakData?.completed_counter &&
    !!questMeta?.rewards?.filter((val) => val.reward_type === 'EXTERNAL-TASKS')
      ?.length

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
    connectSteamAccount: t(
      'quest.connectSteamAccount',
      'Connect Steam account'
    ),
    questType: {
      REPUTATION: t('quest.reputation', 'Reputation'),
      PLAYSTREAK: t('quest.playstreak', 'Play Streak')
    },
    sync: t('quest.sync', 'Sync'),
    rewards: t('quest.rewards', 'Rewards')
  }

  const mintOnChainReward = async (reward: Reward) => {
    if (questMeta?.id === undefined) {
      console.error('tried to mint but quest meta id is undefined')
      return
    }
    if (account.address === undefined) {
      console.error('tried to mint but no account connected')
      return
    }
    return mintReward({
      questId: questMeta.id,
      address: account.address,
      reward,
      writeContract,
      switchChainAsync
    })
  }

  async function claimRewards(rewards: Reward[]) {
    for (const reward_i of rewards) {
      switch (reward_i.reward_type) {
        case 'ERC1155':
        case 'ERC721':
        case 'ERC20':
          await mintOnChainReward(reward_i)
          break
        case 'POINTS':
          await claimPointsMutation.mutateAsync(reward_i)
          break
        case 'EXTERNAL-TASKS':
          await completeTaskMutation.mutateAsync(reward_i)
          break
        default:
          console.error(`unknown reward type ${reward_i.reward_type}`)
          break
      }
    }
    await questPlayStreakResult.invalidateQuery()
  }

  function isEligible() {
    if (!questMeta) {
      return false
    }
    const currentStreak = questPlayStreakData?.current_playstreak_in_days
    const requiredStreak =
      questMeta.eligibility?.play_streak?.required_playstreak_in_days
    if (questMeta.type === 'PLAYSTREAK' && currentStreak && requiredStreak) {
      return currentStreak >= requiredStreak
    }

    return false
  }

  const chainTooltips: Record<string, string> = {}
  chainTooltips[t('quest.points', 'Points')] =
    'Points are off-chain fungible rewards that may or may not be redeemable for an on-chain reward in the future. This is up to the particular game developer who is providing this reward.'

  const isClaiming =
    status === 'pending' ||
    completeTaskMutation.isPending ||
    claimPointsMutation.isPending

  if (selectedQuestId !== null && questMeta !== undefined) {
    const questDetailsProps: QuestDetailsProps = {
      questType: questMeta.type,
      title: questMeta.name,
      description: questMeta.description,
      eligibility: {
        reputation: {
          games: steamGames,
          completionPercent: questMeta.eligibility?.completion_threshold ?? 100,
          eligible: false,
          steamAccountLinked: true
        },
        playStreak: getPlayStreak(questMeta, questPlayStreakData)
      },
      rewards:
        questMeta.rewards?.map((val) => ({
          title: val.name,
          imageUrl: val.image_url,
          chainName: getRewardCategory(val, t),
          numToClaim:
            val.amount_per_user && val.decimals
              ? getDecimalNumberFromAmount(
                  val.amount_per_user.toString(),
                  val.decimals
                ).toString()
              : undefined
        })) ?? [],
      i18n,
      onClaimClick: async () => claimRewards(questMeta.rewards ?? []),
      onSignInClick: () => authState.openSignInModal(),
      onConnectSteamAccountClick: () => window.api.signInWithProvider('steam'),
      collapseIsOpen,
      toggleCollapse: () => setCollapseIsOpen(!collapseIsOpen),
      errorMessage: isError
        ? t('quest.errorMessage', 'There was an error with the transaction.')
        : undefined,
      isMinting: isClaiming,
      isSignedIn: !!userId,
      ctaDisabled:
        !flags.questsOverlayClaimCtaEnabled ||
        (!isEligible() && !showResyncButton),
      showSync: showResyncButton,
      onSyncClick: () => {
        resyncMutation.mutateAsync(questMeta.rewards ?? [])
      },
      isSyncing: resyncMutation.isPending,
      chainTooltips: {}
    }
    questDetails = (
      <QuestDetails {...questDetailsProps} className={styles.questDetails} />
    )
  } else if (questResult?.data.isLoading || questResult?.data.isFetching) {
    const emptyQuestDetailsProps: QuestDetailsProps = {
      questType: 'PLAYSTREAK',
      title: '',
      description: '',
      eligibility: {
        reputation: {
          games: [],
          completionPercent: 0,
          eligible: false,
          steamAccountLinked: false
        },
        playStreak: {
          resetTimeInMsSinceEpoch: 0,
          currentStreakInDays: 0,
          requiredStreakInDays: 1
        }
      },
      i18n,
      rewards: [],
      onClaimClick: () => console.log('claim clicked for ', questMeta?.name),
      onSignInClick: () => console.log('sign in clicked for ', questMeta?.name),
      onConnectSteamAccountClick: () =>
        console.log('connect steam account clicked for ', questMeta?.name),
      collapseIsOpen,
      toggleCollapse: () => setCollapseIsOpen(!collapseIsOpen),
      isSignedIn: !!userId
    }
    questDetails = (
      <QuestDetails
        {...emptyQuestDetailsProps}
        className={styles.questDetails}
        ctaDisabled={true}
      />
    )
  }

  return questDetails
}
