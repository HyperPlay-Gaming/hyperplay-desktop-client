import React, { useState } from 'react'
import { QuestDetails, QuestDetailsProps, Game } from '@hyperplay/ui'
import styles from './index.module.scss'
import useGetQuest from 'frontend/hooks/useGetQuest'
import useGetSteamGame from 'frontend/hooks/useGetSteamGame'
import useAuthSession from 'frontend/hooks/useAuthSession'
import { useTranslation } from 'react-i18next'
import { useWriteContract, useAccount, useSwitchChain } from 'wagmi'
import { DepositContract, Reward, RewardClaimSignature } from 'common/types'
import { getAmount } from '@hyperplay/utils'
import { questRewardAbi } from 'frontend/abis/RewardsAbi'
import authState from 'frontend/state/authState'
import { getNextMidnightTimestamp } from 'frontend/helpers/getMidnightUTC'

export interface QuestDetailsWrapperProps {
  selectedQuestId: number | null
}

export function QuestDetailsWrapper({
  selectedQuestId
}: QuestDetailsWrapperProps) {
  const { writeContract, error, isError, status } = useWriteContract()
  if (isError) {
    console.error(error)
  }
  const { switchChainAsync } = useSwitchChain()
  const account = useAccount()
  const { t } = useTranslation()
  const questResult = useGetQuest(selectedQuestId)
  const questMeta = questResult.data.data

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
    }
  }

  async function mintRewards(rewards: Reward[]) {
    if (questMeta?.id === undefined) {
      console.error('tried to mint but quest meta id is undefined')
      return
    }
    if (account.address === undefined) {
      console.error('tried to mint but no account connected')
      return
    }
    for (const reward_i of rewards) {
      await switchChainAsync({ chainId: reward_i.chain_id })
      const sig: RewardClaimSignature =
        await window.api.getQuestRewardSignature(
          account.address,
          questMeta.id,
          reward_i.id
        )

      const depositContracts: DepositContract[] =
        await window.api.getDepositContracts(questMeta.id)
      const depositContractAddress = depositContracts.find(
        (val) => val.chain_id === reward_i.chain_id
      )?.contract_address
      if (depositContractAddress === undefined) {
        console.error(
          `Deposit contract address undefined for quest ${questMeta.id} and chain id ${reward_i.chain_id}`
        )
        return
      }
      if (reward_i.reward_type === 'ERC20') {
        writeContract({
          address: depositContractAddress,
          abi: questRewardAbi,
          functionName: 'withdrawERC20',
          args: [
            BigInt(questMeta.id),
            reward_i.contract_address,
            BigInt(
              getAmount(reward_i.amount_per_user, reward_i.decimals).toString()
            ),
            BigInt(sig.nonce),
            BigInt(sig.expiration),
            sig.signature
          ]
        })
      }
    }
  }

  function isEligible() {
    if (!questMeta) {
      return false
    }
    const currentStreak =
      questMeta.eligibility?.play_streak?.current_playstreak_in_days
    const requiredStreak =
      questMeta.eligibility?.play_streak?.required_playstreak_in_days
    if (questMeta.type === 'PLAYSTREAK' && currentStreak && requiredStreak) {
      return currentStreak >= requiredStreak
    }

    return false
  }

  if (selectedQuestId !== null && questMeta !== undefined) {
    const questDetailsProps: QuestDetailsProps = {
      questType: questMeta.type,
      title: questMeta.name,
      description: questMeta.description,
      eligibility: {
        reputation: {
          games: steamGames,
          completionPercent: questMeta.eligibility.completion_threshold,
          eligible: false,
          steamAccountLinked: true
        },
        playStreak: {
          resetTimeInMsSinceEpoch: getNextMidnightTimestamp(),
          currentStreakInDays:
            questMeta.eligibility?.play_streak?.current_playstreak_in_days ?? 0,
          requiredStreakInDays:
            questMeta.eligibility?.play_streak?.required_playstreak_in_days ?? 0
        }
      },
      rewards: questMeta.rewards.map((val) => ({
        title: val.name,
        imageUrl: val.image_url
      })),
      i18n,
      onClaimClick: async () => mintRewards(questMeta.rewards),
      onSignInClick: () => authState.openSignInModal(),
      onConnectSteamAccountClick: () => window.api.signInWithProvider('steam'),
      collapseIsOpen,
      toggleCollapse: () => setCollapseIsOpen(!collapseIsOpen),
      errorMessage: isError
        ? t('quest.errorMessage', 'There was an error with the transaction.')
        : undefined,
      isMinting: status === 'pending',
      isSignedIn: !!userId,
      ctaDisabled: !isEligible()
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
