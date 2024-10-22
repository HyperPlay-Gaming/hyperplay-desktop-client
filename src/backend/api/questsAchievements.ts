import {
  GetAchievementsOptions,
  PlayerOptions,
  GetIndividualAchievementsOptions,
  Runner,
  ConfirmClaimParams
} from 'common/types'
import { ipcRenderer } from 'electron'

export const getSummaryAchievements = async (options: GetAchievementsOptions) =>
  ipcRenderer.invoke('getSummaryAchievements', options)

export const getIndividualAchievements = async (
  options: GetIndividualAchievementsOptions
) => ipcRenderer.invoke('getIndividualAchievements', options)

export const getAchievementsStats = async (options: PlayerOptions) =>
  ipcRenderer.invoke('getAchievementsStats', options)

export const syncAchievements = async (options: PlayerOptions) =>
  ipcRenderer.invoke('syncAchievements', options)

export const getQuests = async (projectId?: string) =>
  ipcRenderer.invoke('getQuests', projectId)

export const getQuest = async (questId: number) =>
  ipcRenderer.invoke('getQuest', questId)

export const confirmRewardClaim = async (params: ConfirmClaimParams) => {
  await ipcRenderer.invoke('confirmRewardClaim', params)
}

export const getUserPlayStreak = async (questId: number) =>
  ipcRenderer.invoke('getUserPlayStreak', questId)

export const getSteamGameMetadata = async (gameId: number) =>
  ipcRenderer.invoke('getSteamGameMetadata', gameId)

export const getQuestRewardSignature = async (
  address: `0x${string}`,
  rewardId: number,
  tokenId?: number
) => ipcRenderer.invoke('getQuestRewardSignature', address, rewardId, tokenId)

export const getDepositContracts = async (questId: number) =>
  ipcRenderer.invoke('getDepositContracts', questId)

export const claimQuestPointsReward = async (rewardId: string) =>
  ipcRenderer.invoke('claimQuestPointsReward', rewardId)

export const completeExternalTask = async (rewardId: string) =>
  ipcRenderer.invoke('completeExternalTask', rewardId)

export const resyncExternalTask = async (rewardId: string) =>
  ipcRenderer.invoke('resyncExternalTask', rewardId)

export const syncPlayStreakWithExternalSource = async (params: {
  quest_id: number
  signature: string
}) => ipcRenderer.invoke('syncPlayStreakWithExternalSource', params)

export const getG7Credits = async () => ipcRenderer.invoke('getG7Credits')

export const getExternalTaskCredits = async (rewardId: string) =>
  ipcRenderer.invoke('getExternalTaskCredits', rewardId)

export const getPointsBalancesForProject = async (projectId: string) =>
  ipcRenderer.invoke('getPointsBalancesForProject', projectId)

export const syncPlaySession = async (appName: string, runner: Runner) =>
  ipcRenderer.invoke('syncPlaySession', appName, runner)

export const checkG7ConnectionStatus = async () =>
  ipcRenderer.invoke('checkG7ConnectionStatus')

export const getCSRFToken = async () => ipcRenderer.invoke('getCSRFToken')

export const checkPendingSync = async ({
  wallet,
  questId
}: {
  wallet: string
  questId: number
}) => ipcRenderer.invoke('checkPendingSync', { wallet, questId })

export const handleOpenOnboarding = (
  onChange: (e: Electron.IpcRendererEvent) => void
) => {
  ipcRenderer.on('openOnboarding', onChange)
  return () => {
    ipcRenderer.removeListener('openOnboarding', onChange)
  }
}
